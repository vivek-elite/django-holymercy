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
  'https://holymercy.com/static/css/es-es/contact.css',
  'https://holymercy.com/static/css/es-es/styles.css',
  'https://holymercy.com/es-es/',
  'https://holymercy.com/es-es/the-vision',
  'https://holymercy.com/es-es/spiritual-realms',
  'https://holymercy.com/es-es/soldiers-of-light',
  'https://holymercy.com/es-es/guardian-angels',
  'https://holymercy.com/es-es/living-light',
  'https://holymercy.com/es-es/unconditional-love',
  'https://holymercy.com/es-es/heavenly-realms',
  'https://holymercy.com/es-es/about-us',
  'https://holymercy.com/es-es/ebook',
  'https://holymercy.com/es-es/login',
  'https://holymercy.com/es-es/signup',
  'https://holymercy.com/es-es/share-the-faith',
  'https://holymercy.com/es-es/powerful-scripture',
  'https://holymercy.com/es-es/prayer-request',
  'https://holymercy.com/es-es/contact-us',
  'https://holymercy.com/es-es/terms',
  'https://holymercy.com/static/img/es-es/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/es-es/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/es-es/angel-applauding.webp',
  'https://holymercy.com/static/img/es-es/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/es-es/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/es-es/angel-praying.webp',
  'https://holymercy.com/static/img/es-es/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/es-es/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/es-es/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/es-es/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/es-es/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/es-es/back-to-top-link.webp',
  'https://holymercy.com/static/img/es-es/cogwheel-icon.webp',
  'https://holymercy.com/static/img/es-es/dove-stained-glass.webp',
  'https://holymercy.com/static/img/es-es/favicon.webp',
  'https://holymercy.com/static/img/es-es/heart-of-light.webp',
  'https://holymercy.com/static/img/es-es/heavenly-realms.webp',
  'https://holymercy.com/static/img/es-es/holymercy-logo.webp',
  'https://holymercy.com/static/img/es-es/icon-64.png',
  'https://holymercy.com/static/img/es-es/icon-128.png',
  'https://holymercy.com/static/img/es-es/icon-256.png',
  'https://holymercy.com/static/img/es-es/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/es-es/maskable_icon_192.png',
  'https://holymercy.com/static/img/es-es/maskable_icon_512.png',
  'https://holymercy.com/static/img/es-es/prayer-request.webp',
  'https://holymercy.com/static/img/es-es/prayer-request-meta.webp',
  'https://holymercy.com/static/img/es-es/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/es-es/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/es-es/soldiers-of-light.webp',
  'https://holymercy.com/static/img/es-es/spirit-dove.webp',
  'https://holymercy.com/static/img/es-es/spiritual-realms.webp',
  'https://holymercy.com/static/img/es-es/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/es-es/the-vision.webp',
  'https://holymercy.com/static/img/es-es/unconditional-love.webp',
  'https://holymercy.com/static/img/es-es/apple_touch_icon-64x64.webp',
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