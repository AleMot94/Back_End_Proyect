import { ProductsModel } from "../DAO/models/products.model.js";

class ProductsService {
  async getAllProducts() {
    const products = await ProductsModel.find({});
    return products;
  }
}

export const productsServices = new ProductsService();
