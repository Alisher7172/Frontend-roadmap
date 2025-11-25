document.addEventListener('DOMContentLoaded', initDay45);

function initDay45() {
  const resources = {
    react: 'https://reactjs.org/docs/hooks-state.html'
  };

  // keep copy/open behavior consistent with site
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const key = btn.dataset.key;
    const action = btn.dataset.action;
    if (action === 'open' && resources[key]) window.open(resources[key], '_blank', 'noopener');
    if (action === 'copy') {
      const el = document.getElementById(btn.dataset.key);
      const text = el ? el.textContent.trim() : resources[key] || '';
      copyToClipboard(text, btn);
    }
  });

  // Counter (simulated useState)
  const incBtn = document.getElementById('incBtn');
  const decBtn = document.getElementById('decBtn');
  const resetBtn = document.getElementById('resetBtn');
  const countDisplay = document.getElementById('countDisplay');
  let count = 0; // local state

  function renderCount() { countDisplay.textContent = count; }
  incBtn.addEventListener('click', () => { count += 1; renderCount(); logEvent('click', 'incBtn'); });
  decBtn.addEventListener('click', () => { count = Math.max(0, count - 1); renderCount(); logEvent('click', 'decBtn'); });
  resetBtn.addEventListener('click', () => { count = 0; renderCount(); logEvent('click', 'resetBtn'); });

  // Controlled input
  const textInput = document.getElementById('textInput');
  const livePreview = document.getElementById('livePreview');
  const clearInput = document.getElementById('clearInput');

  textInput.addEventListener('input', (e) => {
    livePreview.textContent = e.target.value || '—';
    logEvent('input', 'textInput', e.target.value);
  });
  clearInput.addEventListener('click', () => { textInput.value = ''; textInput.dispatchEvent(new Event('input')); });

  // Form submit (add items)
  const itemForm = document.getElementById('itemForm');
  const itemText = document.getElementById('itemText');
  const itemsList = document.getElementById('itemsList');

  itemForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page reload
    const v = itemText.value.trim();
    if (!v) return;
    const li = document.createElement('li');
    li.innerHTML = `<span>${escapeHtml(v)}</span><button class="small-btn remove">Remove</button>`;
    itemsList.appendChild(li);
    itemText.value = '';
    logEvent('submit', 'itemForm', v);
  });

  // delegate remove buttons
  itemsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button.remove');
    if (!btn) return;
    const li = btn.closest('li');
    if (li) li.remove();
    logEvent('click', 'remove-item');
  });

  // simple event logger
  const logBox = document.getElementById('log');
  function logEvent(type, source, info) {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.textContent = `[${time}] ${type} — ${source}${info ? ' • ' + String(info) : ''}`;
    if (logBox.textContent.trim() === 'No events yet.') logBox.textContent = '';
    logBox.prepend(entry);
  }

  // helpers
  function copyToClipboard(text, btn) {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied';
      btn.style.background = 'var(--success)';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1000);
    }).catch(() => {
      btn.textContent = 'Failed';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1000);
    });
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // initial render
  renderCount();
  livePreview.textContent = '—';
}