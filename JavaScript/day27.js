// Day 27 — Advanced Events & Event Listeners
// This file powers the interactive demos. Each section demonstrates a modern pattern.

// Utilities
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function log(msg) {
  const log = $("#eventLog");
  if (!log) return;
  const li = document.createElement("li");
  li.textContent = msg;
  log.appendChild(li);
  log.scrollTop = log.scrollHeight;
}

function clearLog() {
  const logEl = $("#eventLog");
  if (logEl) logEl.innerHTML = "";
}

function copyLog() {
  const logEl = $("#eventLog");
  const text = $$("#eventLog li")
    .map((li) => li.textContent)
    .join("\n");
  if (!text) return;
  navigator.clipboard?.writeText(text);
}

// Theme toggle
(() => {
  const toggle = $("#themeToggle");
  const apply = (isDark) => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  };
  if (toggle) {
    toggle.addEventListener("change", () => apply(!toggle.checked));
    // Persist choice in localStorage
    const saved = localStorage.getItem("day27-theme");
    if (saved) {
      const isDark = saved === "dark";
      apply(isDark);
      toggle.checked = !isDark;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      apply(prefersDark);
      toggle.checked = !prefersDark;
    }
    new MutationObserver(() => {
      localStorage.setItem(
        "day27-theme",
        document.body.getAttribute("data-theme")
      );
    }).observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
})();

// 1) Propagation Visualizer
(() => {
  const outer = $("#outer");
  const middle = $("#middle");
  const inner = $("#inner");
  if (!outer || !middle || !inner) return;

  // Controls
  const capOuter = $("#capOuter");
  const bubOuter = $("#bubOuter");
  const capMiddle = $("#capMiddle");
  const bubMiddle = $("#bubMiddle");
  const capInner = $("#capInner");
  const bubInner = $("#bubInner");
  const stopAtInnerCapture = $("#stopAtInnerCapture");
  const stopAtInnerBubble = $("#stopAtInnerBubble");

  const listeners = [];
  function resetListeners() {
    listeners.forEach(({ node, fn, opts, type }) =>
      node.removeEventListener(type, fn, opts)
    );
    listeners.length = 0;
  }

  function add(node, type, fn, opts) {
    node.addEventListener(type, fn, opts);
    listeners.push({ node, type, fn, opts });
  }

  function setup() {
    resetListeners();
    clearLog();
    const cap = (name) => (e) => {
      log(`${name} (capture)`);
      if (name === "inner" && stopAtInnerCapture.checked) {
        e.stopPropagation();
        log("stopPropagation() at inner (capture)");
      }
    };
    const bub = (name) => (e) => {
      log(`${name} (bubble)`);
      if (name === "inner" && stopAtInnerBubble.checked) {
        e.stopPropagation();
        log("stopPropagation() at inner (bubble)");
      }
    };

    capOuter.checked && add(outer, "click", cap("outer"), { capture: true });
    capMiddle.checked && add(middle, "click", cap("middle"), { capture: true });
    capInner.checked && add(inner, "click", cap("inner"), { capture: true });
    bubOuter.checked && add(outer, "click", bub("outer"), { capture: false });
    bubMiddle.checked &&
      add(middle, "click", bub("middle"), { capture: false });
    bubInner.checked && add(inner, "click", bub("inner"), { capture: false });
  }

  [
    capOuter,
    bubOuter,
    capMiddle,
    bubMiddle,
    capInner,
    bubInner,
    stopAtInnerCapture,
    stopAtInnerBubble,
  ].forEach((cb) => cb?.addEventListener("change", setup));

  inner.addEventListener("click", () => log("— target click —"));
  setup();
})();

// Event log buttons
(() => {
  $("#clearLogBtn")?.addEventListener("click", clearLog);
  $("#copyLogBtn")?.addEventListener("click", () => {
    copyLog();
    log("Log copied to clipboard");
  });
})();

// 2) Event Delegation
(() => {
  const list = $("#delegatedList");
  const form = $("#addItemForm");
  const input = $("#newItem");
  if (!list || !form || !input) return;

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const li = btn.closest("li");
    const text = $(".text", li);
    const action = btn.dataset.action;

    if (action === "toggle") {
      const pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!pressed));
      text.classList.toggle("done");
    } else if (action === "remove") {
      li.remove();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) return;
    const li = document.createElement("li");
    li.innerHTML = `
			<button class="chip" data-action="toggle" aria-pressed="false">Mark</button>
			<span class="text"></span>
			<button class="icon" data-action="remove" aria-label="Remove">✕</button>
		`;
    $(".text", li).textContent = name;
    list.appendChild(li);
    input.value = "";
    input.focus();
  });
})();

// 3) Listener options: once, passive, signal
(() => {
  const onceBtn = $("#onceBtn");
  const trackBox = $("#trackBox");
  const startTrack = $("#startTrack");
  const stopTrack = $("#stopTrack");
  const useOnce = $("#useOnce");
  const wheelArea = $("#wheelArea");
  const usePassive = $("#usePassive");
  const preventWheel = $("#preventWheel");

  if (!onceBtn || !trackBox || !startTrack || !stopTrack || !wheelArea) return;

  // once (controlled by checkbox)
  onceBtn.addEventListener("click", (e) => {
    if (!useOnce?.checked) {
      log('Clicked (normal). Enable "once" to arm a one-time listener.');
      return;
    }
    if (onceBtn.dataset.armed === "true") {
      // already armed; do nothing. The armed listener will fire on this click if added previously.
      return;
    }
    onceBtn.dataset.armed = "true";
    const handler = () => {
      log("Clicked once! The listener auto-removed.");
      delete onceBtn.dataset.armed;
    };
    onceBtn.addEventListener("click", handler, { once: true });
    log("One-time listener armed — click again to fire.");
  });

  // AbortController for mousemove tracking
  let controller = null;
  function start() {
    if (controller) controller.abort();
    controller = new AbortController();
    const signal = controller.signal;
    const move = (e) => {
      trackBox.textContent = `x:${e.offsetX} y:${e.offsetY}`;
    };
    trackBox.addEventListener("mousemove", move, { signal });
    log("Tracking started (mousemove). Abort to stop.");
  }
  function stop() {
    controller?.abort();
    controller = null;
    trackBox.textContent = "Move mouse here";
    log("Tracking aborted.");
  }
  startTrack.addEventListener("click", start);
  stopTrack.addEventListener("click", stop);

  // wheel passive vs preventDefault
  function onWheel(e) {
    if (preventWheel.checked) {
      e.preventDefault();
      log("wheel preventDefault() attempted");
    }
  }
  function attachWheel() {
    wheelArea.removeEventListener("wheel", onWheel);
    wheelArea.addEventListener("wheel", onWheel, {
      passive: usePassive.checked,
    });
  }
  usePassive?.addEventListener("change", attachWheel);
  preventWheel?.addEventListener("change", attachWheel);
  attachWheel();
})();

// 4) Custom Events
(() => {
  const like = $("#likeComponent");
  const btn = $("#likeBtn");
  const status = $("#likeStatus");
  const counter = $("#likeCount");
  if (!like || !btn || !status || !counter) return;

  let liked = false;
  let count = 0;

  btn.addEventListener("click", () => {
    liked = !liked;
    btn.setAttribute("aria-pressed", String(liked));
    btn.textContent = liked ? "♥ Liked" : "♡ Like";
    status.textContent = liked ? "Liked" : "Not liked";
    like.dispatchEvent(
      new CustomEvent("like:changed", { bubbles: true, detail: { liked } })
    );
  });

  like.addEventListener("like:changed", (e) => {
    count += 1;
    counter.textContent = String(count);
    log(`CustomEvent like:changed — liked=${e.detail.liked}`);
  });
})();

// 5) Keyboard Shortcuts and Command Palette
(() => {
  const palette = $("#palette");
  const paletteSearch = $("#paletteSearch");
  const paletteList = $("#paletteList");
  const closePalette = $("#closePalette");
  const themeToggle = $("#themeToggle");
  const siteSearch = $("#siteSearch");

  function openPalette() {
    palette.setAttribute("aria-hidden", "false");
    paletteSearch.value = "";
    paletteSearch.focus();
  }
  function close() {
    palette.setAttribute("aria-hidden", "true");
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== siteSearch) {
      e.preventDefault();
      siteSearch.focus();
    }
    if (e.key === "?") {
      e.preventDefault();
      openPalette();
    }
    if (e.key === "Escape") {
      close();
    }
  });

  closePalette?.addEventListener("click", close);

  paletteSearch?.addEventListener("input", () => {
    const q = paletteSearch.value.toLowerCase();
    $$("#paletteList li").forEach((li) => {
      li.style.display = li.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  paletteList?.addEventListener("click", (e) => {
    const li = e.target.closest("li[data-cmd]");
    if (!li) return;
    const cmd = li.dataset.cmd;
    if (cmd === "toggle-theme") {
      themeToggle.click();
    }
    if (cmd === "clear-log") {
      clearLog();
    }
    if (cmd === "copy-log") {
      copyLog();
      log("Log copied to clipboard");
    }
    close();
  });
})();

// 6) Drag & Drop Reordering
(() => {
  const list = $("#dndList");
  if (!list) return;
  let dragging = null;

  list.addEventListener("dragstart", (e) => {
    dragging = e.target;
    dragging.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });
  list.addEventListener("dragend", () =>
    dragging?.classList.remove("dragging")
  );
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const after = getDragAfterElement(list, e.clientY);
    const dr = dragging;
    if (!dr) return;
    if (after == null) {
      list.appendChild(dr);
    } else {
      list.insertBefore(dr, after);
    }
  });

  function getDragAfterElement(container, y) {
    const els = [...container.querySelectorAll("li:not(.dragging)")];
    return els.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY, element: null }
    ).element;
  }
})();

// Scroll reveal via IntersectionObserver
(() => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) ent.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => io.observe(el));
})();

// Minor: show a welcome log entry
log("Welcome. Interact with the widgets to see events in action.");
