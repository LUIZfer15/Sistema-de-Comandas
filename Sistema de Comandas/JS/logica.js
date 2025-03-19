// Selecionar itens do menu lateral
var menuItem = document.querySelectorAll(".item-lateral");

function selectLink() {
  menuItem.forEach((item) => item.classList.remove("ativo"));
  this.classList.add("ativo");
}

menuItem.forEach((item) => item.addEventListener("click", selectLink));

// Expandir menu lateral
var btnExp = document.querySelector("#btn-exp");
var menuSide = document.querySelector(".menu-lateral");

btnExp.addEventListener("click", function () {
  menuSide.classList.toggle("expandir");
});

// Expandir perfil
var personExp = document.querySelector('#person');
var profileSide = document.querySelector('.person');

personExp.addEventListener("click", function () {
  profileSide.classList.toggle("expProfile");
});

// Contador de Produtos
document.addEventListener("DOMContentLoaded", () => {
  const itemCount = document.querySelectorAll(".item-produto").length;
  document.querySelector(".registered .value").textContent = `(${itemCount})`;
});

// Deletar Produto
function deletar(event) {
  const item = event.target.closest(".item-produto");
  if (item && confirm("Tem certeza que deseja deletar?")) {
    item.remove();
    atualizarContador();
    alert("Produto deletado!");
  }
}

// Atualizar Contador
function atualizarContador() {
  const itemCount = document.querySelectorAll(".item-produto").length;
  document.querySelector(".registered .value").textContent = `(${itemCount})`;
}

// Upload imagem
const selectImg = document.querySelector(".select-img");
const inputFile = document.querySelector("#product-image");
const imgArea = document.querySelector(".img-area");

selectImg.addEventListener("click", function () {
  inputFile.click();
});

inputFile.addEventListener("change", function () {
  const image = this.files[0];
  if (!image) return;
  const reader = new FileReader();

  reader.onload = () => {
    imgArea.innerHTML = ""; // Remove qualquer imagem anterior
    const img = document.createElement("img");
    img.src = reader.result;
    imgArea.appendChild(img);
    imgArea.classList.add("active");
  };

  reader.readAsDataURL(image);
});

// Casa decimal preço de venda
function formatarMoeda(input) {
  let product_price = input.value.replace(/\D/g, "");
  if (product_price === "") {
    input.value = "";
    return;
  }
  product_price = (parseFloat(product_price) / 100)
    .toFixed(2)
    .replace(".", ",");
  input.value = "R$ " + product_price;
}

function restaurarPlaceholder(input) {
  if (input.value === "") {
    input.value = "";
  }
}

// Casa decimal preço promocional
function formatarMoeda2(input) {
  let product_promo = input.value.replace(/\D/g, "");
  if (product_promo === "") {
    input.value = "";
    return;
  }
  product_promo = (parseFloat(product_promo) / 100)
    .toFixed(2)
    .replace(".", ",");
  input.value = "R$ " + product_promo;
}

function restaurarPlaceholder2(input) {
  if (input.value === "") {
    input.value = "";
  }
}

// Expandir categoria
var btnExp2 = document.querySelector("#select");
var categorySide = document.querySelector(".category");

btnExp2.addEventListener("click", function () {
  categorySide.classList.toggle("expandir");
});

// Virar seta com click
var btnExp3 = document.querySelector("#select");
var arrow = document.querySelector("#arrow");

btnExp3.addEventListener("click", () => {
  arrow.classList.toggle("ativo2");
});

// Seleciona categoria e mudar background
var selecione = document.querySelector(".select");
var select_category = document.querySelectorAll(".select-category");

function selectCategory() {
  select_category.forEach((item) => item.classList.remove("ativo3"));
  this.classList.add("ativo3");
}

select_category.forEach((item) =>
  item.addEventListener("click", selectCategory)
);

// Selecionar categoria
document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("select");
  const selectText = select.querySelector(".selecione");
  const arrow = document.getElementById("arrow");
  const categoryList = document.querySelector(".category");
  const categoryItems = document.querySelectorAll(".select-category");

  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      selectText.textContent = this.textContent;
      categoryList.classList.remove("show");
      arrow.classList.remove("rotated");
    });
  });
});

// Fecha o menu após selecionar item
document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("select");
  const selectText = select.querySelector(".selecione");
  const categoryList = document.querySelector(".category");
  const categoryItems = document.querySelectorAll(".select-category");

  // Fecha o menu ao selecionar uma categoria
  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      selectText.textContent = this.textContent;
      categoryList.classList.remove("expandir");
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener("click", function (event) {
    if (
      !categoryList.contains(event.target) &&
      !select.contains(event.target)
    ) {
      categoryList.classList.remove("expandir");
      arrow.classList.remove("ativo2");
    }
  });
});

// Criar novo produto
document.addEventListener("DOMContentLoaded", function () {
  loadProducts(); // Carregar produtos ao iniciar
});

// Selecionar categoria e salvar a escolha
let selectedCategory = "";

document.querySelectorAll(".select-category").forEach((item) => {
  item.addEventListener("click", function () {
    selectedCategory = this.textContent;
    document.querySelector(".selecione").textContent = selectedCategory;
  });
});

// Salvar produto
function saveProduct() {
  let imageInput = document.getElementById("product-image");
  let name = document.getElementById("product_name").value.trim();
  let price = document.getElementById("product_price").value.trim();
  let promo = document.getElementById("product_promo").value.trim();
  let description = document.querySelector(".descrição input").value.trim();

  // Verifica se todos os campos estão preenchidos
  if (!imageInput.files.length || !name || !price || !description || !selectedCategory) {
    alert("Por favor, preencha todos os campos obrigatórios!");
    return;
  }

  let reader = new FileReader();
  reader.onload = function (e) {
    let imageUrl = e.target.result;

    let products = JSON.parse(localStorage.getItem("products")) || [];

    let newProduct = { imageUrl, name, price, promo, category: selectedCategory, description };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Produto salvo com sucesso!");
    window.location.href = "../HTML/produtos.html"; // Redireciona para a tela de produtos
  };

  reader.readAsDataURL(imageInput.files[0]);
}

// Carregar produtos na tela de produtos
function loadProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.classList.add("item-produto");
    productItem.innerHTML = `
      <div class="product-image">
        <img src="${product.imageUrl}" alt="${product.name}">
      </div>
      <p class="product-name">${product.name}</p>
      <div class="line5"></div>
      <p class="product-category">${product.category}</p>
      <p class="product-price">R$ ${product.price}</p>
      <p class="product-promo"> ${product.promo}</p>
      <p class="product-description">${product.description}</p>
      <div class="filtro">
        <input type="checkbox" id="check">
        <label for="check" class="button-check"></label>
      </div>
      <button onclick="deleteProduct(${index})"><i class="bi bi-trash3"></i></button>
    `;
    productList.appendChild(productItem);
  });

  atualizarContador();
}

// Deletar produto
function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  if (confirm("Tem certeza que deseja deletar este produto?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
  }
}

// Atualizar contador de produtos
function atualizarContador() {
  const itemCount = document.querySelectorAll(".item-produto").length;
  document.querySelector(".registered .value").textContent = `(${itemCount})`;
}