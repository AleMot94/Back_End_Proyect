import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "./src/persistence_files/products.json";
    this.products = [];
    this.lastIdPath = "./src/persistence_files/lastIdPath.json";
    this.id = 0;

    if (fs.existsSync(this.lastIdPath)) {
      const lastIdString = fs.readFileSync(this.lastIdPath, "utf-8");
      const id = parseInt(lastIdString);
      this.id = id;
    } else {
      const idString = JSON.stringify(this.id);
      fs.writeFileSync(this.lastIdPath, idString);
    }

    if (fs.existsSync(this.path)) {
      const productsString = fs.readFileSync(this.path, "utf-8");
      const products = JSON.parse(productsString);
      this.products = products;
    } else {
      const prodString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, prodString);
    }
  }

  async addProduct(product) {
    const file = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(file);

    const codeError = products.find((prod) => prod.code == product.code);

    if (codeError) {
      throw new Error("Error code, existing code");
    } else {
      const newId = ++this.id;
      const newIdString = JSON.stringify(newId);
      await fs.promises.writeFile(this.lastIdPath, newIdString);

      const title = product.title || "no se ingreso un titulo";
      const description =
        product.description || "no se ingreso una descripcion";
      const price = product.price || "no se ingreso un precio";
      const thumbnail = product.thumbnail || "no se ingreso una imagen";
      const code = product.code || "no se ingreso un codigo";
      const stock = product.stock || "no se ingreso cantidad de stock";

      const errorMessages = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };

      if (title == "no se ingreso un titulo") {
        throw new Error(errorMessages.title);
      }
      if (description == "no se ingreso una descripcion") {
        throw new Error(errorMessages.description);
      }
      if (price == "no se ingreso un precio") {
        throw new Error(errorMessages.price);
      }
      if (thumbnail == "no se ingreso una imagen") {
        throw new Error(errorMessages.thumbnail);
      }
      if (code == "no se ingreso un codigo") {
        throw new Error(errorMessages.code);
      }
      if (stock == "no se ingreso cantidad de stock") {
        throw new Error(errorMessages.stock);
      } else {
        const product = {
          id: newId,
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

    if (!fileProductsParse) {
      throw new Error("no se encontro el archivo con los productos");
    } else {
      return fileProductsParse;
    }
  }

  async getProductById(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd) {
      return findProd;
    } else {
      throw new Error("producto no encontrado");
    }
  }

  async updateProduct(id, updateProd) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd == undefined) {
      throw new Error("no se encontro un producto con ese ID");
    } else {
      const validKeys = [
        "title",
        "description",
        "price",
        "thumbnail",
        "code",
        "stock",
      ];
      const updateKeys = Object.keys(updateProd);
      for (let key of updateKeys) {
        if (!validKeys.includes(key)) {
          throw new Error(`La propiedad '${key}' no es válida`);
        }
      }

      for (let prop in updateProd) {
        if (prop in findProd && prop !== "id") {
          findProd[prop] = updateProd[prop];
        } else {
          throw new Error("no se puede modificar el ID");
        }
      }
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
      throw new Error("producto no encontrado");
    } else {
      delete fileProductsParse[positionProduct];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== undefined
      );
      const productsString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsString);
      return "producto eliminado";
    }
  }
}

export default ProductManager;
