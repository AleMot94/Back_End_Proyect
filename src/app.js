//@ts-check
//variables globales
import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils/dirname.js";
import { Server } from "socket.io";
import { connectMongo } from "./utils/mongoose.js";
// routers vistas
import { routerViewProducts } from "./router/viewProducts.router.js";
import { routerViewLogin } from "./router/viewLogin.router.js";
import { routerViewChat } from "./router/viewChat.router.js";
import { routerViewCart } from "./router/viewCart.router.js";
import { routerViewRealTimeProducts } from "./router/viewsRealTimeProducts.router.js";
// routers api
import { routerProducts } from "./router/products.router.js";
import { routerLogin } from "./router/login.router.js";
import { routerCart } from "./router/carts.router.js";
// servicios del chat (habria que refactorizar junto con el socket)
import { messagesServices } from "./services/messages.services.js";
//cookies
//import cookieParser from "cookie-parser";
import { routerCookies } from "./router/cookies.router.js";
//express session
import session from "express-session";
import { routerSession } from "./router/session.router.js";
//import FileStore from "session-file-store";
// connect-mongo con session
import MongoStore from "connect-mongo";
//passport
import passport from "passport";
import { initPassport } from "./config/passport.config.js";
// ejemplo viejo base de datos sin mongo
import { getProducts } from "./utils/utils.js";
import { productManager } from "./DAO/classes/ProductManager.js";

//CONFIGURACION EXPRESS
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

// CONFIGURACION MONGO
connectMongo();

//CONFIGURACION CARPETA PUBLIC
app.use(express.static(__dirname + "../../public"));
/* 
//CONFIGURACION COOKIE-PARSER  npm i cookie-parser
  app.use(cookieParser("codeSDFGHJ789456")); // PRIMER EJEMPLO (DATOS GUARDADOS EN EL FRONT)
  app.use(
    session({ secret: "es-secreto", resave: true, saveUninitialized: true })
); // EJEMPLO CON SESSION  -- de cajon--

// PERSISTENCIA DE SESSION CON FILE_SYSTEM
  const FileStoreSession = FileStore(session); // npm i session-file-store y se guarda en una variable
  app.use(
    session({
      store: new FileStoreSession({
        path: "./session",
        ttl: 86400 * 7,
      }),
      secret: "es-secreto",
      resave: true,
      saveUninitialized: true,
    })
  ); */

// PERSISTENCIA DE SESSION CON MONGO  npm i connect-mongo
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://alejandro1031m:UWj8WnywnULhodYx@ale-cluster0.cywkeum.mongodb.net/?retryWrites=true&w=majority",
      ttl: 86400 * 7,
    }),
    secret: "es-secreto",
    resave: true,
    saveUninitialized: true,
  })
);

//CONFIGURASION PASSPORT
initPassport();
app.use(passport.initialize());
app.use(passport.session());

//CONFIGURACION DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "../../views");
app.set("view engine", "handlebars");

//ENDPOINTS API PRODUCTOS Y CARRITOS
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);

//ENDPOINTS VISTAS PRODUCTOS Y CARRITOS
app.use("/vista/productos", routerViewProducts); //ANDA CON MONGO
app.use("/vista/cart", routerViewCart);
app.use("/vista/chat", routerViewChat); // ANDA CON MONGO
app.use("/vista/realtimeproducts", routerViewRealTimeProducts); // NO ANDA CON MONGO

//ENDPOINTS EJEMPLO DE COOKIES
app.use("/cookie", routerCookies);
//ENDPOINTS EJEMPLO DE SESIONES
app.use("/session", routerSession); // session guarda la informacion en el server y solo le manda un ID al front
//ENDPOINTS EJEMPLO DE PASSPORT CON ESTRATEGIA LOCAL Y GITHUB (LOGIN)
app.use("/api/session", routerLogin);
app.use("/", routerViewLogin);

const httpServer = app.listen(port, () =>
  console.log(`escuchando el puerto ${port}`)
);

const socketServer = new Server(httpServer);

// falta refactorizar sokect.io
//let msgs = [];
socketServer.on("connection", async (socket) => {
  console.log("Socket connection established");

  async function getMessagesMongo() {
    try {
      const messagges = await messagesServices.getAllMessages();
      return messagges;
    } catch (error) {
      console.log(error);
      throw "ERROR";
    }
  }

  async function addMessageMongo(message) {
    try {
      await messagesServices.addMessage(message);
    } catch (error) {
      console.log(error);
      throw "ERROR";
    }
  }

  socket.on("msg_front_to_back", async (msg) => {
    await addMessageMongo(msg);
    const msgs = await getMessagesMongo();
    console.log(msgs);
    socketServer.emit("todos_los_msgs", msgs);
  });

  // SOKECT VISTA PRODUCTOS CONECTADO A LOS ARCHIVOS LOCALES DE PERSISTENCIA (VIEJO)

  async function main() {
    try {
      return await getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  async function productsReturn() {
    return await main();
  }

  const products = await productsReturn();
  socket.emit("todos_los_producos", { products });

  socket.on("add_prod", async ({ product, img }) => {
    try {
      console.log({ product, img });
      await productManager.addProduct(product, img);
      socket.emit("todos_los_producos", { products });
    } catch (error) {
      console.log(error);
    }
  });
});
