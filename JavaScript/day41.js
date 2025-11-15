// Day 41 — News App (Hacker News via Algolia, no API key)
document.addEventListener("DOMContentLoaded", initializeNewsApp);

function initializeNewsApp() {
  const UI = {
    query: document.getElementById("newsQuery"),
    searchBtn: document.getElementById("searchBtn"),
    topBtn: document.getElementById("topBtn"),
    latestBtn: document.getElementById("latestBtn"),
    list: document.getElementById("newsList"),
    status: document.getElementById("status"),
  };

  UI.searchBtn.addEventListener("click", () => fetchNews({ mode: "search", q: UI.query.value.trim() }));
  UI.query.addEventListener("keydown", (e) => { if (e.key === "Enter") UI.searchBtn.click(); });
  UI.topBtn.addEventListener("click", () => fetchNews({ mode: "top" }));
  UI.latestBtn.addEventListener("click", () => fetchNews({ mode: "latest", q: UI.query.value.trim() }));

  const last = JSON.parse(localStorage.getItem("day41_last") || "null");
  if (last?.mode === "top") UI.topBtn.click();
  else if (last?.mode === "latest") fetchNews({ mode: "latest", q: last.q || "" });
  else if (last?.mode === "search") fetchNews({ mode: "search", q: last.q || "" });
  else fetchNews({ mode: "top" });
}

/**
 * fetchNews(options)
 * options.mode: 'top' | 'latest' | 'search'
 * options.q: optional search query
 */
async function fetchNews({ mode = "top", q = "" } = {}) {
  const UI = {
    list: document.getElementById("newsList"),
    status: document.getElementById("status"),
  };

  UI.list.innerHTML = "";
  showStatus("Loading…");

  localStorage.setItem("day41_last", JSON.stringify({ mode, q }));

  let url;
  try {
    if (mode === "top") {
      url = "https://hn.algolia.com/api/v1/search?tags=front_page";
    } else if (mode === "latest") {
      url = q ? `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(q)}&tags=story` : `https://hn.algolia.com/api/v1/search_by_date?tags=story`;
    } else {
      url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(q)}&tags=story`;
    }

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    const hits = Array.isArray(data.hits) ? data.hits : [];
    if (hits.length === 0) {
      showStatus("No results found.");
      return;
    }
    renderNews(hits);
    showStatus(`Showing ${hits.length} items (${mode}${q ? ` • \"${q}\"` : ""})`);
  } catch (err) {
    showStatus("Failed to load news. Try again.", true);
    UI.list.innerHTML = `<li class="news-card">Error: ${escapeHtml(err.message)}</li>`;
  }
}

function renderNews(items) {
  const list = document.getElementById("newsList");
  list.innerHTML = "";

  items.forEach((h) => {
    const title = h.title || h.story_title || "Untitled";
    const url = h.url || (h.story_url) || `https://news.ycombinator.com/item?id=${h.objectID}`;
    const author = h.author || "unknown";
    const points = h.points ?? h.score ?? 0;
    const time = h.created_at ? new Date(h.created_at).toLocaleString() : "";

    const li = document.createElement("li");
    li.className = "news-card";
    li.innerHTML = `
      <div>
        <a class="news-title" href="${escapeAttr(url)}" target="_blank" rel="noopener">${escapeHtml(title)}</a>
      </div>
      <div class="news-meta">
        <span>by ${escapeHtml(author)}</span>
        <span>• ${points} pts</span>
        <span>• ${escapeHtml(time)}</span>
      </div>
      <div class="news-actions">
        <button class="small-btn ghost" onclick="window.open('${escapeAttr(url)}','_blank')">Open</button>
        <button class="small-btn" onclick="copyToClipboard('${escapeAttr(url)}', this)">Copy URL</button>
        <a class="small-btn ghost" href="https://news.ycombinator.com/item?id=${escapeAttr(h.objectID)}" target="_blank" rel="noopener">HN Thread</a>
      </div>
    `;
    list.appendChild(li);
  });
}

function showStatus(text, isError = false) {
  const s = document.getElementById("status");
  s.textContent = text;
  s.style.color = isError ? "#ff6b6b" : "";
}

function escapeHtml(s) {
  if (!s) return "";
  return String(s).replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
}
function escapeAttr(s) { return (s || "").replace(/"/g, "%22"); }

function copyToClipboard(text, btn) {
  navigator.clipboard?.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = "Copied!";
    btn.style.background = "#10b981";
    setTimeout(() => { btn.textContent = original; btn.style.background = ""; }, 1200);
  }).catch(() => {
    showStatus("Failed to copy.", true);
  });
}