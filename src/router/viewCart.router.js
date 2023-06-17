import express from "express";
import { cartsServices } from "../services/carts.services.js";

export const routerViewCart = express.Router();

routerViewCart.get("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;

    const cart = await cartsServices.getCartByIdPopulate(idCart);

    return res.render("cart", { cart: cart });
  } catch (error) {
    console.log(error);
  }
});
