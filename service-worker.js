const CACHE_NAME="evaluation-rta-test-848-v12";
const ASSETS=[
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./logo-francois-de-mahy.png",
  "./Fiches_Evaluations_63_Activites_CAP_BacPro_V4_CHARTE_DEFINITIVE.pdf"
];

self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).catch(()=>null));
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  const url=new URL(req.url);
  if(req.mode==="navigate" || url.pathname.endsWith("/index.html")){
    event.respondWith(
      fetch(req,{cache:"no-store"})
        .then(resp=>{
          const copy=resp.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put("./index.html",copy)).catch(()=>null);
          return resp;
        })
        .catch(()=>caches.match("./index.html"))
    );
    return;
  }
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
});
