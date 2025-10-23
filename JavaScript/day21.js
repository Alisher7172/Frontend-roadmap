// Responsive Portfolio JS - Day 21

document.addEventListener("DOMContentLoaded", () => {
  // Project data
  const projects = [
    {
      title: "Modern Landing Page",
      desc: "A responsive, animated landing page built with HTML, CSS, and JS.",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      demo: "#",
      code: "#",
    },
    {
      title: "Todo App",
      desc: "A simple and clean todo app with local storage support.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      demo: "#",
      code: "#",
    },
    {
      title: "Portfolio Website",
      desc: "A personal portfolio website to showcase my work and skills.",
      img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      demo: "#",
      code: "#",
    },
    {
      title: "Weather App",
      desc: "A weather app using OpenWeatherMap API and modern JS.",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      demo: "#",
      code: "#",
    },
  ];

  // Render projects
  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid) {
    projects.forEach((proj) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
				<img src="${proj.img}" alt="${proj.title}">
				<h3>${proj.title}</h3>
				<p>${proj.desc}</p>
				<div class="project-links">
					<a href="${proj.demo}" target="_blank" rel="noopener">Live Demo</a>
					<a href="${proj.code}" target="_blank" rel="noopener">Source Code</a>
				</div>
			`;
      projectsGrid.appendChild(card);
    });
  }

  // Contact form handler
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      formMessage.textContent = "Sending...";
      setTimeout(() => {
        formMessage.textContent =
          "Thank you for reaching out! I will get back to you soon.";
        contactForm.reset();
      }, 1200);
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll(".portfolio-nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
