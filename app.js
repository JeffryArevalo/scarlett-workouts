/* Scarlett's Workouts: tiny hash-routed app. Routes: #/ , #/mon , #/mon/2 */
(function () {
  const app = document.getElementById("app");
  const PHASE_KEY = "scarlett-phase";

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

  function todayId() {
    return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date().getDay()];
  }

  function setsReps(ex, phase) {
    if (ex.main) return { sets: phase.sets, reps: phase.reps, rest: phase.rest };
    return { sets: ex.sets, reps: ex.reps, rest: null };
  }

  function go(hash) { location.hash = hash; }

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

    const list = day.exercises.map((ex, i) => {
      const sr = setsReps(ex, phase);
      return `
        <button class="ex-btn" data-go="#/${day.id}/${i}" aria-label="${esc(ex.name)}, ${sr.sets} sets of ${esc(sr.reps)}">
          <span class="num" aria-hidden="true"></span>
          <span>
            <span class="name">${esc(ex.name)}${ex.main ? '<span class="tag">Main</span>' : ""}${ex.superset ? '<span class="tag">Superset</span>' : ""}</span>
            <span class="sets"><strong>${sr.sets} × ${esc(sr.reps)}</strong>${sr.rest ? " · rest " + esc(sr.rest) : ""}</span>
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

  function exerciseView(day, idx) {
    const phase = getPhase();
    const ex = day.exercises[idx];
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
    if (!day) {
      html = homeView();
    } else if (parts[1] !== undefined && day.exercises[Number(parts[1])]) {
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
    if (phaseBtn) setPhase(phaseBtn.getAttribute("data-phase"));
  });

  window.addEventListener("hashchange", render);
  render();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline support is optional */ });
  }
})();
