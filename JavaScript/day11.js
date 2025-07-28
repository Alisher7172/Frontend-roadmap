// day 11
// Array visualization
const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Tablet", price: 499 },
  { id: 4, name: "Headphones", price: 199 },
  { id: 5, name: "Monitor", price: 299 },
];

const arrayVisual = document.getElementById("arrayVisual");

function renderArray() {
  arrayVisual.innerHTML = "";

  // Add index row
  const indexRow = document.createElement("div");
  indexRow.className = "array-item index";
  indexRow.textContent = "Index";
  arrayVisual.appendChild(indexRow);

  for (let i = 0; i < products.length; i++) {
    const indexItem = document.createElement("div");
    indexItem.className = "array-item index";
    indexItem.textContent = i;
    arrayVisual.appendChild(indexItem);
  }

  // Add name row
  const nameRow = document.createElement("div");
  nameRow.className = "array-item index";
  nameRow.textContent = "Name";
  arrayVisual.appendChild(nameRow);

  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "array-item";
    item.innerHTML = `<div class="value">${product.name}</div>`;
    arrayVisual.appendChild(item);
  });

  // Add price row
  const priceRow = document.createElement("div");
  priceRow.className = "array-item index";
  priceRow.textContent = "Price";
  arrayVisual.appendChild(priceRow);

  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "array-item";
    item.innerHTML = `<div class="value">$${product.price}</div>`;
    arrayVisual.appendChild(item);
  });
}

// Initialize visualization
renderArray();

// Array Editor Functionality
document
  .querySelector("#arrayEditor + .run-btn")
  .addEventListener("click", function () {
    const editor = document.getElementById("arrayEditor");
    const output = document.getElementById("arrayOutput");

    // Clear previous output
    output.innerHTML = "Output:<br>";

    try {
      // Capture console.log output
      const originalLog = console.log;
      let logs = [];

      console.log = function () {
        logs.push(Array.from(arguments).join(" "));
        originalLog.apply(console, arguments);
      };

      // Execute the code
      eval(editor.textContent);

      // Restore console.log
      console.log = originalLog;

      // Display the output
      if (logs.length > 0) {
        output.innerHTML += logs.join("<br>");
      } else {
        output.innerHTML += "No output. Use console.log() to display values.";
      }
    } catch (error) {
      output.innerHTML += `Error: ${error.message}`;
    }
  });

// Challenge button functionality
document.getElementById("challengeBtn").addEventListener("click", function () {
  const solution = document.getElementById("solution");
  solution.classList.add("show");

  // Execute solution
  const products = [
    { id: 1, name: "Laptop", price: 999, category: "Electronics" },
    { id: 2, name: "Desk Chair", price: 199, category: "Furniture" },
    { id: 3, name: "Smartphone", price: 799, category: "Electronics" },
    { id: 4, name: "Book", price: 15, category: "Books" },
    { id: 5, name: "Monitor", price: 299, category: "Electronics" },
  ];

  const electronics = products.filter(
    (product) => product.category === "Electronics"
  );

  const discounted = electronics.map((product) => ({
    ...product,
    price: product.price * 0.9,
  }));

  discounted.sort((a, b) => b.price - a.price);

  const totalValue = discounted.reduce(
    (sum, product) => sum + product.price,
    0
  );

  console.log("Discounted Electronics:", discounted);
  console.log("Total Value:", totalValue.toFixed(2));
});

// Toggle solution
document
  .getElementById("toggleSolution")
  .addEventListener("click", function () {
    const solution = document.getElementById("solution");
    solution.classList.toggle("show");
    this.textContent = solution.classList.contains("show")
      ? "Hide Solution"
      : "Show Solution";
  });

// Add animation to array items
const arrayItems = document.querySelectorAll(".array-item:not(.index)");
arrayItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
  item.classList.add("animate__animated", "animate__fadeInUp");
});
