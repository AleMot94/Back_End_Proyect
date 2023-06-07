import { ProductsModel } from "../DAO/models/products.model.js";

class ProductsService {
  // VALIDACIONES FALTAN REFACTORIZAR
  //post
  async validatePost(title, description, price, code, stock, status) {
    if (!title || !description || !price || !code || !stock || !status) {
      console.log("validation error: please complete the fields.");
      throw "VALIDATION ERROR";
    }
  }
  //put
  async validatePut(title, description, price, code, stock, status, id) {
    const productFind = await ProductsModel.findOne({ id: id });

    if (!title || !description || !price || !code || !stock || !status) {
      console.log("validation error: please complete the fields.");
      throw "VALIDATION ERROR";
    }
    if (!productFind) {
      console.log("error: id not found.");
      throw "ERROR";
    }
  }
  // getById / delete
  async validateId(id) {
    const productFind = await ProductsModel.findOne({ _id: id });
    if (!productFind) {
      console.log("error: id not found.");
      throw "ERROR";
    }
  }

  // GET
  async getAllProducts() {
    const products = await ProductsModel.find({});
    return products;
  }
  // GET

  // POST
  async addProduct(
    { title, description, price, code, stock, status },
    thumbnail
  ) {
    this.validatePost(title, description, price, code, stock, status);
    const productCreated = await ProductsModel.create({
      title,
      description,
      price,
      code,
      stock,
      status,
      thumbnail,
    });
    return productCreated;
  }
  // POST

  // PUT
  async updateProduct(
    { title, description, price, code, stock, status },
    id,
    thumbnail
  ) {
    this.validatePut(id, title, description, price, code, stock, status);
    const productUptaded = await ProductsModel.updateOne(
      { _id: id },
      { title, description, price, code, stock, status, thumbnail }
    );
    return productUptaded;
  }
  // PUT

  //GET BY ID
  async getProductById(id) {
    this.validateId(id);
    const productFind = await ProductsModel.findOne({ _id: id });
    return productFind;
  }
  //GET BY ID

  //DELETE
  async deleteProduct(id) {
    this.validateId(id);
    const deleted = await ProductsModel.deleteOne({ _id: id });
    return deleted;
  }
  //DELETE
}

export const productsServices = new ProductsService();
