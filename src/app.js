import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const prodManager = new ProductManager();

async function addProd() {
  try {
    await prodManager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    });

    await prodManager.addProduct({
      title: "producto prueba 2",
      description: "Este es un producto prueba 2",
      price: 300,
      thumbnail: "Sin imagen",
      code: "abc124",
      stock: 25,
    });

    await prodManager.addProduct({
      title: "producto prueba 3",
      description: "Este es un producto prueba 3",
      price: 100,
      thumbnail: "Sin imagen",
      code: "abc125",
      stock: 25,
    });

    await prodManager.addProduct({
      title: "producto prueba 4",
      description: "Este es un producto prueba 4",
      price: 400,
      thumbnail: "Sin imagen",
      code: "abc126",
      stock: 25,
    });

    await prodManager.addProduct({
      title: "producto prueba 5",
      description: "Este es un producto prueba 5",
      price: 500,
      thumbnail: "Sin imagen",
      code: "abc127",
      stock: 25,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await addProd();

    app.get("/", (req, res) => {
      res.status(200).send("primer endpoint");
    });

    app.get("/products", async (req, res) => {
      const products = await prodManager.getProducts();
      const limit = req.query.limit;
      const arrayLimit = products.slice(0, limit);
      res.json({
        status: "succes",
        msg: "lista de productos",
        data: arrayLimit,
      });
    });

    app.get("/products/:pid", async (req, res) => {
      const id = req.params.pid;
      const findProduct = await prodManager.getProductById(id);
      res.json({
        status: "succes",
        msg: "producto con el id " + id,
        data: findProduct,
      });
    });

    app.listen(port, () => console.log(`escuchando el puerto ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
