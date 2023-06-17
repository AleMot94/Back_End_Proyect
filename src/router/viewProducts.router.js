import express from "express";
//import { getProducts } from "../utils/utils.js";
//import { productManager } from "../DAO/classes/ProductManager.js";
import { productsServices } from "../services/products.services.js";

export const routerViewProducts = express.Router();

routerViewProducts.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;

    const products = await productsServices.getAllProducts(page, limit);

    return res.render("home", {
      products: products.products,
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      page: products.page,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
    });
  } catch (error) {
    console.log(error);
  }
});
