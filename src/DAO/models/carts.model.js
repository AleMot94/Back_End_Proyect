import { Schema, model } from "mongoose";

export const CartsModel = model(
  "carts", // COLECCION EN LA BASE DE DATOS
  new Schema({
    products: { type: Array },
    quantity: { type: Number },
  })
);
