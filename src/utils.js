// VARIABLE DIR
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//MULTER CONFIGURACION
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

// OBTIENE LOS PRODUCTOS PARA viewProducts
import fs from "fs";
export const getProducts = async () => {
  const fileProducts = await fs.promises.readFile(
    "./src/persistence_files/products.json",
    "utf-8"
  );
  const fileProductsParse = JSON.parse(fileProducts);

  if (!fileProductsParse) {
    throw "no se encontro el archivo con los productos";
  } else {
    return fileProductsParse;
  }
};

// CONNECT MONGOOSE

import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://alejandro1031m:UWj8WnywnULhodYx@ale-cluster0.cywkeum.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("plug to mongo");
  } catch (error) {
    console.log(error);
    throw "can not connect to the db";
  }
}
