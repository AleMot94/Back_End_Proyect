import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema =
  // ESQUEMA EN MONGO PARA PONER EL ObjetId (un objeto dentro de otro)
  new Schema({
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: { type: Number, default: 0 },
        },
      ],
      //default : [],  indica por defecto que es un array, si no tiene ningun valor
    },
  });

schema.plugin(mongoosePaginate);

// EJEMPLO DE POPULATE CON ESTE MIDDLEWARES PARA TODOS LOD FIND
/* schema.pre("find", function () {
  this.populate("products.product");
}); */

export const CartsModel = model("carts", schema);
