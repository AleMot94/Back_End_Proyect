import { Schema, model } from "mongoose";

export const ProductsModel = model(
  "products", // COLECCION EN LA BASE DE DATOS
  new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, required: true },
  })
);
