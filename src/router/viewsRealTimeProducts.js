import express from "express";

export const routerViewRealTimeProducts = express.Router();

routerViewRealTimeProducts.get("/", async (req, res) => {
  return res.render("realTimeProducts");
});
