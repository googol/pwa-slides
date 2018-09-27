import { h } from './h.js';
import { Presentation } from './presentation.js';
import { TitleSlide } from './titleSlide.js';
import { ContentSlide, LargeContentSlide } from './ContentSlide.js';
import { VideoSlide } from './VideoSlide.js';
import { Frame } from './Frame.js';

const root = document.querySelector('#app');

const ul = (list) => h('ul', list.map(li => h('li', li)))

const PwaMisconceptionsSlide = () => h(ContentSlide, {
  title: 'Common misconceptions about PWAS',
  main: () => h(Frame, [ul([
    'A PWA needs to be an SPA',
    'A PWA only make sense for "apps"',
    'Nobody would want to install site x',
    'Offline is useless for site x',
  ])]),
  aside: () => h('img', { src: './Dwight-Schrute.jpg', style: { width: '100%', height: '100%', objectFit: 'cover', margin: 0, padding: 0 } }),
});

const InformationPagesSlide = () => h(ContentSlide, {
  title: 'PWA tech on different kinds of pages',
  main: () => h(Frame, [
    h('h2', 'Informational pages'),
    ul([
      'Event pages',
      'Company pages',
    ]),
  ]),
  aside: () => h('iframe', { src: 'https://reaktorbreakpoint.fi', style: { width: '100%', height: '100%' } }),
});

const PublishingSitesSlide = () => h(ContentSlide, {
  title: 'PWA tech on different kinds of pages',
  main: () => h(Frame, [
    h('h2', 'Publishing sites'),
    ul([
      'News sites',
      'Blogs',
    ]),
  ]),
  aside: () => h('iframe', { src: 'https://yle.fi', style: { width: '100%', height: '100%' } }),
});

const TransactionalSitesSlide = () => h(ContentSlide, {
  title: 'PWA tech on different kinds of pages',
  main: () => h(Frame, [
    h('h2', 'Transactional sites'),
    h('p', 'Sites where you go to accomplish a task'),
  ]),
  aside: () => h('iframe', { src: 'https://k-ruokapro.fi', style: { width: '100%', height: '100%' } }),
});

const CodeBlock = ({ children }) => h('pre', [
  h('code', { ref: (element) => { if (element) { hljs.highlightBlock(element) } } }, children),
]);

const ServiceWorker = () => h(LargeContentSlide, {
  title: 'Service worker',
  main: () => h(Frame, [
    h('p', 'A lot like shared workers, except:'),
    ul([
      'Can (and will) be killed by the browser',
      'Has a special lifecycle',
      'Has special superpowers',
    ]),
  ]),
});

const AddingServiceWorker1 = () => h(LargeContentSlide, {
  title: 'Installing a simple service worker',
  main: () => h(Frame, [
    h('h2', 'serviceworker.js'),
    h(CodeBlock, `self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  event.respondWith(fetchOrFallback(event.request));
});

async function fetchOrFallback(request) {
  try {
    return await fetch(request);
  } catch (e) {
    return new Response('You appear to be offline');
  }
}`),
  ]),
});

const AddingServiceWorker2 = () => h(LargeContentSlide, {
  title: 'Installing a simple service worker',
  main: () => h(Frame, [
    h('h2', 'main script'),
    h(CodeBlock, `<script>
  window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('./service-worker.js');
    }
  });
</script>`),
  ]),
});

const ServiceWorkerScope = () => h(LargeContentSlide, {
  title: 'Service worker scope',
  main: () => h(Frame, [
    h('p', 'handles everything under current directory'),
    h(CodeBlock, `navigator.serviceWorker.register('./service-worker.js');`),
    h('p', 'handles everything under sw directory'),
    h(CodeBlock, `navigator.serviceWorker.register('./sw/service-worker.js');`),
    h('p', 'also handles everything under sw directory'),
    h(CodeBlock, `navigator.serviceWorker.register('./service-worker.js', { scope: './sw' });`),
    h('p', 'not allowed'),
    h(CodeBlock, `navigator.serviceWorker.register('./sw/service-worker.js', { scope: '.' });`),
  ]),
});

const ServiceWorkerInstall1 = () => h(LargeContentSlide, {
  title: 'Prefetching assets',
  main: () => h(Frame, [
    h('h2', 'service-worker.js'),
    h(CodeBlock, `const cacheName = 'example-02-precache-1';

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
}`),
  ]),
});

const ServiceWorkerInstall2 = () => h(LargeContentSlide, {
  title: 'Prefetching assets',
  main: () => h(Frame, [
    h('h2', 'service-worker.js'),
    h(CodeBlock, `async function cacheOrFetch(request) {
  try {
    const cacheHit = await caches.match(request);
    if (cacheHit) {
      return cacheHit;
    }
    return await fetch(request);
  } catch (e) {
    return await caches.match('offline.html');
  }
}`),
  ]),
});

const ServiceWorkerCleanup = () => h(LargeContentSlide, {
  title: 'Cleaning up old caches',
  main: () => h(Frame, [
    h('h2', 'service-worker.js'),
    h(CodeBlock, `const cacheName = 'example-03-precache-1';

self.addEventListener('activate', (event) => {
  event.waitUntil(cleanupCaches());
});

async function cleanupCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(c => c.startsWith('example-03') && c !== cacheName)
      .map(c => caches.delete(c))
  );
}`),
  ]),
});

const ServiceWorkerLifecycle = () => h(LargeContentSlide, {
  title: 'Lifecycle',
  main: () => h(Frame, [h('img', { src: '/sw-lifecycle.svg', style: { width: '50%', height: '100%' } })]),
});

const WebAppManifest = () => h(ContentSlide, {
  title: 'Make it installable with a manifest',
  main: () => h(Frame, [h(CodeBlock, `{
  "name": "Introduction to Progressive Web Apps",
  "short_name": "Intro to PWAs",
  "icons": [
    {
      "src": "/pwa.png",
      "sizes": "2048x771",
      "type": "image/png"
    }
  ],
  "display": "standalone",
  "start_url": "/",
  "scope": "/",
  "background_color": "linen",
  "theme_color": "#5A0FC8"
}`)]),
  aside: () => h(Frame, [
    h('p', 'A new place for all your metacrap!'),
    h('p', 'Defines the identity of the app when installing.'),
    h(CodeBlock, `<link
  rel="manifest"
  href="pwa-intro.webmanifest" />`),
  ]),
});

const ExtraConsiderations = () => h(LargeContentSlide, {
  title: 'Extra considerations',
  main: () => h(Frame, [
    h('h2', 'Cache'),
    ul([
      'Cachebusting your assets makes it easier to follow what is in your cache.',
      'Never cache bust your service worker!',
      'Consider adding no-cache to your service worker',
    ]),
    h('h2', 'Tooling'),
    ul([
      'Out of the box with create-react-app, preact & vue cli, gatsby',
      'workbox',
      'sw-precache/sw-toolbox',
    ]),
    h('h2', 'Resources'),
    ul([
      'MDN',
      'serviceworke.rs',
    ]),
  ]),
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoStream: undefined,
    };
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(videoStream => { this.setState({ videoStream }); });
  }

  render() {
    const { videoStream } = this.state;

    const videoSlide = (title, main) => h(VideoSlide, { videoStream, title, main })

    return h(Presentation, { pathPrefix: '/pwa-slides', slides: [
      { path: '/', slide: h(TitleSlide) },
      { path: '/linkable-responsive-safe', slide: h(LargeContentSlide, { title: 'Properties of PWAs', main: () => h(Frame, [ul(['Linkable', 'Responsive', 'Safe']), h('p', 'You guys know this stuff')])}) },
      { path: '/app-like-interactions', slide: videoSlide('Properties of PWAs', () => h(Frame, [ul(['App-like interactions'])])) },
      { path: '/connectivity-independent', slide: videoSlide('Properties of PWAs', () => h(Frame, [ul(['Connectivity independent'])])) },
      { path: '/installable-discoverable-fresh', slide: videoSlide('Properties of PWAs', () => h(Frame, [ul(['Installable', 'Discoverable', 'Fresh'])])) },
      { path: '/re-engageable', slide: videoSlide('Properties of PWAs', () => h(Frame, [ul(['Re-engageable'])])) },
      { path: '/misconceptions', slide: h(PwaMisconceptionsSlide) },
      { path: '/information-pages', slide: h(InformationPagesSlide) },
      { path: '/publishing-sites', slide: h(PublishingSitesSlide) },
      { path: '/transactional-sites', slide: h(TransactionalSitesSlide) },
      { path: '/serviceworker', slide: h(ServiceWorker) },
      { path: '/adding-serviceworker', slide: h(AddingServiceWorker1) },
      { path: '/adding-serviceworker/2', slide: h(AddingServiceWorker2) },
      { path: '/serviceworker-scope', slide: h(ServiceWorkerScope) },
      { path: '/serviceworker-install', slide: h(ServiceWorkerInstall1) },
      { path: '/serviceworker-install/2', slide: h(ServiceWorkerInstall2) },
      { path: '/serviceworker-cleanup', slide: h(ServiceWorkerCleanup) },
      { path: '/serviceworker-lifecycle', slide: h(ServiceWorkerLifecycle) },
      { path: '/manifest', slide: h(WebAppManifest) },
      { path: '/more', slide: h(ExtraConsiderations) },
    ] });
  }
}

ReactDOM.render(h(App), root);
