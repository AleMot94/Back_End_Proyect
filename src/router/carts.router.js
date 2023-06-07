import express from "express";
//import { cartManager } from "../DAO/classes/CartManager.js";
import { cartsServices } from "../services/carts.services.js";

export const routerCart = express.Router();

routerCart.get("/", async (req, res) => {
  try {
    const carts = await cartsServices.getAllCarts();

    res.status(200).json({
      status: "succes",
      msg: "all the carts",
      data: carts,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "error",
      msg: "something wrong",
      data: null,
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
      data: cart,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "error",
      msg: "cart not found",
      data: null,
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
      status: "succes",
      msg: "cart created",
      data: cart,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "error",
      msg: "could not save the cart",
      data: {},
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
      status: "succes",
      msg: "product added successfully",
      data: {},
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "error",
      msg: "could not save the product in the cart",
      data: {},
    });
  }

  /* try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    await cartManager.addProductToCart(idCart, idProduct);

    res.status(200).json({
      status: "succes",
      msg: "producto agregado correctamente",
      data: {},
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "hubo un error",
      data: error.message,
    });
  } */
});

routerCart.delete("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;

    await cartsServices.deleteCart(idCart);

    res.status(200).json({
      status: "succes",
      msg: "cart delete",
      data: {},
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "error",
      msg: "could not delete cart",
      data: error,
    });
  }
});
