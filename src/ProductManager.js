import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "products.json";
    this.products = [];
    this.id = 0;
    if (!fs.existsSync(this.path)) return fs.writeFileSync(this.path, "[]");
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        fs.writeFileSync(this.path, "[]");
      } else {
        throw err;
      }
    }
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
    return fileProductsParse;
  }

  async getProductById(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd) {
      return findProd;
    } else {
      return { error: "no se encontro producto con es id" };
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
