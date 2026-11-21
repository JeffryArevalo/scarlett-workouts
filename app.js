/* Scarlett's Workouts: tiny hash-routed app. Routes: #/ , #/mon , #/mon/2 */
(function () {
  const app = document.getElementById("app");
  const PHASE_KEY = "scarlett-phase";
  const WEIGHTS_KEY = "scarlett-weights";
  let current = null; // { day, ex } while an exercise screen is open

  const ICON_CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';
  const ICON_BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  const ICON_DUMBBELL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 5v14M18 5v14M3 8v8M21 8v8M6 12h12"/></svg>';
  const ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const ICON_RUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="15" cy="4" r="2"/><path d="M13 8l-3 4 4 3v5M10 12l-3 1-2 4M14 15l3 1 2 4M11 8l-4-1-2 3"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function getPhase() {
    let id = null;
    try { id = localStorage.getItem(PHASE_KEY); } catch (e) { /* private mode */ }
    return PHASES.find((p) => p.id === id) || PHASES[0];
  }
  function setPhase(id) {
    try { localStorage.setItem(PHASE_KEY, id); } catch (e) { /* ignore */ }
    render();
  }

  // Skill exercises (pull-up, handstand) step up one version per phase.
  function resolve(ex) {
    if (!ex.levels) return ex;
    const i = Math.max(0, PHASES.indexOf(getPhase()));
    return Object.assign({}, ex, ex.levels[Math.min(i, ex.levels.length - 1)], { levels: undefined });
  }

  function todayId() {
    return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date().getDay()];
  }

  function setsReps(ex, phase) {
    if (ex.main) return { sets: phase.sets, reps: phase.reps, rest: phase.rest };
    return { sets: ex.sets, reps: ex.reps, rest: ex.rest || null };
  }

  function go(hash) { location.hash = hash; }

  /* ---------- Saved weights (kept on this phone only) ---------- */

  function isoToday() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function niceDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  function fmt(n) { return String(Math.round(n * 10) / 10); }

  // Two dumbbells = weight per hand. One-arm row and hip thrust use a single weight.
  // Assisted machines: the number is how much help she gets, so going down is progress.
  function unitFor(ex) {
    if (ex.assist) return "lb help";
    return /dumbbell/i.test(ex.name) && !/one-arm|hip thrust/i.test(ex.name) ? "lb each" : "lb";
  }

  function loadWeights() {
    try { return JSON.parse(localStorage.getItem(WEIGHTS_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveWeights(all) {
    try { localStorage.setItem(WEIGHTS_KEY, JSON.stringify(all)); return true; } catch (e) { return false; }
  }
  // Keyed by day + name, so Tuesday's and Friday's pushdowns are tracked separately.
  function weightKey(day, ex) { return day.id + ":" + ex.name; }
  function getWeight(day, ex) { return loadWeights()[weightKey(day, ex)] || null; }

  function setWeight(day, ex, value) {
    const all = loadWeights();
    const key = weightKey(day, ex);
    const cur = all[key];
    if (cur && cur.w === value) return true;
    const today = isoToday();
    // Edits on the same day just correct today's number. On a new day, the old number becomes "prev".
    const prev = cur ? (cur.date === today ? cur.prev : cur.w) : null;
    all[key] = { w: value, date: today, prev: prev };
    return saveWeights(all);
  }

  function weightMeta(entry, ex) {
    const assist = ex && ex.assist;
    if (!entry) {
      return assist
        ? "Type the help weight you set on the machine. Less help = stronger."
        : "Type the weight you lift. It's saved for next time.";
    }
    let s = entry.date === isoToday() ? "Saved today" : "Last time: " + esc(niceDate(entry.date));
    if (entry.prev != null && entry.w !== entry.prev) {
      const up = entry.w > entry.prev;
      const better = assist ? !up : up;
      const words = assist ? (up ? "more help than" : "less help than") : (up ? "up from" : "down from");
      s += ` · <span class="${better ? "up" : "down"}">${words} ${fmt(entry.prev)} lb</span>`;
    }
    return s;
  }

  function onWeightInput(raw) {
    if (!current) return;
    const text = String(raw).trim();
    if (text === "") return; // clearing the box to retype never erases the saved weight
    const v = parseFloat(text);
    if (!isFinite(v) || v < 0) return;
    const ok = setWeight(current.day, current.ex, Math.round(v * 10) / 10);
    const meta = document.getElementById("w-meta");
    if (meta) {
      meta.innerHTML = ok
        ? weightMeta(getWeight(current.day, current.ex), current.ex)
        : "Couldn't save on this phone. Make sure private browsing is off.";
    }
  }

  /* ---------- Views ---------- */

  function homeView() {
    const phase = getPhase();
    const today = todayId();
    const dayButtons = DAYS.map((d) => `
      <button class="day-btn${d.rest ? " rest" : ""}" data-go="#/${d.id}" aria-label="${esc(d.name)}: ${esc(d.title)}">
        <span class="abbr">${esc(d.short)}</span>
        <span>
          <span class="title">${esc(d.title)}${d.id === today ? '<span class="today-pill">Today</span>' : ""}</span>
          <span class="sub">${esc(d.run)}</span>
        </span>
        ${ICON_CHEV}
      </button>`).join("");

    const segs = PHASES.map((p) => `
      <button type="button" data-phase="${p.id}" aria-pressed="${p.id === phase.id}">${esc(p.name)}<span>${esc(p.label)}</span></button>`).join("");

    return `
      <section class="view">
        <header class="hero">
          <div class="eyebrow">Planet Fitness plan</div>
          <h1>Scarlett's Week</h1>
          <p>Tap a day to see the workout.</p>
        </header>
        <div class="section-title">Current phase</div>
        <div class="segmented" role="group" aria-label="Training phase">${segs}</div>
        <p class="phase-note">Main lifts: ${phase.sets} × ${esc(phase.reps)}, rest ${esc(phase.rest)}. ${esc(phase.effort)}</p>
        <div class="section-title">This week</div>
        <div class="days">${dayButtons}</div>
        <p class="footer-note">Week 13: lighter week (half the sets), then start a new block.</p>
      </section>`;
  }

  function dayView(day) {
    const phase = getPhase();
    const weights = loadWeights();
    const top = `
      <div class="topbar">
        <button class="back" data-go="#/">${ICON_BACK}Week</button>
      </div>`;

    if (day.rest) {
      return `
        <section class="view">
          ${top}
          <header class="day-head">
            <div class="eyebrow">${esc(day.name)}</div>
            <h1>${esc(day.title)}</h1>
          </header>
          <div class="rest-box">
            ${day.id === "sun" ? ICON_RUN : ICON_MOON}
            <h2>${day.id === "sun" ? "Run day" : "No lifting today"}</h2>
            <p>${esc(day.run)}</p>
          </div>
        </section>`;
    }

    const list = day.exercises.map((raw, i) => {
      const ex = resolve(raw);
      const sr = setsReps(ex, phase);
      const saved = ex.bw ? null : weights[weightKey(day, ex)];
      const lb = saved ? `${fmt(saved.w)} ${unitFor(ex)}` : "";
      return `
        <button class="ex-btn" data-go="#/${day.id}/${i}" aria-label="${esc(ex.name)}, ${sr.sets} sets of ${esc(sr.reps)}${lb ? ", last weight " + esc(lb) : ""}">
          <span class="num" aria-hidden="true"></span>
          <span>
            <span class="name">${esc(ex.name)}${ex.main ? '<span class="tag">Main</span>' : ""}${ex.superset ? '<span class="tag">Superset</span>' : ""}</span>
            <span class="sets"><strong>${sr.sets} × ${esc(sr.reps)}</strong>${sr.rest ? " · rest " + esc(sr.rest) : ""}${lb ? ` · <span class="lb">${esc(lb)}</span>` : ""}</span>
          </span>
          ${ICON_CHEV}
        </button>`;
    }).join("");

    return `
      <section class="view">
        ${top}
        <header class="day-head">
          <div class="eyebrow">${esc(day.name)} · ${esc(phase.name)} phase</div>
          <h1>${esc(day.title)}</h1>
          <p class="meta">${esc(day.run)}</p>
        </header>
        <div class="card">
          <h3>Warm-up</h3>
          <p>${esc(day.warmup)}</p>
        </div>
        ${day.note ? `<div class="card"><h3>Note</h3><p>${esc(day.note)}</p></div>` : ""}
        <div class="section-title">Exercises</div>
        <div class="exercises">${list}</div>
      </section>`;
  }

  function weightCard(day, ex) {
    if (ex.bw) return "";
    const entry = getWeight(day, ex);
    return `
      <div class="weight-card">
        <label class="weight-label" for="w-input">${ex.assist ? "Machine help" : "Weight"}</label>
        <div class="weight-row">
          <button type="button" class="step" data-step="-5" aria-label="5 pounds less">&minus;</button>
          <div class="weight-field">
            <input id="w-input" type="number" inputmode="decimal" min="0" step="any" placeholder="0" autocomplete="off" value="${entry ? fmt(entry.w) : ""}">
            <span>${unitFor(ex)}</span>
          </div>
          <button type="button" class="step" data-step="5" aria-label="5 pounds more">+</button>
        </div>
        <p class="weight-meta" id="w-meta" aria-live="polite">${weightMeta(entry, ex)}</p>
      </div>`;
  }

  function exerciseView(day, idx) {
    const phase = getPhase();
    const ex = resolve(day.exercises[idx]);
    const sr = setsReps(ex, phase);
    const prev = idx > 0 ? `#/${day.id}/${idx - 1}` : null;
    const next = idx < day.exercises.length - 1 ? `#/${day.id}/${idx + 1}` : null;

    const figure = ex.img
      ? `<div class="figure"><img src="images/${esc(ex.img)}" alt="How to do ${esc(ex.name)}" loading="eager"></div>
         ${ex.imgNote ? `<p class="img-note">${esc(ex.imgNote)}</p>` : ""}`
      : `<div class="figure empty">${ICON_DUMBBELL}<span>No photo yet. Follow the cues below.</span></div>`;

    return `
      <section class="view detail">
        <div class="topbar">
          <button class="back" data-go="#/${day.id}">${ICON_BACK}${esc(day.short)}</button>
        </div>
        <header>
          <div class="eyebrow">${esc(day.name)} · ${idx + 1} of ${day.exercises.length}${ex.superset ? " · " + esc(ex.superset) : ""}</div>
          <h1>${esc(ex.name)}</h1>
        </header>
        ${figure}
        <div class="stat-row">
          <div class="stat"><div class="label">Sets</div><div class="value">${sr.sets}</div></div>
          <div class="stat"><div class="label">Reps</div><div class="value">${esc(sr.reps)}</div></div>
          <div class="stat"><div class="label">Rest</div><div class="value">${sr.rest ? esc(sr.rest.replace(" sec", "s")) : "60s"}</div></div>
        </div>
        ${weightCard(day, ex)}
        <div class="section-title">How to do it</div>
        <ol class="cues">${ex.cues.map((c) => `<li>${esc(c)}</li>`).join("")}</ol>
        <div class="nav-row">
          <button type="button" ${prev ? `data-go="${prev}"` : "disabled"}>Previous</button>
          <button type="button" class="primary" ${next ? `data-go="${next}"` : `data-go="#/${day.id}"`}>${next ? "Next exercise" : "Done, back to day"}</button>
        </div>
      </section>`;
  }

  /* ---------- Router ---------- */

  function render() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const day = DAYS.find((d) => d.id === parts[0]);
    let html;
    current = null;
    if (!day) {
      html = homeView();
    } else if (parts[1] !== undefined && day.exercises[Number(parts[1])]) {
      current = { day: day, ex: resolve(day.exercises[Number(parts[1])]) };
      html = exerciseView(day, Number(parts[1]));
    } else {
      html = dayView(day);
    }
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }

  app.addEventListener("click", (e) => {
    const goBtn = e.target.closest("[data-go]");
    if (goBtn) { go(goBtn.getAttribute("data-go")); return; }
    const phaseBtn = e.target.closest("[data-phase]");
    if (phaseBtn) { setPhase(phaseBtn.getAttribute("data-phase")); return; }
    const stepBtn = e.target.closest("[data-step]");
    if (stepBtn) {
      const input = document.getElementById("w-input");
      if (!input) return;
      const base = parseFloat(input.value) || 0;
      const next = Math.max(0, base + Number(stepBtn.getAttribute("data-step")));
      input.value = fmt(next);
      onWeightInput(input.value);
    }
  });

  app.addEventListener("input", (e) => {
    if (e.target.id === "w-input") onWeightInput(e.target.value);
  });

  // Photo not added yet: show the "No photo yet" box instead of a broken image.
  app.addEventListener("error", (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.closest(".figure")) return;
    const fig = img.closest(".figure");
    fig.classList.add("empty");
    fig.innerHTML = ICON_DUMBBELL + "<span>No photo yet. Follow the cues below.</span>";
  }, true);

  window.addEventListener("hashchange", render);
  render();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline support is optional */ });
  }
})();
