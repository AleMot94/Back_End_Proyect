import express from "express";
import ProductManager from "./ProductManager.js";

const prodManager = new ProductManager();

async function addProd() {
  await prodManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );

  await prodManager.addProduct(
    "producto prueba 2",
    "Este es un producto prueba 2",
    200,
    "Sin imagen",
    "abc124",
    25
  );

  await prodManager.addProduct(
    "producto prueba 3",
    "Este es un producto prueba 3",
    200,
    "Sin imagen",
    "abc125",
    25
  );

  await prodManager.addProduct(
    "producto prueba 4",
    "Este es un producto prueba 4",
    200,
    "Sin imagen",
    "abc126",
    25
  );

  await prodManager.addProduct(
    "producto prueba 5",
    "Este es un producto prueba 5",
    200,
    "Sin imagen",
    "abc127",
    25
  );
}

addProd();

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("primer endpoint");
});

app.get("/products", async (req, res) => {
  const products = await prodManager.getProducts();
  const limit = req.query.limit;
  const arrayLimit = products.slice(0, limit);
  res.json({ status: "succes", msg: "lista de productos", data: arrayLimit });
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
