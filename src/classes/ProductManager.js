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

  async addProduct(product, img) {
    const file = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(file);

    const productKeys = Object.keys(product);
    const profuctFormat = [
      "title",
      "description",
      "price",
      "status",
      "code",
      "stock",
    ];

    console.log("productKeys    " + productKeys);
    console.log("productFormat    " + profuctFormat);

    const isEqual =
      JSON.stringify(productKeys) === JSON.stringify(profuctFormat);

    if (isEqual) {
      const codeError = products.find((prod) => prod.code == product.code);

      if (codeError) {
        throw "codigo del producto ya existente";
      } else {
        const newId = ++this.id;
        const newIdString = JSON.stringify(newId);
        await fs.promises.writeFile(this.lastIdPath, newIdString);

        const title = product.title || "no se ingreso un titulo";
        const description =
          product.description || "no se ingreso una descripcion";
        const price = product.price || "no se ingreso un precio";
        const thumbnail = img || "no se ingreso una imagen";
        const code = product.code || "no se ingreso un codigo";
        const stock = product.stock || "no se ingreso cantidad de stock";
        const status = product.status || "no se ingreso el estado";

        const errorMessages = {
          title: title,
          description: description,
          price: price,
          thumbnail: img,
          code: code,
          stock: stock,
        };

        if (title == "no se ingreso un titulo") {
          throw errorMessages.title;
        }
        if (description == "no se ingreso una descripcion") {
          throw errorMessages.description;
        }
        if (price == "no se ingreso un precio") {
          throw errorMessages.price;
        }
        if (thumbnail == "no se ingreso una imagen") {
          throw errorMessages.thumbnail;
        }
        if (code == "no se ingreso un codigo") {
          throw errorMessages.code;
        }
        if (stock == "no se ingreso cantidad de stock") {
          throw errorMessages.stock;
        }
        if (status == "no se ingreso el estado") {
          throw errorMessages.status;
        } else {
          const product = {
            id: newId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
          };

          this.products.push(product);
          const productsString = JSON.stringify(this.products);
          await fs.promises.writeFile(this.path, productsString);
        }
      }
    } else {
      throw "la estructura del producto no es valida";
    }
  }

  async getProducts() {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    if (!fileProductsParse) {
      throw "no se encontro el archivo con los productos";
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
      throw "producto no encontrado";
    }
  }

  async updateProduct(id, updateProd, img) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);
    console.log(findProd);
    findProd.thumbnail = img;
    console.log(findProd);

    if (!findProd) {
      throw "no se encontró un producto con ese ID";
    } else {
      const validKeys = [
        "title",
        "description",
        "price",
        "code",
        "stock",
        "status",
      ];
      const updateKeys = Object.keys(updateProd);
      for (let key of updateKeys) {
        if (!validKeys.includes(key)) {
          throw `La propiedad '${key}' no es válida`;
        }
      }

      for (let prop in updateProd) {
        if (prop in findProd) {
          findProd[prop] = updateProd[prop];
        } else {
          throw `La propiedad '${prop}' no existe en el producto`;
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
      throw "producto no encontrado";
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
