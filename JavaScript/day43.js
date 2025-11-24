// ...existing code...
document.addEventListener('DOMContentLoaded', initDay42);

function initDay42(){
  const resources = {
    react: 'https://reactjs.org/',
    hooks: 'https://reactjs.org/docs/hooks-intro.html',
    cra: 'npx create-react-app my-app',
    vite: 'npm create vite@latest my-app -- --template react',
    try: 'https://react.dev/learn'
  };

  // copy/open handlers
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const key = btn.dataset.key;
    const action = btn.dataset.action;

    if (action === 'open') {
      const url = resources[key] || (key === 'react' ? resources.react : null);
      if (url) window.open(url, '_blank', 'noopener');
      return;
    }

    if (action === 'copy') {
      let text = resources[key] || '';
      // if copying example, read code block text
      if (key === 'example') text = document.getElementById('codeBlock')?.textContent?.trim() || text;
      copyToClipboard(text, btn);
      return;
    }
  });
}

function copyToClipboard(text, btn){
  if (!text) return;
  navigator.clipboard?.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied';
    btn.style.background = 'var(--success)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1200);
  }).catch(() => {
    btn.textContent = 'Failed';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
  });
}