import fs from "fs";

class CartManager {
  constructor() {
    this.path = "./src/persistence_files/carts.json";
    this.carts = [];
    this.lastIdPathCart = "./src/persistence_files/lastIdPathCart.json";
    this.id = 0;
    this.pathProducts = "./src/persistence_files/products.json";

    if (fs.existsSync(this.lastIdPathCart)) {
      const lastIdStringCart = fs.readFileSync(this.lastIdPathCart, "utf-8");
      const id = parseInt(lastIdStringCart);
      this.id = id;
    } else {
      const idStringCart = JSON.stringify(this.id);
      fs.writeFileSync(this.lastIdPathCart, idStringCart);
    }

    if (fs.existsSync(this.path)) {
      const cartsString = fs.readFileSync(this.path, "utf-8");
      const carts = JSON.parse(cartsString);
      this.carts = carts;
    } else {
      const cartsString = JSON.stringify(this.carts);
      fs.writeFileSync(this.path, cartsString);
    }
  }

  async addCart() {
    const file = await fs.promises.readFile(this.path, "utf-8");
    const carts = JSON.parse(file);

    const newId = ++this.id;
    const newIdString = JSON.stringify(newId);
    await fs.promises.writeFile(this.lastIdPathCart, newIdString);

    const cart = { id: newId, products: [] };

    carts.push(cart);

    const cartString = JSON.stringify(carts);
    await fs.promises.writeFile(this.path, cartString);
  }

  async getCartById(id) {
    const findCart = this.carts.find((cart) => cart.id == id);

    if (findCart) {
      return findCart.products;
    } else {
      throw "carrito no encontrado";
    }
  }

  async addProductToCart(idCart, idProduct) {
    const fileProducts = await fs.promises.readFile(this.pathProducts, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == idProduct);
    const findCart = this.carts.find((cart) => cart.id == idCart);

    if (!findProd || !findCart) {
      throw new Error("El carrito o el producto no existen");
    } else {
      const ifIdProdExistInCart = findCart.products.find(
        (prod) => prod.id == idProduct
      );

      if (ifIdProdExistInCart) {
        ifIdProdExistInCart.quantity += 1;

        const cartsString = JSON.stringify(this.carts);
        await fs.promises.writeFile(this.path, cartsString);
      } else {
        findCart.products.push({ id: findProd.id, quantity: 1 });

        const cartsString = JSON.stringify(this.carts);
        await fs.promises.writeFile(this.path, cartsString);
      }
    }
  }
}

export default CartManager;
