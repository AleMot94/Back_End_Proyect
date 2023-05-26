//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { routerProducts } from "./router/products.js";
import { routerCart } from "./router/carts.js";
import { routerViewProducts } from "./router/viewProducts.js";
import { routerViewChat } from "./router/viewChat.js";
import { Server } from "socket.io";

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
app.use("/vista/chat", routerViewChat);

const httpServer = app.listen(port, () =>
  console.log(`escuchando el puerto ${port}`)
);

const socketServer = new Server(httpServer);

let msgs = [];
socketServer.on("connection", (socket) => {
  socket.on("msg_front_to_back", (msg) => {
    msgs.push(msg);
    console.log(msgs);
    socketServer.emit("todos_los_msgs", msgs);
  });
});
