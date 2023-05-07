import express from "express";
import ProductManager from "./ProductManager";

const fs = require("fs");
const app = express();
app.use(express.urlencoded({ extended: true }));

const createFile = async () => {
  if (!fs.existsSync("products.json")) {
    return await fs.promises.writeFile("products.json", "[]");
  }
};
createFile();
