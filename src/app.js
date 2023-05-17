//@ts-check
import express from "express";

import { routerProducts } from "./router/products.js";
import { routerCart } from "./router/carts.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);

app.listen(port, () => console.log(`escuchando el puerto ${port}`));
