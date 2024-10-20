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
  'https://holymercy.com/static/css/core/contact.css',
  'https://holymercy.com/static/css/core/styles.css',
  'https://holymercy.com/',
  'https://holymercy.com/the-vision',
  'https://holymercy.com/spiritual-realms',
  'https://holymercy.com/soldiers-of-light',
  'https://holymercy.com/guardian-angels',
  'https://holymercy.com/living-light',
  'https://holymercy.com/unconditional-love',
  'https://holymercy.com/heavenly-realms',
  'https://holymercy.com/about-us',
  'https://holymercy.com/ebook',
  'https://holymercy.com/login',
  'https://holymercy.com/signup',
  'https://holymercy.com/share-the-faith',
  'https://holymercy.com/static/powerful-scripture',
  'https://holymercy.com/static/prayer-request',
  'https://holymercy.com/static/contact-us',
  'https://holymercy.com/static/terms',
  'https://holymercy.com/static/img/core/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/core/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/core/angel-applauding.webp',
  'https://holymercy.com/static/img/core/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/core/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/core/angel-praying.webp',
  'https://holymercy.com/static/img/core/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/core/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/core/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/core/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/core/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/core/back-to-top-link.webp',
  'https://holymercy.com/static/img/core/cogwheel-icon.webp',
  'https://holymercy.com/static/img/core/dove-stained-glass.webp',
  'https://holymercy.com/static/img/core/favicon.webp',
  'https://holymercy.com/static/img/core/heart-of-light.webp',
  'https://holymercy.com/static/img/core/heavenly-realms.webp',
  'https://holymercy.com/static/img/core/holymercy-logo.webp',
  'https://holymercy.com/static/img/core/icon-64.png',
  'https://holymercy.com/static/img/core/icon-128.png',
  'https://holymercy.com/static/img/core/icon-256.png',
  'https://holymercy.com/static/img/core/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/core/maskable_icon_192.png',
  'https://holymercy.com/static/img/core/maskable_icon_512.png',
  'https://holymercy.com/static/img/core/prayer-request.webp',
  'https://holymercy.com/static/img/core/prayer-request-meta.webp',
  'https://holymercy.com/static/img/core/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/core/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/core/soldiers-of-light.webp',
  'https://holymercy.com/static/img/core/spirit-dove.webp',
  'https://holymercy.com/static/img/core/spiritual-realms.webp',
  'https://holymercy.com/static/img/core/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/core/the-vision.webp',
  'https://holymercy.com/static/img/core/unconditional-love.webp',
  'https://holymercy.com/static/img/core/apple_touch_icon-64x64.webp',
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