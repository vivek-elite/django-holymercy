//-----------------------------------------
// Service Worker
//
// * Offline first
// * Clears old cache on version change
//
//-----------------------------------------

// Init cache name/version
const cacheName = 'v1';

// which pages/assets do you want to cache?
const cacheAssets = [
  'https://holymercy.com/static/css/de/contact.css',
  'https://holymercy.com/static/css/de/styles.css',
  'https://holymercy.com/de/',
  'https://holymercy.com/de/the-vision',
  'https://holymercy.com/de/spiritual-realms',
  'https://holymercy.com/de/soldiers-of-light',
  'https://holymercy.com/de/guardian-angels',
  'https://holymercy.com/de/living-light',
  'https://holymercy.com/de/unconditional-love',
  'https://holymercy.com/de/heavenly-realms',
  'https://holymercy.com/de/about-us',
  'https://holymercy.com/de/ebook',
  'https://holymercy.com/de/login',
  'https://holymercy.com/de/signup',
  'https://holymercy.com/de/share-the-faith',
  'https://holymercy.com/de/powerful-scripture',
  'https://holymercy.com/de/prayer-request',
  'https://holymercy.com/de/contact-us',
  'https://holymercy.com/de/terms',
  'https://holymercy.com/static/img/de/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/de/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/de/angel-applauding.webp',
  'https://holymercy.com/static/img/de/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/de/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/de/angel-praying.webp',
  'https://holymercy.com/static/img/de/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/de/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/de/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/de/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/de/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/de/back-to-top-link.webp',
  'https://holymercy.com/static/img/de/cogwheel-icon.webp',
  'https://holymercy.com/static/img/de/dove-stained-glass.webp',
  'https://holymercy.com/static/img/de/favicon.webp',
  'https://holymercy.com/static/img/de/heart-of-light.webp',
  'https://holymercy.com/static/img/de/heavenly-realms.webp',
  'https://holymercy.com/static/img/de/holymercy-logo.webp',
  'https://holymercy.com/static/img/de/icon-64.png',
  'https://holymercy.com/static/img/de/icon-128.png',
  'https://holymercy.com/static/img/de/icon-256.png',
  'https://holymercy.com/static/img/de/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/de/maskable_icon_192.png',
  'https://holymercy.com/static/img/de/maskable_icon_512.png',
  'https://holymercy.com/static/img/de/prayer-request.webp',
  'https://holymercy.com/static/img/de/prayer-request-meta.webp',
  'https://holymercy.com/static/img/de/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/de/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/de/soldiers-of-light.webp',
  'https://holymercy.com/static/img/de/spirit-dove.webp',
  'https://holymercy.com/static/img/de/spiritual-realms.webp',
  'https://holymercy.com/static/img/de/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/de/the-vision.webp',
  'https://holymercy.com/static/img/de/unconditional-love.webp',
  'https://holymercy.com/static/img/de/apple_touch_icon-64x64.webp',
]

// Install service worker
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});


// Activate the service worker
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');

  // Remove old caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        // look at all the cacheNames
        cacheNames.map(cache => {
          // if the current cache !== cacheName then delete it
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );

});



// listen for fetch event (HTTP request)
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching');

  // Offline backup
  // e.respondWith(
  //   // if the user is online, perform a regular HTTP request
  //   fetch(e.request)
  //   // if the HTTP request fails (offline) then serve the assets requested from the cache
  //   .catch(() => caches.match(e.request))
  // )

  // Offline first
  e.respondWith(
    // are the files requested in the cache already?
    caches.match(e.request).then(cachedResponse => {
      // if yes, then serve files from cache
      if (cachedResponse) {
        console.log('Found in cache!');
        return cachedResponse;
      }
      // else do an HTTP request to the server
      return fetch(e.request);
    })
  )
});