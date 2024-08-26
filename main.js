const mainContainer = document.querySelector(".main_container");
const productName = document.querySelector(".product_name");
const productPrice = document.querySelector(".product_price");
const productListContainer = document.querySelector(".product_list");
const totalProduct = document.querySelector(".total_product");
const totalPrice = document.querySelector(".total_price");
const inputContainer = document.querySelector(".input_container");
const form = document.querySelector(".inputs");
const nameError = document.querySelector(".name_error");
const priceError = document.querySelector(".price_error");
const notifications = document.querySelector(".notifications")

let productList = JSON.parse(localStorage.getItem("hazrat_product_list")) || [];

const generateUUID = () => {
  return crypto.randomUUID();
};

totalProduct.textContent = 0;
totalPrice.textContent = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct();
});

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
  if (productName.value !== "" && productPrice.value !== "") {
    productList = [
      ...productList,
      {
        id: generateUUID(),
        name: productName.value,
        price: productPrice.value,
      },
    ];

    localStorage.setItem("hazrat_product_list", JSON.stringify(productList));

    getAllProduct();
    showNotifications({
      value: productName.value,
      classname: "success_notifications",
    });

    productName.value = "";
    productPrice.value = "";
  } else {
    if (productName.value === "") {
      nameError.style.display = "block";
      productName.classList.add("error_input");
    }
    if (productPrice.value === "") {
      priceError.style.display = "block";
      productPrice.classList.add("error_input");
    }
  }
};

productName.addEventListener("focus", () => {
  nameError.style.display = "none";
  productName.classList.remove("error_input");
});
productPrice.addEventListener("focus", () => {
  priceError.style.display = "none";
  productPrice.classList.remove("error_input");
});

const deleteProduct = (id) => {
  product = productList.find((product) => product.id === id);
  productList = productList.filter((product) => product.id !== id);
  localStorage.setItem("hazrat_product_list", JSON.stringify(productList));
  getAllProduct();
  showNotifications({ value: product.name, classname: "delete_notifications" });
};

const showNotifications = ({ value, classname }) => {
  let notification = document.createElement("div");
  notification.classList.add("notification_div");
  let notificationText =
    classname === "success_notifications" ? "əlavə edildi" : "silindi";
  notification.textContent = `${value} adlı məhsul ${notificationText}`;
  notifications.appendChild(notification)

  setTimeout(() => {
    notification.classList.add(classname);

    setTimeout(() => {
      notifications.removeChild(notification)
    }, 3000);
  },10)
};
