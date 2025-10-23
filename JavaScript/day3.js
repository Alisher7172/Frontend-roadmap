// Day 3: JavaScript - Adding Interactivity

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ============ SECTION 1: CLICK HANDLERS ============

  let clickCounter = 0;
  const colors = [
    "#3498db",
    "#e74c3c",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
  ];
  let colorIndex = 0;
  let isToggled = false;

  // Simple button click
  const simpleBtn = document.getElementById("simpleBtn");
  const clickOutput = document.getElementById("clickOutput");

  simpleBtn.addEventListener("click", function () {
    const messages = [
      "Hello! You clicked me! 👋",
      "Thanks for clicking! 😊",
      "You're getting good at this! 🎉",
      "Another successful click! ✨",
      "Keep clicking! 🚀",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    addOutputMessage(randomMessage);
  });

  // Counter button
  const counterBtn = document.getElementById("counterBtn");
  const clickCount = document.getElementById("clickCount");

  counterBtn.addEventListener("click", function () {
    clickCounter++;
    clickCount.textContent = clickCounter;
    addOutputMessage(`Click count updated to ${clickCounter}!`);
  });

  // Color changing button
  const colorBtn = document.getElementById("colorBtn");

  colorBtn.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    colorBtn.style.backgroundColor = colors[colorIndex];
    addOutputMessage(`Color changed to ${colors[colorIndex]}!`);
  });

  // Toggle button
  const toggleBtn = document.getElementById("toggleBtn");

  toggleBtn.addEventListener("click", function () {
    if (isToggled) {
      toggleBtn.textContent = "Toggle Text";
      addOutputMessage("Text toggled back to original!");
    } else {
      toggleBtn.textContent = "Text Toggled!";
      addOutputMessage("Text has been toggled!");
    }
    isToggled = !isToggled;
  });

  function addOutputMessage(message) {
    const timestamp = new Date().toLocaleTimeString();
    clickOutput.innerHTML =
      `<p><strong>[${timestamp}]</strong> ${message}</p>` +
      clickOutput.innerHTML;

    // Keep only last 5 messages
    const messages = clickOutput.querySelectorAll("p");
    if (messages.length > 5) {
      messages[messages.length - 1].remove();
    }
  }

  // ============ SECTION 2: FORM HANDLING ============

  const userForm = document.getElementById("userForm");
  const submissionsList = document.getElementById("submissionsList");
  let submissionCount = 0;

  // Form submission handler
  userForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Clear previous errors
    clearErrors();

    // Get form data
    const formData = new FormData(userForm);
    const data = {
      name: formData.get("userName"),
      email: formData.get("userEmail"),
      age: formData.get("userAge"),
      message: formData.get("userMessage"),
    };

    // Validate form
    if (validateForm(data)) {
      // Create submission entry
      submissionCount++;
      const submission = createSubmissionElement(data, submissionCount);
      submissionsList.insertBefore(submission, submissionsList.firstChild);

      // Show success message
      showSuccessMessage("Form submitted successfully! ✅");

      // Clear form
      userForm.reset();
    }
  });

  // Clear form button
  const clearForm = document.getElementById("clearForm");
  clearForm.addEventListener("click", function () {
    userForm.reset();
    clearErrors();
    showSuccessMessage("Form cleared! 🗑️");
  });

  // Real-time validation
  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const ageInput = document.getElementById("userAge");

  nameInput.addEventListener("blur", function () {
    validateName(this.value);
  });

  emailInput.addEventListener("blur", function () {
    validateEmail(this.value);
  });

  ageInput.addEventListener("blur", function () {
    validateAge(this.value);
  });

  function validateForm(data) {
    let isValid = true;

    if (!validateName(data.name)) isValid = false;
    if (!validateEmail(data.email)) isValid = false;
    if (!validateAge(data.age)) isValid = false;

    return isValid;
  }

  function validateName(name) {
    const nameError = document.getElementById("nameError");
    if (!name || name.trim().length < 2) {
      nameError.textContent = "Name must be at least 2 characters long";
      return false;
    }
    nameError.textContent = "";
    return true;
  }

  function validateEmail(email) {
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address";
      return false;
    }
    emailError.textContent = "";
    return true;
  }

  function validateAge(age) {
    const ageError = document.getElementById("ageError");
    if (age && (age < 1 || age > 120)) {
      ageError.textContent = "Age must be between 1 and 120";
      return false;
    }
    ageError.textContent = "";
    return true;
  }

  function clearErrors() {
    document.querySelectorAll(".error-msg").forEach((error) => {
      error.textContent = "";
    });
  }

  function createSubmissionElement(data, count) {
    const div = document.createElement("div");
    div.className = "submission-item";
    div.innerHTML = `
            <h5>Submission #${count}</h5>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.age ? `<p><strong>Age:</strong> ${data.age}</p>` : ""}
            ${
              data.message
                ? `<p><strong>Message:</strong> ${data.message}</p>`
                : ""
            }
            <small>Submitted at: ${new Date().toLocaleString()}</small>
        `;
    return div;
  }

  function showSuccessMessage(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.textContent = message;
    userForm.insertBefore(successDiv, userForm.firstChild);

    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }

  // ============ SECTION 3: DYNAMIC CONTENT ============

  const dynamicList = document.getElementById("dynamicList");
  const itemCount = document.getElementById("itemCount");
  const lastAdded = document.getElementById("lastAdded");
  const itemInput = document.getElementById("itemInput");

  let itemCounter = 0;

  // Add predefined item
  document.getElementById("addItem").addEventListener("click", function () {
    const items = [
      "Apple 🍎",
      "Banana 🍌",
      "Cherry 🍒",
      "Date 🌴",
      "Elderberry 🫐",
    ];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    addListItem(randomItem);
  });

  // Remove last item
  document.getElementById("removeItem").addEventListener("click", function () {
    removeLastItem();
  });

  // Clear all items
  document.getElementById("clearAll").addEventListener("click", function () {
    clearAllItems();
  });

  // Add custom item
  document
    .getElementById("addCustomItem")
    .addEventListener("click", function () {
      addCustomItem();
    });

  // Add custom item on Enter key
  itemInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addCustomItem();
    }
  });

  function addListItem(itemText) {
    itemCounter++;
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="item-text">${itemText}</span>
            <span class="item-number">#${itemCounter}</span>
            <button class="remove-btn" onclick="removeSpecificItem(this)">×</button>
        `;
    li.className = "list-item";

    dynamicList.appendChild(li);
    updateStats(itemText);

    // Animate the new item
    li.style.opacity = "0";
    li.style.transform = "translateY(-20px)";
    setTimeout(() => {
      li.style.transition = "all 0.3s ease";
      li.style.opacity = "1";
      li.style.transform = "translateY(0)";
    }, 10);
  }

  function addCustomItem() {
    const value = itemInput.value.trim();
    if (value) {
      addListItem(value);
      itemInput.value = "";
    } else {
      alert("Please enter an item name!");
    }
  }

  function removeLastItem() {
    const items = dynamicList.querySelectorAll("li");
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      lastItem.style.transition = "all 0.3s ease";
      lastItem.style.opacity = "0";
      lastItem.style.transform = "translateX(100px)";
      setTimeout(() => {
        lastItem.remove();
        updateStats();
      }, 300);
    }
  }

  function clearAllItems() {
    if (dynamicList.children.length > 0) {
      if (confirm("Are you sure you want to clear all items?")) {
        dynamicList.innerHTML = "";
        itemCounter = 0;
        updateStats();
      }
    }
  }

  // Global function for remove buttons
  window.removeSpecificItem = function (button) {
    const li = button.parentElement;
    li.style.transition = "all 0.3s ease";
    li.style.opacity = "0";
    li.style.transform = "translateX(100px)";
    setTimeout(() => {
      li.remove();
      updateStats();
    }, 300);
  };

  function updateStats(lastAddedItem = null) {
    const currentCount = dynamicList.children.length;
    itemCount.textContent = currentCount;

    if (lastAddedItem) {
      lastAdded.textContent = lastAddedItem;
    } else if (currentCount === 0) {
      lastAdded.textContent = "None";
    }
  }

  // ============ SECTION 4: INTERACTIVE ELEMENTS ============

  // Image Gallery
  const galleryImages = [
    "../images/favicon-1.svg",
    "../images/favicon-2.svg",
    "../images/favicon-3.svg",
    "../images/favicon-4.svg",
    "../images/favicon-5.svg",
  ];
  let currentImageIndex = 0;

  const galleryImage = document.getElementById("galleryImage");
  const imageCounter = document.getElementById("imageCounter");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");

  prevBtn.addEventListener("click", function () {
    currentImageIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
  });

  nextBtn.addEventListener("click", function () {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateGalleryImage();
  });

  function updateGalleryImage() {
    galleryImage.style.opacity = "0";
    setTimeout(() => {
      galleryImage.src = galleryImages[currentImageIndex];
      imageCounter.textContent = `${currentImageIndex + 1} / ${
        galleryImages.length
      }`;
      galleryImage.style.opacity = "1";
    }, 150);
  }

  // Theme Switcher
  const lightThemeBtn = document.getElementById("lightTheme");
  const darkThemeBtn = document.getElementById("darkTheme");
  const blueThemeBtn = document.getElementById("blueTheme");

  lightThemeBtn.addEventListener("click", () => setTheme("light"));
  darkThemeBtn.addEventListener("click", () => setTheme("dark"));
  blueThemeBtn.addEventListener("click", () => setTheme("blue"));

  function setTheme(theme) {
    document.body.className = `theme-${theme}`;

    // Update active theme button
    document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.getElementById(`${theme}Theme`).classList.add("active");
  }

  // Live Clock
  const liveClock = document.getElementById("liveClock");
  const toggleClockBtn = document.getElementById("toggleClock");
  let clockInterval = null;
  let clockRunning = false;

  toggleClockBtn.addEventListener("click", function () {
    if (clockRunning) {
      clearInterval(clockInterval);
      toggleClockBtn.textContent = "Start Clock";
      clockRunning = false;
    } else {
      startClock();
      toggleClockBtn.textContent = "Stop Clock";
      clockRunning = true;
    }
  });

  function startClock() {
    updateClock(); // Update immediately
    clockInterval = setInterval(updateClock, 1000);
  }

  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    liveClock.textContent = timeString;
  }

  // ============ SECTION 5: EVENT HANDLING EXAMPLES ============

  // Hover events
  const hoverBox = document.getElementById("hoverBox");
  const hoverCount = document.getElementById("hoverCount");
  let hoverCounter = 0;

  hoverBox.addEventListener("mouseenter", function () {
    hoverCounter++;
    hoverCount.textContent = `Hover count: ${hoverCounter}`;
    this.style.backgroundColor = "#e74c3c";
  });

  hoverBox.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "#3498db";
  });

  // Keypress events
  const keypressBox = document.getElementById("keypressBox");
  const lastKey = document.getElementById("lastKey");

  keypressBox.addEventListener("keydown", function (event) {
    lastKey.textContent = `Last key: ${event.key}`;
    this.style.backgroundColor = "#2ecc71";

    setTimeout(() => {
      this.style.backgroundColor = "#3498db";
    }, 200);
  });

  // Mouse move events
  const mouseBox = document.getElementById("mouseBox");
  const mouseCoords = document.getElementById("mouseCoords");

  mouseBox.addEventListener("mousemove", function (event) {
    const rect = this.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    mouseCoords.textContent = `Mouse: (${x}, ${y})`;
  });

  // ============ INITIALIZATION ============

  // Set default theme
  setTheme("light");

  // Add welcome message
  addOutputMessage(
    "Welcome to Day 3! Start clicking buttons to see JavaScript in action! 🚀"
  );

  console.log("Day 3: JavaScript interactivity loaded successfully! 🎉");
});
