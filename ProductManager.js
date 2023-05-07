const fs = require("fs");

const createFile = async () => {
  if (!fs.existsSync("products.json")) {
    return await fs.promises.writeFile("products.json", "[]");
  }
};

createFile();

class ProductManager {
  constructor() {
    this.path = "products.json";
    this.products = [];
    this.id = 0;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const file = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(file);
    this.products = products;

    const codeError = this.products.find((prod) => prod.code == code);

    if (codeError) {
      console.log("Error code, existing code");
    } else {
      this.id++;
      title = title || "no se ingreso ningun valor";
      description = description || "no se ingreso ningun valor";
      price = price || "no se ingreso ningun valor";
      thumbnail = thumbnail || "no se ingreso ningun valor";
      code = code || "no se ingreso ningun valor";
      stock = stock || "no se ingreso ningun valor";

      if (
        title == "no se ingreso ningun valor" ||
        description == "no se ingreso ningun valor" ||
        price == "no se ingreso ningun valor" ||
        thumbnail == "no se ingreso ningun valor" ||
        code == "no se ingreso ningun valor" ||
        stock == "no se ingreso ningun valor"
      ) {
        console.log("Error: hay campos sin completar");
      } else {
        const product = {
          id: this.id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        this.products.push(product);
        const productsString = JSON.stringify(this.products);
        await fs.promises.writeFile(this.path, productsString);
      }
    }
  }

  async getProducts() {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    console.log(fileProductsParse);
  }

  async getProductById(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd) {
      return console.log(findProd);
    } else {
      console.log("producto no encontrado");
    }
  }

  async updateProduct(id, prop, newValor) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd == undefined) {
      console.log("producto no encontrado");
    } else {
      findProd[prop] = newValor;
      const productsString = JSON.stringify(fileProductsParse);
      await fs.promises.writeFile(this.path, productsString);
    }
  }

  async deleteProduct(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const positionProduct = fileProductsParse.findIndex(
      (prod) => prod.id == id
    );

    if (positionProduct == -1) {
      console.log("producto no encontrado");
    } else {
      delete fileProductsParse[positionProduct];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== undefined
      );

      const productsString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsString);
    }
  }
}

const prodManager = new ProductManager();

async function algo() {
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
  console.log("TODOS LOS PRODUCTOS");
  await prodManager.getProducts();

  console.log("SE BUSCA UN PRODUCTO POR SI ID");
  await prodManager.getProductById(2);

  console.log(
    "SE ACTUALIZA UN CAMPO DEL PRODUCTO BUSCADO POR SI ID, EL TITULO EN ESTE CASO"
  );
  await prodManager.updateProduct(2, "title", "nuevo titulo");

  await prodManager.getProductById(2);

  console.log("ELIMINAR UN PRODUCTO POR SU ID, EN ESTE CASO CON EL ID 3");
  await prodManager.deleteProduct(3);

  await prodManager.getProducts();
}

algo();

export default ProductManager;
