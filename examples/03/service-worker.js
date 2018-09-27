const version = 0;
const prefix = 'example-03';
const cacheName = `${prefix}-precache-${version}`;

self.addEventListener('install', (event) => {
  event.waitUntil(prefetchResources());
});

async function prefetchResources() {
  const cache = await caches.open(cacheName);
  await cache.addAll([
    './',
    'offline.html',
    'pwa.svg',
  ]);
}

self.addEventListener('activate', (event) => {
  event.waitUntil(cleanupCaches());
});

async function cleanupCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(c => c !== cacheName)
      .map(c => caches.delete(c))
  );
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  event.respondWith(cacheOrFetch(event.request));
});

async function cacheOrFetch(request) {
  try {
    const cacheHit = await caches.match(request);
    if (cacheHit) {
      return cacheHit;
    }
    return await fetch(request);
  } catch (e) {
    return await caches.match('offline.html');
  }
}
