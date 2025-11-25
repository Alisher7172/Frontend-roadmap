// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const openInstructions = document.getElementById('openInstructions')
  const instructions = document.getElementById('instructions')
  const copyBtn = document.getElementById('copySamples')
  const hideBtn = document.getElementById('hideInstructions')
  const contactForm = document.getElementById('contactForm')
  const formMessage = document.getElementById('formMessage')

  // Smooth scroll to instructions
  openInstructions?.addEventListener('click', () => {
    instructions?.scrollIntoView({behavior:'smooth', block:'start'})
  })

  // Hide instructions
  hideBtn?.addEventListener('click', () => {
    if (instructions) instructions.style.display = 'none'
  })

  // Copy React samples
  copyBtn?.addEventListener('click', async () => {
    const app = document.getElementById('appSample')?.innerText || ''
    const grid = document.getElementById('gridSample')?.innerText || ''
    const card = document.getElementById('cardSample')?.innerText || ''
    const text = [
      '--- src/App.jsx ---',
      app,
      '',
      '--- src/ProjectsGrid.jsx ---',
      grid,
      '',
      '--- src/ProjectCard.jsx ---',
      card
    ].join('\n\n')
    try {
      await navigator.clipboard.writeText(text)
      copyBtn.textContent = 'Copied ✓'
      setTimeout(()=> copyBtn.textContent = 'Copy Samples', 1400)
    } catch {
      copyBtn.textContent = 'Copy failed'
      setTimeout(()=> copyBtn.textContent = 'Copy Samples', 1400)
    }
  })

  // Render projects in Day 48 styled like Day 21
  const projectsGrid = document.getElementById('projectsGrid')
  const projects = [
    {
      title: "React Landing",
      desc: "Animated landing built with React + Vite.",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      demo: "#",
      code: "#",
    },
    {
      title: "Hooks Timer",
      desc: "Timers and effects demo using useEffect.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      demo: "#",
      code: "#",
    },
    {
      title: "Forms & Filters",
      desc: "Controlled forms and client-side filtering.",
      img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      demo: "#",
      code: "#",
    },
    {
      title: "Router Demo",
      desc: "SPA navigation with React Router.",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      demo: "#",
      code: "#",
    },
  ]
  if (projectsGrid) {
    projects.forEach((proj) => {
      const card = document.createElement('div')
      card.className = 'project-card'
      card.innerHTML = `
        <img src="${proj.img}" alt="${proj.title}">
        <h3>${proj.title}</h3>
        <p>${proj.desc}</p>
        <div class="project-links">
          <a href="${proj.demo}" target="_blank" rel="noopener">Live Demo</a>
          <a href="${proj.code}" target="_blank" rel="noopener">Source Code</a>
        </div>
      `
      projectsGrid.appendChild(card)
    })
  }

  // Contact form handler
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()
      formMessage.textContent = 'Sending...'
      setTimeout(() => {
        formMessage.textContent = 'Thank you for reaching out! I will get back to you soon.'
        contactForm.reset()
      }, 1200)
    })
  }
})
// ...existing code...