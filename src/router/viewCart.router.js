import express from "express";

export const routerViewCart = express.Router();

routerViewCart.get("/:cid", (req, res) => {
  try {
    const idCart = req.params.cid;

    return res.render("cart", {});
  } catch (error) {}
});
