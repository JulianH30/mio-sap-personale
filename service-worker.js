const CACHE_NAME = 'sap-vault-v27'; // Cambiato da v26 a v27
const urlsToCache = [
  'index.html',
  'manifest.json'
];

self.addEventListener('install', event => {
  // Forza l'attivazione immediata del nuovo Service Worker
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Pulisce le vecchie cache (v26)
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
