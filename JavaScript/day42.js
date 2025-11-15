document.addEventListener('DOMContentLoaded', initDay42);

function initDay42(){
  const resources = {
    react: 'https://reactjs.org/',
    redux: 'https://redux.js.org/',
    bootstrap: 'https://getbootstrap.com/',
    angular: 'https://angular.io/',
    tailwind: 'https://tailwindcss.com/'
  };

  document.getElementById('libraries').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const key = btn.dataset.key;
    const action = btn.dataset.action;
    if (action === 'open' && resources[key]) {
      window.open(resources[key], '_blank', 'noopener');
      return;
    }
    if (action === 'copy' && resources[key]) {
      copyToClipboard(resources[key], btn);
      return;
    }
  });

  // toggle details on card click (allow clicking header/summary)
  document.querySelectorAll('.library-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a') return;
      toggleDetails(card);
    });
  });

  function toggleDetails(card){
    const d = card.querySelector('.details');
    if (!d) return;
    d.classList.toggle('hidden');
  }
}

function copyToClipboard(text, btn){
  navigator.clipboard?.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied';
    btn.style.background = 'var(--success)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1200);
  }).catch(() => {
    btn.textContent = 'Failed';
    setTimeout(() => { btn.textContent = 'Copy docs URL'; }, 1200);
  });
}