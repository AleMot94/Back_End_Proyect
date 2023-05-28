//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { routerProducts } from "./router/products.js";
import { routerCart } from "./router/carts.js";
import { routerViewProducts } from "./router/viewProducts.js";
import { routerViewChat } from "./router/viewChat.js";
import { Server } from "socket.io";
import { getProducts } from "./utils.js";
import { routerViewRealTimeProducts } from "./router/viewsRealTimeProducts.js";
import { prodManager } from "./router/products.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

app.use(express.static(__dirname + "/public"));

//CONFIGURACION DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//ENDPOINTS API
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);

//ENDPOINTS VISTAS
app.use("/vista/productos", routerViewProducts);
app.use("/vista/realtimeproducts", routerViewRealTimeProducts);
app.use("/vista/chat", routerViewChat);

const httpServer = app.listen(port, () =>
  console.log(`escuchando el puerto ${port}`)
);

const socketServer = new Server(httpServer);

let msgs = [];
socketServer.on("connection", async (socket) => {
  console.log("Socket connection established");

  socket.on("msg_front_to_back", (msg) => {
    msgs.push(msg);
    console.log(msgs);
    socketServer.emit("todos_los_msgs", msgs);
  });

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
      await prodManager.addProduct(product, img);
      socket.emit("todos_los_producos", { products });
    } catch (error) {
      console.log(error);
    }
  });
});
