import { ProductsModel } from "../DAO/models/products.model.js";
import { CartsModel } from "../DAO/models/carts.model.js";

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
    if (productFind) {
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

  async validateIdCart(id) {
    const cartFind = await CartsModel.findOne({ _id: id });
    if (!cartFind) {
      console.log("error: id not found in cart.");
      throw "ERROR";
    }
  }

  async validateIdProduct(id) {
    const productFind = await ProductsModel.findOne({ _id: id });
    if (!productFind) {
      console.log("error: id not found in products.");
      throw "ERROR";
    }
  }

  // GET
  async getAllProducts(page, limit) {
    // productos sin aplanar
    const products = await ProductsModel.paginate(
      {},
      { limit: limit || 5, page: page || 1 }
    );

    // docs de paginate (aplanado de los productos)
    let productsFlat = products.docs.map((prod) => {
      return {
        id: prod._id.toString(),
        title: prod.title,
        description: prod.description,
        price: prod.price,
        thumbnail: prod.thumbnail,
        code: prod.code,
        stock: prod.stock,
        status: prod.status,
      };
    });

    // productos aplanados con datos de paginate (respuesta para el front)
    const productsFlatPaginate = {
      products: productsFlat,
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      page: products.page,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
    };

    return productsFlatPaginate;
  }
  // GET

  // POST
  async addProduct(
    { title, description, price, code, stock, status },
    thumbnail
  ) {
    try {
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
    } catch (error) {
      console.log(error);
      throw "code already exist";
    }
  }
  // POST

  // PUT
  async updateProduct(
    { title, description, price, code, stock, status },
    id,
    thumbnail
  ) {
    try {
      await this.validatePut(
        title,
        description,
        price,
        code,
        stock,
        status,
        id
      );

      const productUpdated = await ProductsModel.updateOne(
        { _id: id },
        { title, description, price, code, stock, status, thumbnail }
      );

      return productUpdated;
    } catch (error) {
      console.log(error);
      throw "ERROR: Product not found";
    }
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

  async updateQuantityProduct(idCart, idProduct, quantity) {
    try {
      this.validateIdCart(idCart);

      let cart = await CartsModel.findOne({ _id: idCart });

      const productInCart = cart.products.find(
        (item) => item.product.toString() === idProduct
      );

      if (productInCart) {
        productInCart.quantity += quantity;
        await cart.save();
      } else {
        console.log("Product not found in cart.");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const productsServices = new ProductsService();
