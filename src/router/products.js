import express from "express";
import ProductManager from "../classes/ProductManager.js";
import { uploader } from "../utils.js";

export const routerProducts = express.Router();

export const prodManager = new ProductManager();

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
    console.log(findProduct);
    res.json({
      status: "succes",
      msg: "producto con el id " + id,
      data: findProduct,
    });
  } catch (error) {
    console.log(findProduct);
    res.status(404).json({
      status: "error",
      msg: "Producto no encontrado",
      data: null,
    });
  }
});

routerProducts.post("/", uploader.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      status: "error",
      msg: "no se cargo ningun archivo",
      data: product,
    });
  } else {
    try {
      const product = req.body;
      const img = "http://localhost:8080/" + req.file.filename;

      await prodManager.addProduct(product, img);

      res.status(200).json({
        status: "succes",
        msg: "producto agregado correctamente",
        data: product,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        msg: "no se pudo agregar",
        data: error,
      });
    }
  }
});

routerProducts.put("/:pid", uploader.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      status: "error",
      msg: "no se cargo ningun archivo",
      data: {},
    });
  } else {
    try {
      const product = req.body;
      const id = req.params.pid;
      const img = "http://localhost:8080/" + req.file.filename;

      await prodManager.updateProduct(id, product, img);

      res.status(200).json({
        status: "succes",
        msg: "producto actualizado correctamente",
        data: product,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        msg: "no se pudo actualizar el producto",
        data: error,
      });
    }
  }
});

routerProducts.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;

    await prodManager.deleteProduct(id);

    res.status(200).json({
      status: "succes",
      msg: "producto eliminado correctamente",
      data: {},
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "no se pudo eliminar el producto",
      data: error,
    });
  }
});
