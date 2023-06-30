import express from "express";
//import { cartManager } from "../DAO/classes/CartManager.js";
import { cartsServices } from "../services/carts.services.js";

export const routerCart = express.Router();

routerCart.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const carts = await cartsServices.getAllCarts(page, limit);

    res.status(200).json({
      status: "succes",
      msg: "all the carts",
      payload: carts,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "something wrong",
      payload: error,
    });
  }
});

routerCart.get("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;

    const cart = await cartsServices.getCartById(id);

    res.status(200).json({
      status: "succes",
      msg: "cart found whit id : " + id,
      payload: cart,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "cart not found",
      payload: error,
    });
  }

  /* try {
    const id = req.params.cid;
    const cart = await cartManager.getCartById(id);
    res.status(200).json({
      status: "succes",
      msg: "carrito encontrado",
      data: cart,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "hubo un error",
      data: error,
    });
  } */
});

routerCart.post("/", async (req, res) => {
  try {
    const cart = await cartsServices.addCart();

    res.status(200).json({
      status: "success",
      msg: "cart created",
      payload: cart,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "could not save the cart",
      payload: error,
    });
  }

  /* await cartManager.addCart();
  res.status(200).json({
    status: "succes",
    msg: "carrito creado",
    data: {},
  }); */
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    await cartsServices.addProductToCart(idCart, idProduct);

    res.status(200).json({
      status: "success",
      msg: "product added successfully",
      payload: {},
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "could not save the product in the cart",
      payload: {},
    });
  }
});

routerCart.delete("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;

    await cartsServices.deleteCart(idCart);

    res.status(200).json({
      status: "success",
      msg: "cart delete",
      payload: {},
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "error",
      msg: "could not delete cart",
      payload: error,
    });
  }
});

routerCart.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    await cartsServices.deleteProductInCart(idCart, idProduct);

    res.status(200).json({
      status: "success",
      msg: "product in cart delete",
      payload: {},
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "could not delete product in cart",
      payload: error,
    });
  }
});

routerCart.put("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const newProducts = req.body;

    await cartsServices.updateCart(idCart, newProducts);

    res.status(200).json({
      status: "success",
      msg: "products in cart update",
      payload: {},
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "could not update products in cart",
      payload: error,
    });
  }
});
