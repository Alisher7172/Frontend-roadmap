// ...existing code...
document.addEventListener('DOMContentLoaded', initDay47);

function initDay47() {
  const resources = {
    rrdoc: 'https://reactrouter.com/en/main',
    install: 'npm install react-router-dom@6',
    appCode: document.getElementById('appCode')?.textContent || '',
    userSnippet: `&lt;Route path="/user/:id" element={&lt;User /&gt;} /&gt;`
  };

  // copy/open handlers (consistent with other pages)
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const key = btn.dataset.key;
    const action = btn.dataset.action;
    if (action === 'open' && resources[key]) {
      window.open(resources[key], '_blank', 'noopener');
      return;
    }
    if (action === 'copy') {
      const text = resources[key] || '';
      copyToClipboard(text, btn);
    }
  });

  function copyToClipboard(text, btn) {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied';
      btn.style.background = 'var(--success)';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 900);
    }).catch(() => {
      btn.textContent = 'Failed';
      setTimeout(() => { btn.textContent = 'Copy'; }, 900);
    });
  }

  // ---------- Simple hash-based demo router (teaches routing concepts) ----------
  const view = document.getElementById('routeView');
  const simUrl = document.getElementById('simUrl');
  const links = document.querySelectorAll('.demo-link');

  links.forEach(btn => {
    btn.addEventListener('click', () => {
      const path = btn.dataset.route || '/';
      navigate(path);
    });
  });

  // navigate updates hash and renders
  function navigate(path) {
    // use hash to simulate SPA routing without server
    location.hash = '#' + path;
    renderRoute(path);
  }

  // on load, render based on current hash
  const initial = location.hash ? location.hash.replace(/^#/, '') : '/';
  renderRoute(initial);

  window.addEventListener('hashchange', () => {
    const p = location.hash.replace(/^#/, '') || '/';
    renderRoute(p);
  });

  // route matcher supporting /user/:id
  function matchRoute(path) {
    const routes = [
      { path: '/', render: () => '<h3>Home</h3><p>Welcome — this is the home route.</p>' },
      { path: '/about', render: () => '<h3>About</h3><p>About this tiny demo.</p>' },
      { path: '/users', render: () => '<h3>Users</h3><p>List of users (static): Alice, Bob, Carol.</p>' },
      { path: '/user/:id', render: (params) => `<h3>User</h3><p>User id = <strong>${params.id}</strong></p>` }
    ];

    for (const r of routes) {
      if (r.path.includes(':')) {
        const base = r.path.split('/:')[0];
        if (path.startsWith(base + '/')) {
          const id = path.split('/')[2];
          return { render: r.render, params: { id } };
        }
      } else if (r.path === path) {
        return { render: r.render, params: {} };
      }
    }
    return { render: () => '<h3>Not Found</h3><p>No route matched.</p>', params: {} };
  }

  function renderRoute(path) {
    simUrl.textContent = path;
    const match = matchRoute(path);
    view.innerHTML = match.render(match.params || {});
  }

  // --- ensure Day navigation buttons open the correct page (Day 48 link working) ---
  // This keeps nav behavior consistent: if user presses the "48" button on day47 page it will go to day48.html
  document.querySelectorAll('.nav-buttons-top .nav-btn, .nav-buttons-bottom .nav-btn').forEach(btn => {
    // only attach handler if not already using an explicit href/onClick
    btn.addEventListener('click', (e) => {
      // if element already navigates via inline onclick, let it run — this handler is idempotent
      const txt = (btn.textContent || '').trim();
      // match standalone "48" or strings containing "48" (e.g. "48 →")
      if (/\b48\b/.test(txt)) {
        // navigate to the Day 48 static page in the same folder
        location.href = 'day48.html';
      }
    });
  });
}
// ...existing code...