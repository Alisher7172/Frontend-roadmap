const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".nav-list a");

// Function to toggle the mobile menu
function toggleMenu() {
  console.log("toggleMenu called!"); // Debugging: Check if function is triggered
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !isExpanded);
  mainNav.classList.toggle("active");
  // Optional: Add/remove overflow hidden to body to prevent scrolling when menu is open
  document.body.style.overflow = mainNav.classList.contains("active")
    ? "hidden"
    : "";
  console.log("Menu active state:", mainNav.classList.contains("active")); // Debugging: Check menu class
}

// Event listener for the hamburger menu toggle button
menuToggle.addEventListener("click", toggleMenu);
console.log("Menu toggle button listener attached."); // Debugging: Confirm listener setup

// Close menu when a navigation link is clicked (for mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    console.log("Nav link clicked."); // Debugging: Confirm link click
    if (mainNav.classList.contains("active")) {
      toggleMenu(); // Close the menu
    }
  });
});

// Close menu if window is resized to desktop size while menu is open
// This handles cases where a user might resize from mobile to desktop
window.addEventListener("resize", () => {
  console.log("Window resized. Current width:", window.innerWidth); // Debugging: Check resize event
  if (window.innerWidth >= 768 && mainNav.classList.contains("active")) {
    toggleMenu(); // Close the menu if it's open on desktop size
  }
});

// Close menu if user clicks outside of it (for mobile overlay)
document.addEventListener("click", (event) => {
  // Check if the click is outside the menu and not on the toggle button
  if (
    mainNav.classList.contains("active") &&
    !mainNav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    console.log("Click outside menu detected, closing menu."); // Debugging: Confirm outside click
    toggleMenu();
  }
});

// Basic keyboard accessibility for the toggle button
menuToggle.addEventListener("keydown", (event) => {
  console.log("Keydown on menu toggle:", event.key); // Debugging: Confirm keydown
  if (event.key === "Enter" || event.key === " ") {
    // Fixed: Corrected logical OR operator
    event.preventDefault(); // Prevent default space/enter behavior
    toggleMenu();
  }
});
