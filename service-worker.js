const CACHE_NAME='evaluation-charge-atelier-rta-integration-1';
const ASSETS=[
  './',
  './index.html',
  './Evaluation_Charge_atelier_rta-integration-1.html',
  './manifest.webmanifest',
  './logo-francois-de-mahy.png',
  './Fiches_Evaluations_63_Activites_CAP_BacPro_V4_CHARTE_DEFINITIVE.pdf'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(fetch(event.request).then(resp=>{
    const copy=resp.clone();
    caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>{});
    return resp;
  }).catch(()=>caches.match(event.request)));
});
