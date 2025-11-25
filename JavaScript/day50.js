// Day 50 | Resume - print & compact toggle
(function () {
  const printBtn = document.getElementById('printBtn')
  const compactBtn = document.getElementById('compactBtn')
  const STORAGE_KEY = 'day50.resume.compact'

  const applyCompact = (enabled) => {
    document.documentElement.classList.toggle('is-compact', !!enabled)
    if (compactBtn) compactBtn.textContent = enabled ? 'Comfortable' : 'Compact'
  }

  // init from storage
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === '1') applyCompact(true)
  } catch {}

  printBtn?.addEventListener('click', () => window.print())

  compactBtn?.addEventListener('click', () => {
    const isOn = document.documentElement.classList.toggle('is-compact')
    try { localStorage.setItem(STORAGE_KEY, isOn ? '1' : '0') } catch {}
    compactBtn.textContent = isOn ? 'Comfortable' : 'Compact'
  })
})()


