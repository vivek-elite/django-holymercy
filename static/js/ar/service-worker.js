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
  'https://holymercy.com/static/css/ar/contact.css',
  'https://holymercy.com/static/css/ar/styles.css',
  'https://holymercy.com/ar/',
  'https://holymercy.com/ar/the-vision',
  'https://holymercy.com/ar/spiritual-realms',
  'https://holymercy.com/ar/soldiers-of-light',
  'https://holymercy.com/ar/guardian-angels',
  'https://holymercy.com/ar/living-light',
  'https://holymercy.com/ar/unconditional-love',
  'https://holymercy.com/ar/heavenly-realms',
  'https://holymercy.com/ar/about-us',
  'https://holymercy.com/ar/ebook',
  'https://holymercy.com/ar/login',
  'https://holymercy.com/ar/signup',
  'https://holymercy.com/ar/share-the-faith',
  'https://holymercy.com/ar/powerful-scripture',
  'https://holymercy.com/ar/prayer-request',
  'https://holymercy.com/ar/contact-us',
  'https://holymercy.com/ar/terms',
  'https://holymercy.com/static/img/ar/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/ar/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/ar/angel-applauding.webp',
  'https://holymercy.com/static/img/ar/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/ar/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/ar/angel-praying.webp',
  'https://holymercy.com/static/img/ar/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/ar/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/ar/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/ar/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/ar/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/ar/back-to-top-link.webp',
  'https://holymercy.com/static/img/ar/cogwheel-icon.webp',
  'https://holymercy.com/static/img/ar/dove-stained-glass.webp',
  'https://holymercy.com/static/img/ar/favicon.webp',
  'https://holymercy.com/static/img/ar/heart-of-light.webp',
  'https://holymercy.com/static/img/ar/heavenly-realms.webp',
  'https://holymercy.com/static/img/ar/holymercy-logo.webp',
  'https://holymercy.com/static/img/ar/icon-64.png',
  'https://holymercy.com/static/img/ar/icon-128.png',
  'https://holymercy.com/static/img/ar/icon-256.png',
  'https://holymercy.com/static/img/ar/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/ar/maskable_icon_192.png',
  'https://holymercy.com/static/img/ar/maskable_icon_512.png',
  'https://holymercy.com/static/img/ar/prayer-request.webp',
  'https://holymercy.com/static/img/ar/prayer-request-meta.webp',
  'https://holymercy.com/static/img/ar/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/ar/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/ar/soldiers-of-light.webp',
  'https://holymercy.com/static/img/ar/spirit-dove.webp',
  'https://holymercy.com/static/img/ar/spiritual-realms.webp',
  'https://holymercy.com/static/img/ar/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/ar/the-vision.webp',
  'https://holymercy.com/static/img/ar/unconditional-love.webp',
  'https://holymercy.com/static/img/ar/apple_touch_icon-64x64.webp',
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