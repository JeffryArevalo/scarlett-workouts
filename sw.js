// Offline support: network first, fall back to the cached copy (works in the gym with weak signal).
const CACHE = "scarlett-workouts-v7";
const CORE = ["./", "./index.html", "./styles.css", "./app.js", "./data.js", "./manifest.json", "./icon-180.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // Our own files skip the browser's HTTP cache (GitHub Pages keeps them ~10 min), so updates show up right away.
  const sameOrigin = new URL(e.request.url).origin === self.location.origin;
  e.respondWith(
    (sameOrigin ? fetch(e.request.url, { cache: "no-cache" }) : fetch(e.request))
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || caches.match("./index.html")))
  );
});
