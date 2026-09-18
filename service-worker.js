const CACHE_NAME = 'eval-V86-retrait-cloisonnement-classe';
const APP_SHELL=["./manifest.webmanifest","./logo-francois-de-mahy.png","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=="GET" || /firebase|googleapis|gstatic|google\.com/.test(url.hostname)) return;
  if(event.request.mode==="navigate" || url.pathname.endsWith("/index.html")){
    event.respondWith(fetch(event.request,{cache:"no-store"}).catch(()=>caches.match("./index.html")));
    return;
  }
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});
