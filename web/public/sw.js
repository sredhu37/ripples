// Offline support. App files are cached on first load and refreshed in the
// background, so the app opens without internet after one visit.
const CACHE = "ripples-v5";
// Otto's voice files are named after their content, so a cached file never goes stale. They live
// in their own cache, which survives app updates, and are never fetched again once kept.
const AUDIO_CACHE = "ripples-audio-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(["./", "./manifest.webmanifest", "./icon.svg"])),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE && k !== AUDIO_CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// A 206 (part of a file, answer to a Range request) cannot be cached, so only full answers are kept.
const keep = (cache, req, res) => {
  if (res.status === 200) cache.put(req, res.clone());
  return res;
};

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // The API answers from the network only: cached progress or health would be stale.
  if (
    req.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/")
  )
    return;
  if (url.pathname.startsWith("/audio/")) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        return cached ?? fetch(req).then((res) => keep(cache, req, res));
      }),
    );
    return;
  }
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => keep(cache, req, res))
        .catch(() => cached);
      return cached ?? network;
    }),
  );
});
