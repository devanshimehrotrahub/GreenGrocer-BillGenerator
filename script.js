" use Strict";

const addBtn = document.querySelector("#addBtn");
const billBody = document.querySelector("#billBody");
const totalAmt = document.querySelector("#totalAmount");

const itemName = document.querySelector("#itemName");
const pricePerKg = document.querySelector("#pricePerKg");
const quantityInGrams = document.querySelector("#grams");

const prices = {};
let total = 0;
totalAmt.textContent = 0;

addBtn.addEventListener("click", function () {
  const nameInput = itemName.value;
  const priceInput = Number(pricePerKg.value);
  const qtyInput = Number(quantityInGrams.value);

  const price = (priceInput / 1000) * qtyInput;

  if (!nameInput || !priceInput || !qtyInput)
    alert("please enter all values correctly");

  prices[nameInput] = [priceInput, qtyInput, price];

  itemName.value = "";
  pricePerKg.value = "";
  quantityInGrams.value = "";

  render();
});

function render() {
  billBody.textContent = "";
  for (let key in prices) {
    console.log(key, prices[key][0]);

    const newItem = document.createElement("tr");

    const newItemName = document.createElement("td");
    newItemName.textContent = key;
    const newItemPriceKg = document.createElement("td");
    newItemPriceKg.textContent = prices[key][0];
    const newItemQty = document.createElement("td");
    newItemQty.textContent = prices[key][1];
    const newItemPrice = document.createElement("td");
    newItemPrice.textContent = prices[key][2];

    const removeButtonDiv = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.classList.add("removeBtn");
    removeButton.addEventListener("click", () => remove(key));

    removeButtonDiv.appendChild(removeButton);

    newItem.appendChild(newItemName);
    newItem.appendChild(newItemPriceKg);
    newItem.appendChild(newItemQty);
    newItem.appendChild(newItemPrice);
    newItem.appendChild(removeButtonDiv);

    billBody.appendChild(newItem);
    console.log(newItem.textContent);
  }
  calcTotal();
  totalAmt.textContent = total;
}

function calcTotal() {
  total = 0;
  for (let key in prices) {
    total += prices[key][2];
  }
}

function remove(key) {
  delete prices[key];
  console.log(prices);
  render();
}
