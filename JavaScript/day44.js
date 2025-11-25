// ...existing code...
document.addEventListener('DOMContentLoaded', initDay44);

function initDay44() {
  const resources = {
    react: 'https://reactjs.org/',
    jsx: 'https://reactjs.org/docs/introducing-jsx.html',
    cra: 'npx create-react-app my-app'
  };

  // handlers for copy/open buttons (keeps same button behavior as other pages)
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const key = btn.dataset.key;
    const action = btn.dataset.action;
    if (action === 'open' && resources[key]) window.open(resources[key], '_blank', 'noopener');
    if (action === 'copy') handleCopyKey(key, btn);
  });

  // playground elements
  const title = document.getElementById('pTitle');
  const color = document.getElementById('pColor');
  const start = document.getElementById('pStart');
  const renderBtn = document.getElementById('renderBtn');
  const preview = document.getElementById('preview');
  const generated = document.getElementById('generated');

  renderBtn.addEventListener('click', () => renderPlayground());
  // initial render
  renderPlayground();

  function renderPlayground() {
    const t = title.value || 'Hello React';
    const c = color.value || '#ff6ec7';
    const s = parseInt(start.value || '0', 10);

    // Render a simulated component in DOM (interactive counter)
    preview.innerHTML = `
      <div class="demo-card" style="padding:12px;border-radius:8px;text-align:center;background:linear-gradient(90deg, ${c}22, transparent);width:100%;">
        <h3 style="color:${c};margin:0 0 8px">${escapeHtml(t)}</h3>
        <div class="counter" data-count="${s}">
          <button class="inc" style="margin-right:8px;padding:6px 10px;border-radius:8px;border:none;background:${c};color:#fff;cursor:pointer">+1</button>
          <span class="count" style="font-weight:600">${s}</span>
        </div>
      </div>
    `;

    // wire up increment (re-bind each render)
    const inc = preview.querySelector('.inc');
    const countEl = preview.querySelector('.count');
    let ct = s;
    if (inc) inc.addEventListener('click', () => { ct += 1; countEl.textContent = ct; });

    // show generated JSX-like snippet
    const jsx = `function Card(props) {
  return (
    <div style={{ borderRadius: 8, padding: 12, background: \`linear-gradient(90deg, \${props.color}22, transparent)\` }}>
      <h3 style={{ color: props.color }}>{props.title}</h3>
      <Counter start={${s}} />
    </div>
  );
}`;
    generated.textContent = jsx;
  }

  function handleCopyKey(key, btn) {
    let text = '';
    if (key === 'jsx') text = document.querySelector('.jsx-code')?.textContent || '';
    if (key === 'generated') text = document.getElementById('generated')?.textContent || '';
    if (key === 'previewHtml') text = document.getElementById('preview')?.innerHTML || '';
    if (!text && resources[key]) text = resources[key];
    copyToClipboard(text, btn);
  }

  function copyToClipboard(text, btn) {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied';
      btn.style.opacity = '0.9';
      setTimeout(() => { btn.textContent = orig; btn.style.opacity = ''; }, 1200);
    }).catch(() => {
      btn.textContent = 'Failed';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1000);
    });
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
}
// ...existing code...