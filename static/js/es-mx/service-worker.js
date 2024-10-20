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
  'https://holymercy.com/static/css/es-mx/contact.css',
  'https://holymercy.com/static/css/es-mx/styles.css',
  'https://holymercy.com/es-mx/',
  'https://holymercy.com/es-mx/the-vision',
  'https://holymercy.com/es-mx/spiritual-realms',
  'https://holymercy.com/es-mx/soldiers-of-light',
  'https://holymercy.com/es-mx/guardian-angels',
  'https://holymercy.com/es-mx/living-light',
  'https://holymercy.com/es-mx/unconditional-love',
  'https://holymercy.com/es-mx/heavenly-realms',
  'https://holymercy.com/es-mx/about-us',
  'https://holymercy.com/es-mx/ebook',
  'https://holymercy.com/es-mx/login',
  'https://holymercy.com/es-mx/signup',
  'https://holymercy.com/es-mx/share-the-faith',
  'https://holymercy.com/es-mx/powerful-scripture',
  'https://holymercy.com/es-mx/prayer-request',
  'https://holymercy.com/es-mx/contact-us',
  'https://holymercy.com/es-mx/terms',
  'https://holymercy.com/static/img/es-mx/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/es-mx/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/es-mx/angel-applauding.webp',
  'https://holymercy.com/static/img/es-mx/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/es-mx/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/es-mx/angel-praying.webp',
  'https://holymercy.com/static/img/es-mx/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/es-mx/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/es-mx/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/es-mx/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/es-mx/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/es-mx/back-to-top-link.webp',
  'https://holymercy.com/static/img/es-mx/cogwheel-icon.webp',
  'https://holymercy.com/static/img/es-mx/dove-stained-glass.webp',
  'https://holymercy.com/static/img/es-mx/favicon.webp',
  'https://holymercy.com/static/img/es-mx/heart-of-light.webp',
  'https://holymercy.com/static/img/es-mx/heavenly-realms.webp',
  'https://holymercy.com/static/img/es-mx/holymercy-logo.webp',
  'https://holymercy.com/static/img/es-mx/icon-64.png',
  'https://holymercy.com/static/img/es-mx/icon-128.png',
  'https://holymercy.com/static/img/es-mx/icon-256.png',
  'https://holymercy.com/static/img/es-mx/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/es-mx/maskable_icon_192.png',
  'https://holymercy.com/static/img/es-mx/maskable_icon_512.png',
  'https://holymercy.com/static/img/es-mx/prayer-request.webp',
  'https://holymercy.com/static/img/es-mx/prayer-request-meta.webp',
  'https://holymercy.com/static/img/es-mx/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/es-mx/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/es-mx/soldiers-of-light.webp',
  'https://holymercy.com/static/img/es-mx/spirit-dove.webp',
  'https://holymercy.com/static/img/es-mx/spiritual-realms.webp',
  'https://holymercy.com/static/img/es-mx/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/es-mx/the-vision.webp',
  'https://holymercy.com/static/img/es-mx/unconditional-love.webp',
  'https://holymercy.com/static/img/es-mx/apple_touch_icon-64x64.webp',
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