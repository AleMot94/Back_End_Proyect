import express from "express";
//import { productManager } from "../DAO/classes/ProductManager.js";
import { uploader } from "../utils/multer.js";
//import { ProductsModel } from "../DAO/models/products.model.js";
import { productsServices } from "../services/products.services.js";

export const routerProducts = express.Router();

routerProducts.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const allProductsWithPaginate = await productsServices.getAllProducts(
      page,
      limit
    );
    const arrayProducts = allProductsWithPaginate.products;

    // falta refactorizar la respuesta
    return res.status(200).json({
      status: "success",
      msg: "list of products",
      payload: arrayProducts,
      totalPages: allProductsWithPaginate.totalPages,
      prevPage: allProductsWithPaginate.prevPage,
      nextPage: allProductsWithPaginate.nextPage,
      page: allProductsWithPaginate.page,
      hasPrevPage: allProductsWithPaginate.hasPrevPage,
      hasNextPage: allProductsWithPaginate.hasNextPage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      msg: "something went wring",
      payload: {},
    });
  }

  /*  GET DE PRODUCTOS SIN MONGO ANTIGUO 
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
 */
});

routerProducts.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;

    const product = await productsServices.getProductById(id);

    // falta refactorizar la respuesta
    res.json({
      status: "succes",
      msg: "product found whit id : " + id,
      payload: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "product not found",
      payload: error,
    });
  }
  /* try {
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
  } */
});

routerProducts.post("/", uploader.single("file"), async (req, res) => {
  if (!req.file) {
    // falta refactorizar los errores
    res.status(400).json({
      status: "error",
      msg: "no file loaded",
      payload: {},
    });
  } else {
    try {
      //falta refactorizar estas constantes
      const product = req.body;
      const img = "http://localhost:8080/" + req.file.filename;

      const productAdd = await productsServices.addProduct(product, img);

      // falta refactorizar la respuesta
      res.status(200).json({
        status: "succes",
        msg: "product added successfully",
        data: productAdd,
      });
    } catch (error) {
      // falta refactorizar los errores
      res.status(404).json({
        status: "error",
        msg: "could not save the product",
        payload: {},
      });
    }

    /* try { POST DE PRODUCTOS SIN MONGO ANTIGUO 
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
    } */
  }
});

routerProducts.put("/:pid", uploader.single("file"), async (req, res) => {
  if (!req.file) {
    // falta refactorizar los errores
    res.status(400).json({
      status: "error",
      msg: "no se cargo ningun archivo",
      payload: {},
    });
  } else {
    try {
      //falta refactorizar estas constantes
      const product = req.body;
      const id = req.params.pid;
      const img = "http://localhost:8080/" + req.file.filename;

      const productUpdate = await productsServices.updateProduct(
        product,
        id,
        img
      );

      // falta refactorizar la respuesta
      return res.status(201).json({
        status: "success",
        msg: "product uptaded",
        payload: productUpdate,
      });
    } catch (error) {
      // falta refactorizar logger
      console.log(error);
      //falta refactorizar los errores
      return res.status(500).json({
        status: "error",
        msg: "something went wrong",
        payload: {},
      });
    }
    /* try {
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
    } */
  }
});

routerProducts.delete("/:pid", async (req, res) => {
  try {
    //falta refactorizar estas constantes
    const id = req.params.pid;

    await productsServices.deleteProduct(id);

    // falta refactorizar la respuesta
    res.status(200).json({
      status: "succes",
      msg: "product delete",
      payload: {},
    });
  } catch (error) {
    //falta refactorizar logger
    console.log(error);
    //falta refactorizar los errores
    res.status(404).json({
      status: "error",
      msg: "could not delete product",
      payload: error,
    });
  }

  /* try {
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
  } */
});
