import express from "express";
import { getProducts } from "../utils.js";

export const routerViewProducts = express.Router();

async function main() {
  try {
    return await getProducts();
  } catch (error) {
    console.log(error);
  }
}

const productsPromise = main();

routerViewProducts.get("/", async (req, res) => {
  try {
    const products = await productsPromise;

    return res.render("home", { products: products });
  } catch (error) {
    console.log(error);
  }
});
