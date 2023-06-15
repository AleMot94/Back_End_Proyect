import { CartsModel } from "../DAO/models/carts.model.js";
import ProductsModel from "../DAO/models/products.model.js";

class CartsServices {
  async validateIdCart(id) {
    const cartFind = await CartsModel.findOne({ _id: id });
    if (!cartFind) {
      console.log("error: id not found.");
      throw "ERROR";
    }
  }

  async validateIdProduct(id) {
    const productFind = await ProductsModel.findOne({ _id: id });
    if (!productFind) {
      console.log("error: id not found.");
      throw "ERROR";
    }
  }

  async getAllCarts() {
    const carts = await CartsModel.find({});
    return carts;
  }

  async addCart() {
    //let quantity = 0;
    const products = [];
    const cart = await CartsModel.create({ products });
    return cart;

    // VIEJO, NO TIENE POPULACION
    // const cart = await CartsModel.create({
    //   products: [],
    //   quantity: 0,
    // });
    // return cart;
  }

  async getCartById(id) {
    this.validateIdCart(id);
    const cartFind = await CartsModel.findOne({ _id: id });
    return cartFind;
  }

  async addProductToCart(idCart, idProduct) {
    this.validateIdCart(idCart);
    this.validateIdProduct(idProduct);
    let quantity = 0;

    let cart = await CartsModel.findOne({ _id: idCart }).populate(
      "products.product"
    );

    const newProduct = await ProductsModel.findOne({ _id: idProduct });
    /* let cart = await CartsModel.findOne({ _id: idCart }); // SIN POPULAR

    let cartPopulate = await CartsModel.findOne({ _id: idCart }).populate(
      "products"
    ); // DATO POPULADO */

    cart.products.push({ product: newProduct, quantity });

    console.log("DATO SIN POPULAR " + cart);
    console.log(" DATO POPULADO " + JSON.stringify(cart, null, 2));

    await CartsModel.updateOne({ _id: idCart }, cart);

    // VIEJO NO TIENE LA POPULACION
    // const cartFind = await CartsModel.findOne({ _id: idCart });
    // const productFind = await ProductsModel.findOne({ _id: idProduct });

    // cartFind.products.push(productFind);

    // await cartFind.save();
  }

  async deleteCart(id) {
    this.validateIdCart(id);
    const deleted = await CartsModel.deleteOne({ _id: id });
    return deleted;
  }
}
export const cartsServices = new CartsServices();
