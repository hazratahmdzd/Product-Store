const productName = document.querySelector(".product_name");
const productPrice = document.querySelector(".product_price");
const productListContainer = document.querySelector(".product_list");
const totalProduct = document.querySelector(".total_product");
const totalPrice = document.querySelector(".total_price");
const inputContainer = document.querySelector(".input_container");

let productList = JSON.parse(localStorage.getItem("hazrat_product_list")) || [];

const generateUUID = () => {
  return crypto.randomUUID();
};

totalProduct.textContent = 0;
totalPrice.textContent = 0;

const getAllProduct = () => {
  productListContainer.innerHTML = "";
  let totalPriceValue = 0;
  if (productList.length > 0) {
    productList.map((product) => {
      let productElement = document.createElement("li");
      let productNameElement = document.createElement("span");
      let productPriceElement = document.createElement("span");
      let productDeleteButton = document.createElement("button");
      productDeleteButton.textContent = "Sil";
      productNameElement.textContent = product.name;
      productPriceElement.textContent = product.price;

      productDeleteButton.addEventListener("click", () =>
        deleteProduct(product.id)
      );

      productElement.append(productNameElement);
      productElement.append(productPriceElement);
      productElement.append(productDeleteButton);

      productListContainer.append(productElement);

      totalPriceValue += parseInt(product.price);
    });
  }
  totalProduct.textContent = productList.length;
  totalPrice.textContent = totalPriceValue;
};

getAllProduct();

const addProduct = () => {
  if (productName.value !== "" && productPrice.value !== "" ) {
    productList = [
      ...productList,
      {
        id: generateUUID(),
        name: productName.value,
        price: productPrice.value,
      },
    ];

    localStorage.setItem("hazrat_product_list", JSON.stringify(productList));

    productName.value = "";
    productPrice.value = "";

    getAllProduct();
  }
};

const deleteProduct = (id) => {
  productList = productList.filter((product) => product.id !== id);
  localStorage.setItem("hazrat_product_list", JSON.stringify(productList));
  getAllProduct();
};

inputContainer.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addProduct();
    }
})