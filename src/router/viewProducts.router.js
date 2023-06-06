import express from "express";
//import { getProducts } from "../utils/utils.js";
import { productManager } from "../DAO/classes/ProductManager.js";

export const routerViewProducts = express.Router();

routerViewProducts.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    return res.render("home", { products: products });
  } catch (error) {
    console.log(error);
  }
});
