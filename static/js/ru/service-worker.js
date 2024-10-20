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
  'https://holymercy.com/static/css/ru/contact.css',
  'https://holymercy.com/static/css/ru/styles.css',
  'https://holymercy.com/ru/',
  'https://holymercy.com/ru/the-vision',
  'https://holymercy.com/ru/spiritual-realms',
  'https://holymercy.com/ru/soldiers-of-light',
  'https://holymercy.com/ru/guardian-angels',
  'https://holymercy.com/ru/living-light',
  'https://holymercy.com/ru/unconditional-love',
  'https://holymercy.com/ru/heavenly-realms',
  'https://holymercy.com/ru/about-us',
  'https://holymercy.com/ru/ebook',
  'https://holymercy.com/ru/login',
  'https://holymercy.com/ru/signup',
  'https://holymercy.com/ru/share-the-faith',
  'https://holymercy.com/ru/powerful-scripture',
  'https://holymercy.com/ru/prayer-request',
  'https://holymercy.com/ru/contact-us',
  'https://holymercy.com/ru/terms',
  'https://holymercy.com/static/img/ru/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/ru/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/ru/angel-applauding.webp',
  'https://holymercy.com/static/img/ru/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/ru/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/ru/angel-praying.webp',
  'https://holymercy.com/static/img/ru/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/ru/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/ru/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/ru/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/ru/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/ru/back-to-top-link.webp',
  'https://holymercy.com/static/img/ru/cogwheel-icon.webp',
  'https://holymercy.com/static/img/ru/dove-stained-glass.webp',
  'https://holymercy.com/static/img/ru/favicon.webp',
  'https://holymercy.com/static/img/ru/heart-of-light.webp',
  'https://holymercy.com/static/img/ru/heavenly-realms.webp',
  'https://holymercy.com/static/img/ru/holymercy-logo.webp',
  'https://holymercy.com/static/img/ru/icon-64.png',
  'https://holymercy.com/static/img/ru/icon-128.png',
  'https://holymercy.com/static/img/ru/icon-256.png',
  'https://holymercy.com/static/img/ru/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/ru/maskable_icon_192.png',
  'https://holymercy.com/static/img/ru/maskable_icon_512.png',
  'https://holymercy.com/static/img/ru/prayer-request.webp',
  'https://holymercy.com/static/img/ru/prayer-request-meta.webp',
  'https://holymercy.com/static/img/ru/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/ru/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/ru/soldiers-of-light.webp',
  'https://holymercy.com/static/img/ru/spirit-dove.webp',
  'https://holymercy.com/static/img/ru/spiritual-realms.webp',
  'https://holymercy.com/static/img/ru/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/ru/the-vision.webp',
  'https://holymercy.com/static/img/ru/unconditional-love.webp',
  'https://holymercy.com/static/img/ru/apple_touch_icon-64x64.webp',
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