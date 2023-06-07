import { Schema, model } from "mongoose";

export const MessagesModel = model(
  "messages", // COLECCION EN LA BASE DE DATOS
  new Schema({
    user: { type: Text },
    message: { type: Text },
  })
);
