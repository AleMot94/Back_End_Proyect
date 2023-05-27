import express from "express";
import { getProducts } from "../utils.js";

export const routerViewRealTimeProducts = express.Router();

async function main() {
  try {
    return await getProducts();
  } catch (error) {
    console.log(error);
  }
}

const productsPromise = main();

routerViewRealTimeProducts.get("/", async (req, res) => {
  try {
    const products = await productsPromise;

    return res.render("realTimeProducts", { products: products });
  } catch (error) {
    console.log(error);
  }
});
