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
