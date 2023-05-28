const socket = io();
const form = document.querySelector("form");
const fileInput = document.getElementById("thumbnail");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = parseInt(document.getElementById("price").value);
  const img = fileInput.files[0].name;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const status = document.getElementById("status").value;

  const product = {
    title,
    description,
    price,
    code,
    stock,
    status,
  };

  socket.emit("add_prod", { product, img });
  form.reset();
});

socket.on("todos_los_producos", (data) => {
  const products = data.products;
  const divProducts = document.getElementById("div-products");
  let contenido = "";

  products.forEach((prod) => {
    contenido += `<p>producto: ${prod.title} precio: ${prod.price}</p>`;
  });

  divProducts.innerHTML = contenido;
});
