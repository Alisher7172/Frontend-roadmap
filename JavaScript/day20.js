const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".nav-list a");

// Function to toggle the mobile menu
function toggleMenu() {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !isExpanded);
  mainNav.classList.toggle("active");
  document.body.style.overflow = mainNav.classList.contains("active")
    ? "hidden"
    : "";
}

// Event listener for the hamburger menu toggle button
menuToggle.addEventListener("click", toggleMenu);

// Close menu when a navigation link is clicked (for mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mainNav.classList.contains("active")) {
      toggleMenu();
    }
  });
});

// Close menu if window is resized to desktop size while menu is open
window.addEventListener("resize", () => {
  if (
    window.matchMedia("(min-width: 48em)").matches &&
    mainNav.classList.contains("active")
  ) {
    toggleMenu();
  }
});

// Close menu if user clicks outside of it (for mobile overlay)
document.addEventListener("click", (event) => {
  if (
    mainNav.classList.contains("active") &&
    !mainNav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    toggleMenu();
  }
});

// Fixed keyboard accessibility for the toggle button
menuToggle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleMenu();
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Counter Animation for Hero Stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 50; // Adjust speed here
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 50);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Simple AOS (Animate On Scroll) implementation
function initAOS() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0;
        setTimeout(() => {
          entry.target.classList.add("aos-animate");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el);
  });
}

// Initialize animations when page loads
window.addEventListener("load", () => {
  setTimeout(animateCounters, 1000); // Start counter animation after 1 second
  initAOS(); // Initialize scroll animations
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add shadow on scroll
  if (scrollTop > 10) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    header.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    header.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.1)";
    header.style.background = "rgba(255, 255, 255, 0.95)";
  }

  lastScrollTop = scrollTop;
});

// Handle prefers-reduced-motion for CSS transitions/animations
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

function handleReducedMotionChange() {
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add("reduced-motion");
  } else {
    document.documentElement.classList.remove("reduced-motion");
  }
}

prefersReducedMotion.addEventListener("change", handleReducedMotionChange);
handleReducedMotionChange(); // Initial check on page load

// Easter egg: Konami code for fun developers trying to clone this
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg triggered!
    document.body.style.filter = "hue-rotate(180deg)";
    setTimeout(() => {
      document.body.style.filter = "none";
    }, 3000);

    // Show a fun message
    const message = document.createElement("div");
    message.innerHTML =
      "🎉 Developer Mode Activated! You found the easter egg!";
    message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            font-weight: bold;
            animation: bounceIn 0.5s ease-out;
        `;

    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 3000);

    konamiCode = []; // Reset
  }
});
