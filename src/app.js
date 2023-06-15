//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils/dirname.js";
import { connectMongo } from "./utils/mongoose.js";
import { routerProducts } from "./router/products.router.js";
import { routerCart } from "./router/carts.router.js";
import { routerViewProducts } from "./router/viewProducts.router.js";
import { routerViewChat } from "./router/viewChat.router.js";
import { Server } from "socket.io";
import { getProducts } from "./utils/utils.js";
import { routerViewRealTimeProducts } from "./router/viewsRealTimeProducts.router.js";
import { productManager } from "./DAO/classes/ProductManager.js";

import { messagesServices } from "./services/messages.services.js";

//CONFIGURACION EXPRESS
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

// CONFIGURACION MONGO
connectMongo();

//CONFIGURACION CARPETA PUBLIC

app.use(express.static(__dirname + "../../public"));

//CONFIGURACION DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "../../views");
app.set("view engine", "handlebars");

//ENDPOINTS API
app.use("/api/products", routerProducts); // EL GET AHORA SE HACE A MONGO
app.use("/api/carts", routerCart); // EL GET AHORA SE HACE A MONGO

//ENDPOINTS VISTAS
app.use("/vista/productos", routerViewProducts); // ANDA CON MONGO
app.use("/vista/realtimeproducts", routerViewRealTimeProducts); // NO ANDA CON MONGO
app.use("/vista/chat", routerViewChat); // ANDA CON MONGO

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
    /*  msgs.push(msg);
    console.log(msgs);
    socketServer.emit("todos_los_msgs", msgs); */
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
