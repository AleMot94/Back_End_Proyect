//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { routerProducts } from "./router/products.js";
import { routerCart } from "./router/carts.js";
import { routerViewProducts } from "./router/viewProducts.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

//CONFIGURACION DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//ENDPOINTS API
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);

//ENDPOINTS VISTAS
app.use("/vista/productos", routerViewProducts);

app.listen(port, () => console.log(`escuchando el puerto ${port}`));
