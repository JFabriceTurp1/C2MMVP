const CACHE_NAME = "competences-mv-v88-3-pwa-ui-numeric-6";
const APP_SHELL = ["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function bypassNetworkCache(url){
  return url.hostname.includes("firebase") ||
         url.hostname.includes("googleapis.com") ||
         url.hostname.includes("gstatic.com") ||
         url.hostname.includes("google.com");
}

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if(req.method !== "GET") return;
  if(bypassNetworkCache(url)) return;

  if(req.mode === "navigate"){
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
        return res;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  if(url.origin === self.location.origin){
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      }))
    );
  }
});
