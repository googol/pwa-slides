self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  event.respondWith(fetchOrFallback(event.request));
});

async function fetchOrFallback(request) {
  try {
    return await fetch(request);
  } catch(e) {
    return new Response('You appear to be offline');
  }
}
