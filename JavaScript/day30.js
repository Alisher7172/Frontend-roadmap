// Async JavaScript: Promises & Async/Await Demo

// --- Promises Example ---
document.getElementById("promise-btn").addEventListener("click", function () {
  const resultDiv = document.getElementById("promise-result");
  resultDiv.textContent = "Loading...";
  simulateApiPromise()
    .then((data) => {
      resultDiv.textContent = "Promise resolved: " + data;
      resultDiv.style.color = "#22c55e";
    })
    .catch((err) => {
      resultDiv.textContent = "Promise rejected: " + err;
      resultDiv.style.color = "#ef4444";
    });
});

function simulateApiPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success 80% of the time
      if (Math.random() < 0.8) {
        resolve("Data loaded successfully!");
      } else {
        reject("Network error");
      }
    }, 1500);
  });
}

// --- Async/Await Example ---
document
  .getElementById("async-btn")
  .addEventListener("click", async function () {
    const resultDiv = document.getElementById("async-result");
    resultDiv.textContent = "Loading...";
    try {
      const data = await simulateApiAsync();
      resultDiv.textContent = "Async/Await resolved: " + data;
      resultDiv.style.color = "#22c55e";
    } catch (err) {
      resultDiv.textContent = "Async/Await rejected: " + err;
      resultDiv.style.color = "#ef4444";
    }
  });

async function simulateApiAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success 80% of the time
      if (Math.random() < 0.8) {
        resolve("Data loaded successfully!");
      } else {
        reject("Network error");
      }
    }, 1500);
  });
}
