import express from "express";
import CartManager from "../classes/CartManager.js";

export const routerCart = express.Router();

const cartManager = new CartManager();

routerCart.post("/", async (req, res) => {
  await cartManager.addCart();
  res.status(200).json({
    status: "succes",
    msg: "carrito creado",
    data: {},
  });
});

routerCart.get("/:cid", async (req, res) => {
  try {
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
  }
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  try {
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
  }
});
