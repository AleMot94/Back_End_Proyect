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

// OBTIENE LOS PRODUCTOS PARA viewOriducts
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
