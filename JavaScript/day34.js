// Day 34 - Weather Explorer using Open-Meteo (no API key required)
// Features: city search with autocomplete, geolocation, current weather, next hours, recent cache, graceful errors.

const UI = {}; // will hold refs

document.addEventListener("DOMContentLoaded", () => {
  // Grab elements
  UI.cityInput = document.getElementById("city-input");
  UI.searchBtn = document.getElementById("search-btn");
  UI.geoBtn = document.getElementById("geo-btn");
  UI.status = document.getElementById("status");
  UI.suggestions = document.getElementById("suggestions");
  UI.currentPanel = document.getElementById("current-weather");
  UI.forecastPanel = document.getElementById("forecast");
  UI.forecastCards = document.getElementById("forecast-cards");
  UI.temp = document.getElementById("temp");
  UI.feels = document.getElementById("feels");
  UI.humidity = document.getElementById("humidity");
  UI.wind = document.getElementById("wind");
  UI.condition = document.getElementById("condition");
  UI.updated = document.getElementById("updated");
  UI.iconWrap = document.getElementById("icon-wrap");
  UI.recentWrapper = document.getElementById("recent-wrapper");
  UI.recentList = document.getElementById("recent-list");
  UI.clearRecent = document.getElementById("clear-recent");

  restoreRecent();

  UI.searchBtn?.addEventListener("click", () => {
    const q = UI.cityInput.value.trim();
    if (q) searchCity(q);
  });
  UI.cityInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const q = UI.cityInput.value.trim();
      if (q) searchCity(q);
    }
  });
  UI.geoBtn?.addEventListener("click", useGeolocation);
  UI.clearRecent?.addEventListener("click", () => {
    localStorage.removeItem("day34_recent");
    renderRecent([]);
  });

  UI.cityInput?.addEventListener("input", handleSuggest);
  document.addEventListener("click", (e) => {
    if (!UI.suggestions.contains(e.target) && e.target !== UI.cityInput) {
      UI.suggestions.classList.remove("active");
    }
  });
});

async function handleSuggest() {
  const q = UI.cityInput.value.trim();
  if (q.length < 2) {
    UI.suggestions.classList.remove("active");
    UI.suggestions.innerHTML = "";
    return;
  }
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      q
    )}&count=5&language=en&format=json`;
    const data = await fetchJSON(url);
    if (!data.results) {
      UI.suggestions.classList.remove("active");
      UI.suggestions.innerHTML = "";
      return;
    }
    UI.suggestions.innerHTML = data.results
      .map((r) => {
        const label = `${r.name}, ${r.country_code}${
          r.admin1 ? " • " + r.admin1 : ""
        }`;
        return `<button type="button" data-lat="${r.latitude}" data-lon="${r.longitude}" data-name="${label}">${label}</button>`;
      })
      .join("");
    UI.suggestions.classList.add("active");
    [...UI.suggestions.querySelectorAll("button")].forEach((btn) => {
      btn.addEventListener("click", () => {
        UI.cityInput.value = btn.dataset.name;
        UI.suggestions.classList.remove("active");
        fetchWeather({
          name: btn.dataset.name,
          latitude: btn.dataset.lat,
          longitude: btn.dataset.lon,
        });
      });
    });
  } catch (e) {
    console.debug("Suggestion fetch failed", e);
  }
}

async function searchCity(q) {
  setStatus(`Searching "${q}" ...`);
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      q
    )}&count=1&language=en&format=json`;
    const data = await fetchJSON(url);
    if (!data.results || data.results.length === 0) {
      setStatus("City not found. Try another name.");
      return;
    }
    const place = data.results[0];
    fetchWeather(place);
  } catch (e) {
    setStatus("Failed to search city. Check connection.");
  }
}

async function useGeolocation() {
  if (!navigator.geolocation) {
    setStatus("Geolocation not supported in this browser.");
    return;
  }
  setStatus("Getting your location ...");
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const reverseUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=en`;
        const rev = await fetchJSON(reverseUrl);
        const name = rev.results?.[0]?.name || "Your Location";
        fetchWeather({ name, latitude, longitude });
      } catch (e) {
        setStatus("Failed to reverse geocode location.");
      }
    },
    (err) => {
      setStatus("Location denied or unavailable.");
    },
    { enableHighAccuracy: false, timeout: 8000 }
  );
}

async function fetchWeather(place) {
  const { latitude, longitude, name } = place;
  setStatus(`Loading weather for ${name} ...`);
  try {
    const params = new URLSearchParams({
      latitude,
      longitude,
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
      hourly: "temperature_2m,weather_code",
      timezone: "auto",
    });
    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
    const data = await fetchJSON(url);
    updateCurrent(data, name);
    updateForecast(data);
    pushRecent({ name, latitude, longitude });
    setStatus("");
  } catch (e) {
    console.error(e);
    setStatus("Failed to load weather data.");
  }
}

function updateCurrent(data, label) {
  const c = data.current;
  if (!c) return;
  UI.currentPanel.hidden = false;
  UI.temp.textContent = Math.round(c.temperature_2m);
  UI.feels.textContent = Math.round(c.apparent_temperature);
  UI.humidity.textContent = c.relative_humidity_2m;
  UI.wind.textContent = c.wind_speed_10m;
  UI.condition.textContent = weatherCodeMeaning(c.weather_code).label;
  UI.iconWrap.textContent = weatherCodeMeaning(c.weather_code).icon;
  UI.updated.textContent = `Updated for ${label} • ${new Date(
    data.current.time
  ).toLocaleString()}`;
}

function updateForecast(data) {
  const h = data.hourly;
  if (!h) return;
  UI.forecastPanel.hidden = false;
  const nowIndex = h.time.findIndex((t) => new Date(t) >= new Date());
  const slice = [];
  for (let i = nowIndex; i < Math.min(nowIndex + 12, h.time.length); i++) {
    slice.push({
      time: h.time[i],
      temp: h.temperature_2m[i],
      code: h.weather_code[i],
    });
  }
  UI.forecastCards.innerHTML = slice
    .map((s) => {
      const dt = new Date(s.time);
      const hour = dt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const info = weatherCodeMeaning(s.code);
      return `<div class="card"><div class="hour">${hour}</div><div class="ico">${
        info.icon
      }</div><div class="f-temp">${Math.round(
        s.temp
      )}°</div><div class="label">${info.short}</div></div>`;
    })
    .join("");
}

function setStatus(msg) {
  UI.status.textContent = msg || "";
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response not ok");
  return res.json();
}

function weatherCodeMeaning(code) {
  // simplified mapping subset
  const map = {
    0: { label: "Clear sky", icon: "☀️", short: "Clear" },
    1: { label: "Mainly clear", icon: "🌤️", short: "Clear" },
    2: { label: "Partly cloudy", icon: "⛅", short: "Clouds" },
    3: { label: "Overcast", icon: "☁️", short: "Cloudy" },
    45: { label: "Foggy", icon: "🌫️", short: "Fog" },
    48: { label: "Rime Fog", icon: "🌫️", short: "Fog" },
    51: { label: "Light drizzle", icon: "🌧️", short: "Drizzle" },
    53: { label: "Moderate drizzle", icon: "🌧️", short: "Drizzle" },
    55: { label: "Dense drizzle", icon: "🌧️", short: "Drizzle" },
    61: { label: "Light rain", icon: "🌦️", short: "Rain" },
    63: { label: "Moderate rain", icon: "🌧️", short: "Rain" },
    65: { label: "Heavy rain", icon: "🌧️", short: "Rain" },
    71: { label: "Light snow", icon: "🌨️", short: "Snow" },
    73: { label: "Snow", icon: "🌨️", short: "Snow" },
    75: { label: "Heavy snow", icon: "❄️", short: "Snow" },
    80: { label: "Rain showers", icon: "🌦️", short: "Showers" },
    81: { label: "Heavy showers", icon: "🌧️", short: "Showers" },
    82: { label: "Violent showers", icon: "🌧️", short: "Showers" },
    95: { label: "Thunderstorm", icon: "⛈️", short: "Storm" },
    96: { label: "Thunder + hail", icon: "⛈️", short: "Storm" },
    99: { label: "Severe storm", icon: "⛈️", short: "Storm" },
  };
  return map[code] || { label: "Unknown", icon: "❔", short: "N/A" };
}

function restoreRecent() {
  try {
    const raw = localStorage.getItem("day34_recent");
    if (!raw) return;
    const arr = JSON.parse(raw);
    renderRecent(arr);
  } catch {}
}

function pushRecent(entry) {
  try {
    const raw = localStorage.getItem("day34_recent");
    let arr = raw ? JSON.parse(raw) : [];
    // dedupe by name
    arr = arr.filter((r) => r.name !== entry.name);
    arr.unshift(entry);
    if (arr.length > 6) arr = arr.slice(0, 6);
    localStorage.setItem("day34_recent", JSON.stringify(arr));
    renderRecent(arr);
  } catch {}
}

function renderRecent(arr) {
  if (!arr || arr.length === 0) {
    UI.recentWrapper.hidden = true;
    UI.recentList.innerHTML = "";
    return;
  }
  UI.recentWrapper.hidden = false;
  UI.recentList.innerHTML = arr
    .map(
      (r) =>
        `<button type="button" data-lat="${r.latitude}" data-lon="${r.longitude}" data-name="${r.name}">${r.name}</button>`
    )
    .join("");
  [...UI.recentList.querySelectorAll("button")].forEach((btn) => {
    btn.addEventListener("click", () => {
      fetchWeather({
        name: btn.dataset.name,
        latitude: btn.dataset.lat,
        longitude: btn.dataset.lon,
      });
    });
  });
}

// Accessibility: keyboard navigation for suggestions using arrow keys
document.addEventListener("keydown", (e) => {
  if (!UI.suggestions?.classList.contains("active")) return;
  const items = [...UI.suggestions.querySelectorAll("button")];
  if (!items.length) return;
  const currentIndex = items.indexOf(document.activeElement);
  if (e.key === "ArrowDown") {
    e.preventDefault();
    const next = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
    items[next].focus();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    const prev = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
    items[prev].focus();
  } else if (e.key === "Escape") {
    UI.suggestions.classList.remove("active");
  }
});
