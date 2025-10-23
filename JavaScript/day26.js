// Day 26: JS Advanced Arrays & Objects - Distinct Style

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for nav links
  document.querySelectorAll(".header nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Day 26: DOM Manipulation - Interactive Examples

  document.addEventListener("DOMContentLoaded", () => {
    // Smooth scroll for nav links
    document.querySelectorAll(".header nav a").forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Change background color
    const colorInput = document.getElementById("colorInput");
    const colorBtn = document.getElementById("colorBtn");
    if (colorInput && colorBtn) {
      colorBtn.addEventListener("click", () => {
        document.body.style.background = colorInput.value;
      });
    }

    // Add new item to list
    const addText = document.getElementById("addText");
    const addBtn = document.getElementById("addBtn");
    const itemList = document.getElementById("itemList");
    if (addBtn && addText && itemList) {
      addBtn.addEventListener("click", () => {
        const value = addText.value.trim();
        if (!value) return;
        const li = document.createElement("li");
        li.textContent = value;
        itemList.appendChild(li);
        addText.value = "";
      });
    }

    // Toggle highlight class
    const toggleBtn = document.getElementById("toggleBtn");
    const toggleBox = document.getElementById("toggleBox");
    if (toggleBtn && toggleBox) {
      toggleBtn.addEventListener("click", () => {
        toggleBox.classList.toggle("highlight");
      });
    }
  });
});
