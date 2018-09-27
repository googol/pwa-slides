# PWA intro

## Title slide
- Alex Russell & Frances Berriman
  - Husband & wife team doing cool web stuff
  - Talked about ideal web app properties over lunch sometime in 2015
  - Named their ideal kind of web app "Progressive web app"

## Properties of PWAs
### Linkable, responsive, safe
- Should be nobrainers for reaktorians already

### App-like interactions
- The most vague of these all
- Can mean smooth transitions, motion design
- Can mean app shell
- Most of all means designing good flow through the site

### Connectivity independant
- Site is protected from the offline dinosaur, and spotty connection/lie-fi
- Most important is that the the user gets some value regardless of the connection
- Also important for bandwidth usage!

### Installable, discoverable, fresh
- Users might want to add shortcut icons to webpages
- A standalone web app is more immersive
- Background sync, SW lifecycle will keep the content fresh
- Essentially means adding an app manifest

### Re-engageable
- Push notifications enable getting users back into our content, but don't be a dick about it

## PWA misconceptions / quotes
- "PWA needs to be an SPA"
- "PWA only make sense for "apps""
- "Nobody would want to install this"
- "Offline is useless for a site like this"

## Kinds of web sites

### Information pages
- example reaktorbreakpoint.com
- Pages for events, companies etc
- Possibility of no connection, congestion or spotty connections
- Users want to quickly get their info and be on their way

- Just cache the entire site
- Some users might even want to install (for the duration of the event for example)
- Push notifications may be useful in some cases, like for change announcements for events

### Publishing sites
- example yle.fi
- Cache base assets
- Allow user to select articles to save offline (if navigated to not cached page, show option to download it asap + notify, with background sync)
- Use recommendation engines to preload articles into cache
- Why have a separate Uutisvahti mobile app, when you can just use web push notifications to enable the same thing?
- Background sync latest news every so often (or push updates to clients)
- Many people might want to install their favourite news site

### Transactional sites
- example k-ruoka.fi/kauppa
- Cache base assets, informational texts etc
- Cache user favorites, fronpage products, most liked products etc
- Consider offline checkout (when no need for payment inputs etc) with background sync
- Push notifications are exceptional for informing about status updates for orders
- Push notifications are great for informing about new promotions
- Installing makes perfect sense for repeat users! This is already a very appy thing.

## SW fetch with hardcoded offline page
- Just to show how to install a basic sw
- for html requests: passthrough fetch, in catch return a hardcoded offline page

## Cache API primer
- Network first caching

## SW install
- install base assets to cache

## SW activate
- cleanup old cache

## SW lifecycle
- update check on:
  - navigation into scope
  - wake up via push/sync event
  - manual update
- update respects cache headers up to 24 hours
- update proceeds if service worker main file byte-different

- new SW activates only when all old clients have closed and a new navigation happens
  - or `self.skipWaiting()`
  - in chrome shift+reload reloads without controller, can be used as a trick
  - chrome update on reload option

- SW uninstall
- short answer: don't
- if you must, install a service worker that clears caches but doesn't handle fetch

- SW gotchas: Rex refresh loop, Coulis removal
  - rex: automatic version syncing between client & server
    - when client connects via ws, server sends its version number immediately
    - if the client version number is different, it automatically refreshes itself to get the new client code
    - the old controller is still active, since on a reload the new content is loaded before the page unloads -> old code gets returned from cache
    - rinse & repeat, you've got yourself a very flashy site
  - coulis removal

## web app manifest
- link to manifest, `<link rel="manifest" href="example.webmanifest" />` (`application/manifest+json`)
- required:
  - name
  - icons, at least one element with src, size, type
  - display: fullscreen, standalone, minimal-ui, browser
  - start_url
  - background_color: splash screen
- recommended:
  - description
  - short_name
- nice:
  - theme_color: browser tab header, app selector

## Theming extras
- https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/
- https://gist.github.com/tfausak/2222823
  - Be careful with `web app capable`

## installation gotchas: IOS
- separate serviceworkers & storages for browser, webview & installed-to-homescreen standalone pwa
  - except cache!
- external links from installed-to-homescreen open in browser -> different storage & session
