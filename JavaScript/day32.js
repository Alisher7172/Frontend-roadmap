// JavaScript for localStorage demo

document.addEventListener("DOMContentLoaded", function () {
  const keyInput = document.getElementById("ls-key");
  const valueInput = document.getElementById("ls-value");
  const saveBtn = document.getElementById("save-btn");
  const loadBtn = document.getElementById("load-btn");
  const clearBtn = document.getElementById("clear-btn");
  const output = document.getElementById("output");

  saveBtn.addEventListener("click", function () {
    const key = keyInput.value.trim();
    const value = valueInput.value;
    if (!key) {
      output.textContent = "Please enter a key.";
      return;
    }
    localStorage.setItem(key, value);
    output.textContent = `Saved: { ${key}: ${value} }`;
  });

  loadBtn.addEventListener("click", function () {
    const key = keyInput.value.trim();
    if (!key) {
      output.textContent = "Please enter a key to load.";
      return;
    }
    const value = localStorage.getItem(key);
    if (value === null) {
      output.textContent = `No value found for key "${key}".`;
    } else {
      output.textContent = `Loaded: { ${key}: ${value} }`;
    }
  });

  clearBtn.addEventListener("click", function () {
    localStorage.clear();
    output.textContent = "All localStorage data cleared.";
    keyInput.value = "";
    valueInput.value = "";
  });
});
