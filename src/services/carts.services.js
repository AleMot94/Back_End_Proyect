import { CartsModel } from "../DAO/models/carts.model.js";
import ProductsModel from "../DAO/models/products.model.js";

class CartsServices {
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

  async addProductToCart(idCart, idProduct, quantity) {
    this.validateIdCart(idCart);
    this.validateIdProduct(idProduct);

    let cart = await CartsModel.findOne({ _id: idCart }).populate(
      "products.product"
    );
    const product = await ProductsModel.findOne({ _id: idProduct });

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product._id.toString() === idProduct
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += parseInt(quantity);
    } else {
      cart.products.push({ product: product, quantity: parseInt(quantity) });
    }

    // console.log("DATO SIN POPULAR " + cart);
    // console.log(" DATO POPULADO " + JSON.stringify(cart, null, 2));
    await CartsModel.updateOne({ _id: idCart }, cart);

    return JSON.stringify(cart, null, 2);
  }
  // VIEJO NO TIENE LA POPULACION
  // const cartFind = await CartsModel.findOne({ _id: idCart });
  // const productFind = await ProductsModel.findOne({ _id: idProduct });

  // cartFind.products.push(productFind);

  // await cartFind.save();

  async deleteProductInCart(idCart, idProduct) {
    this.validateIdCart(idCart);

    const cart = await CartsModel.findOne({ _id: idCart });

    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === idProduct
    );

    if (productIndex === -1) {
      throw "Error: product not found in the cart.";
    } else {
      cart.products.splice(productIndex, 1);
      await cart.save();
    }
    /* 
    const cart = await CartsModel.findOne({ _id: idCart });

    // Encontrar el índice del producto en el array de productos del carrito
    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === idProduct
    );

    if (productIndex === -1) {
      console.log("Error: product not found in the cart.");
      throw "ERROR";
    }

    // Eliminar el producto del array de productos del carrito
    cart.products.splice(productIndex, 1);

    await cart.save();

    console.log("Product deleted from cart.");
 */
  }

  async deleteCart(id) {
    this.validateIdCart(id);
    const deleted = await CartsModel.deleteOne({ _id: id });
    return deleted;
  }

  async updateCart(idCart, newProducts) {
    this.validateIdCart(idCart);

    const cart = await CartsModel.findOne({ _id: idCart });

    const updatedProducts = newProducts.map((product) => ({
      _id: product._id.toString(),
    }));

    cart.products = updatedProducts;

    await cart.save();
  }
}
export const cartsServices = new CartsServices();
