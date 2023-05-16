import express from "express";
import ProductManager from "../classes/ProductManager.js";

export const routerProducts = express.Router();

const prodManager = new ProductManager();

routerProducts.get("/", async (req, res) => {
  try {
    const products = await prodManager.getProducts();
    const limit = req.query.limit;
    const arrayLimit = products.slice(0, limit);
    res.status(200).json({
      status: "succes",
      msg: "lista de productos",
      data: arrayLimit,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "ocurrio un problema con los productos",
      data: error,
    });
  }
});

routerProducts.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const findProduct = await prodManager.getProductById(id);
    res.json({
      status: "succes",
      msg: "producto con el id " + id,
      data: findProduct,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "Producto no encontrado",
      data: null,
    });
  }
});

routerProducts.post("/", async (req, res) => {
  const product = req.body;
  try {
    await prodManager.addProduct(product);

    res.status(200).json({
      status: "succes",
      msg: "producto agregado correctamente",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "no se pudo agregar el producto",
      data: error,
    });
  }
});
