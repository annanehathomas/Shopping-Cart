
const cartBox = document.getElementById("cart-box");
const cartMsg = document.createElement("h3");
cartMsg.textContent = "No Product added to the cart.";//ADDING MESSAGE TO BE DISPLAYED INSIDE THE CART-BOX.
cartBox.appendChild(cartMsg);

const cart = {};

function updateCart(){
  cartBox.innerHTML = "<h1>Cart</h1>";

  const cartItems = Object.entries(cart).filter(([_,qty]) => qty>0);

  if(cartItems.length === 0){
    cartBox.appendChild(cartMsg);
    return;
  }

  let totalPrice = 0;
  cartItems.forEach(([name,qty])=>{
    const price = parseInt(document.querySelector(`.list[data-name="${name}"] .product-cost`).textContent);
    totalPrice += price * qty;

    const cartedProds = document.createElement("div");
    cartedProds.classList.add("list");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("product-name");
    nameSpan.textContent = name;

    const priceSpan = document.createElement("span");
    priceSpan.classList.add("cart-item-price");
    priceSpan.textContent= `₹${price} x ${qty}`;

    cartedProds.appendChild(nameSpan);
    cartedProds.appendChild(priceSpan);

    cartBox.appendChild(cartedProds);

  });
  const totalBox = document.createElement("div");
    totalBox.classList.add("total-box");

    const totalName = document.createElement("span");
    totalName.classList.add("total-name");
    totalName.textContent = "Total:";

    const totalAmt = document.createElement("span");
    totalAmt.classList.add("total-amt");
    totalAmt.textContent = `₹${totalPrice}`;

    totalBox.appendChild(totalName);
    totalBox.appendChild(totalAmt);

    cartBox.appendChild(totalBox);  
}

document.querySelectorAll(".list").forEach((listItem) => {
  const productName = listItem.querySelector(".product-name").textContent;
  const productCost = listItem.querySelector(".product-cost").textContent;
  const quantityValue = listItem.querySelector(".quantity-value");
  const plusBtn = listItem.querySelector(".plus");
  const minusBtn = listItem.querySelector(".minus");

  listItem.setAttribute("data-name" , productName);

  plusBtn.addEventListener("click", ()=>{
    cart[productName] = (cart[productName] || 0) + 1;
    quantityValue.textContent = cart[productName];
    updateCart();
  });

  minusBtn.addEventListener("click" , ()=>{
    if(cart[productName]){
      cart[productName] -= 1;
      quantityValue.textContent = cart[productName];
    }
    if(cart[productName] ===0) delete cart[productName];
    updateCart();
  });
});
