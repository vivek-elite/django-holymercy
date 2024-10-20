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
  'https://holymercy.com/static/css/es-pe/contact.css',
  'https://holymercy.com/static/css/es-pe/styles.css',
  'https://holymercy.com/es-pe/',
  'https://holymercy.com/es-pe/the-vision',
  'https://holymercy.com/es-pe/spiritual-realms',
  'https://holymercy.com/es-pe/soldiers-of-light',
  'https://holymercy.com/es-pe/guardian-angels',
  'https://holymercy.com/es-pe/living-light',
  'https://holymercy.com/es-pe/unconditional-love',
  'https://holymercy.com/es-pe/heavenly-realms',
  'https://holymercy.com/es-pe/about-us',
  'https://holymercy.com/es-pe/ebook',
  'https://holymercy.com/es-pe/login',
  'https://holymercy.com/es-pe/signup',
  'https://holymercy.com/es-pe/share-the-faith',
  'https://holymercy.com/es-pe/powerful-scripture',
  'https://holymercy.com/es-pe/prayer-request',
  'https://holymercy.com/es-pe/contact-us',
  'https://holymercy.com/es-pe/terms',
  'https://holymercy.com/static/img/es-pe/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/es-pe/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/es-pe/angel-applauding.webp',
  'https://holymercy.com/static/img/es-pe/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/es-pe/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/es-pe/angel-praying.webp',
  'https://holymercy.com/static/img/es-pe/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/es-pe/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/es-pe/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/es-pe/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/es-pe/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/es-pe/back-to-top-link.webp',
  'https://holymercy.com/static/img/es-pe/cogwheel-icon.webp',
  'https://holymercy.com/static/img/es-pe/dove-stained-glass.webp',
  'https://holymercy.com/static/img/es-pe/favicon.webp',
  'https://holymercy.com/static/img/es-pe/heart-of-light.webp',
  'https://holymercy.com/static/img/es-pe/heavenly-realms.webp',
  'https://holymercy.com/static/img/es-pe/holymercy-logo.webp',
  'https://holymercy.com/static/img/es-pe/icon-64.png',
  'https://holymercy.com/static/img/es-pe/icon-128.png',
  'https://holymercy.com/static/img/es-pe/icon-256.png',
  'https://holymercy.com/static/img/es-pe/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/es-pe/maskable_icon_192.png',
  'https://holymercy.com/static/img/es-pe/maskable_icon_512.png',
  'https://holymercy.com/static/img/es-pe/prayer-request.webp',
  'https://holymercy.com/static/img/es-pe/prayer-request-meta.webp',
  'https://holymercy.com/static/img/es-pe/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/es-pe/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/es-pe/soldiers-of-light.webp',
  'https://holymercy.com/static/img/es-pe/spirit-dove.webp',
  'https://holymercy.com/static/img/es-pe/spiritual-realms.webp',
  'https://holymercy.com/static/img/es-pe/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/es-pe/the-vision.webp',
  'https://holymercy.com/static/img/es-pe/unconditional-love.webp',
  'https://holymercy.com/static/img/es-pe/apple_touch_icon-64x64.webp',
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