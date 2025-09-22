"use strict";

const foodMenu = [
  {
    foodName: "Caesar Salad",
    foodDescription: "Fresh romaine lettuce with parmesan cheese and croutons",
    foodPrice: "$12.99",
    foodImage: "./assets/images/caesar-salad.png",
    foodid: "1",
  },

  {
    foodName: "Grilled Salmon",
    foodDescription: "Atlantic salmon with herbs and lemon butter sauce",
    foodPrice: "$28.99",
    foodImage: "./assets/images/grilled-salmon.png",
    foodid: "2",
  },

  {
    foodName: "Chocolate Cake",
    foodDescription: "Rich chocolate cake with vanilla ice cream",
    foodPrice: "$8.99",
    foodImage: "./assets/images/chocolate-cake.png",
    foodid: "3",
  },

  {
    foodName: "Fresh Orange Juice",
    foodDescription: "Freshly squeezed orange juice",
    foodPrice: "$4.99",
    foodImage: "./assets/images/fresh-orange-juice.png",
    foodid: "4",
  },

  {
    foodName: "Beef Tenderloin",
    foodDescription: "Premium beef with roasted vegetables",
    foodPrice: "$35.99",
    foodImage: "./assets/images/beef-tenderloin.png",
    foodid: "2",
  },

  {
    foodName: "Bruschetta",
    foodDescription: "Toasted bread with tomatoes and basil",
    foodPrice: "$9.99",
    foodImage: "./assets/images/bruschetta.png",
    foodid: "1",
  },
];

//selecting Elements
const loginScreen = document.querySelector(".login-background");
const h1 = document.querySelector(".login--title");
const p = document.querySelector(".login--subtitle");
const app = document.querySelector(".App");
const role = document.getElementById("role");
const loginBtn = document.querySelector(".login--btn");
const userInput = document.querySelector(".userid");
const accessKey = document.querySelector(".a-key");
const error = document.querySelector(".error--message");
const notificationArea = document.querySelector(".error-area");
const foodContainer = document.querySelector(".food-item-key");
const tag = document.querySelector(".filterd--tags");
const badge = document.querySelector(".badge");
const cart = document.querySelector(".fa-cart-shopping");

const userid = "4412025";
const pwd = "123";
let badgeCount = "0";

//Handle Notification
const handleNotification = function (msg, time) {
  setTimeout(() => {
    notificationArea.classList.remove("hidden");
    error.textContent = msg;

    setTimeout(() => {
      notificationArea.classList.add("hidden");
    }, 3000);
  }, time);
};

//Form Validation
const formValidate = function () {
  if (
    userInput.value === "" ||
    userInput.value === "  " ||
    userInput.value !== userid
  ) {
    userInput.style.border = "3px solid red";
    handleNotification("Please enter User ID", 500);
  } else {
    userInput.style.border = "none";
  }

  //dropdown
  if (role.value === "select an option") {
    role.style.border = "3px solid red";
    handleNotification("Please select Role ", 1000);
  } else {
    role.style.border = "none";
  }

  //passsword
  if (
    accessKey.value === "" ||
    accessKey.value === "  " ||
    accessKey.value !== pwd
  ) {
    accessKey.style.border = "3px solid red";
    handleNotification("Please Enter Password ", 1500);
  } else {
    accessKey.style.border = "none";
  }
};

// login Button listner

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formValidate();
  if (
    userInput.value === userid &&
    role.value === "user" &&
    accessKey.value === pwd
  ) {
    document.body.style.backgroundColor = "none";
    document.body.classList.add("logged-in");
    document.title = "Nap-Home";
    loginScreen.classList.add("hidden");
    h1.classList.add("hidden");
    p.classList.add("hidden");
    app.classList.remove("hidden");
  }
});

//creating food cards
const createMenu = function (foodobj) {
  foodobj.map((food) => {
    const html = `
    <div class="food-menu">
                        <div class="food-image">
                            <img src=${food.foodImage} alt="Food Image", draggable="false">
                        </div>
                        <div class="food-details">
                            <h3 class="food-name">${food.foodName}</h3>
                            <p class="food-description">${food.foodDescription}</p>
                            <p class="food-price">${food.foodPrice}</p>
                            <button class="add-to-cart-btn">Add to Cart</button>
                        </div>
     </div>`;
    foodContainer.insertAdjacentHTML("beforeend", html);
  });
};

createMenu(foodMenu); //inital display all food menu

//Filtering menus

tag.addEventListener("click", function (e) {
  if (e.target.classList.contains("tagitem")) {
    const filterFood = foodMenu.filter(
      (food) => e.target.dataset.filter === food.foodid
    );

    if (filterFood) {
      foodContainer.innerHTML = "";
      createMenu(filterFood);
    }

    if (e.target.dataset.filter === "0") {
      foodContainer.innerHTML = "";
      createMenu(foodMenu);
    }
  }
});

//ADD to Cart
const add_btn = document.querySelector(".add-to-cart-btn");
const foodDetails = document.querySelector(".food-details");
const updateBadge = function (e) {
  badgeCount++;
  badge.textContent = badgeCount;
  cart.classList.add("bouncing-element");

  setTimeout(() => {
    cart.classList.remove("bouncing-element");
  }, 1500);
};

foodContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    updateBadge(e);
  }
});
