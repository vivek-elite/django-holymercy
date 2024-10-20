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
  'https://holymercy.com/static/css/es-ve/contact.css',
  'https://holymercy.com/static/css/es-ve/styles.css',
  'https://holymercy.com/es-ve/',
  'https://holymercy.com/es-ve/the-vision',
  'https://holymercy.com/es-ve/spiritual-realms',
  'https://holymercy.com/es-ve/soldiers-of-light',
  'https://holymercy.com/es-ve/guardian-angels',
  'https://holymercy.com/es-ve/living-light',
  'https://holymercy.com/es-ve/unconditional-love',
  'https://holymercy.com/es-ve/heavenly-realms',
  'https://holymercy.com/es-ve/about-us',
  'https://holymercy.com/es-ve/ebook',
  'https://holymercy.com/es-ve/login',
  'https://holymercy.com/es-ve/signup',
  'https://holymercy.com/es-ve/share-the-faith',
  'https://holymercy.com/es-ve/powerful-scripture',
  'https://holymercy.com/es-ve/prayer-request',
  'https://holymercy.com/es-ve/contact-us',
  'https://holymercy.com/es-ve/terms',
  'https://holymercy.com/static/img/es-ve/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/es-ve/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/es-ve/angel-applauding.webp',
  'https://holymercy.com/static/img/es-ve/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/es-ve/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/es-ve/angel-praying.webp',
  'https://holymercy.com/static/img/es-ve/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/es-ve/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/es-ve/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/es-ve/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/es-ve/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/es-ve/back-to-top-link.webp',
  'https://holymercy.com/static/img/es-ve/cogwheel-icon.webp',
  'https://holymercy.com/static/img/es-ve/dove-stained-glass.webp',
  'https://holymercy.com/static/img/es-ve/favicon.webp',
  'https://holymercy.com/static/img/es-ve/heart-of-light.webp',
  'https://holymercy.com/static/img/es-ve/heavenly-realms.webp',
  'https://holymercy.com/static/img/es-ve/holymercy-logo.webp',
  'https://holymercy.com/static/img/es-ve/icon-64.png',
  'https://holymercy.com/static/img/es-ve/icon-128.png',
  'https://holymercy.com/static/img/es-ve/icon-256.png',
  'https://holymercy.com/static/img/es-ve/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/es-ve/maskable_icon_192.png',
  'https://holymercy.com/static/img/es-ve/maskable_icon_512.png',
  'https://holymercy.com/static/img/es-ve/prayer-request.webp',
  'https://holymercy.com/static/img/es-ve/prayer-request-meta.webp',
  'https://holymercy.com/static/img/es-ve/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/es-ve/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/es-ve/soldiers-of-light.webp',
  'https://holymercy.com/static/img/es-ve/spirit-dove.webp',
  'https://holymercy.com/static/img/es-ve/spiritual-realms.webp',
  'https://holymercy.com/static/img/es-ve/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/es-ve/the-vision.webp',
  'https://holymercy.com/static/img/es-ve/unconditional-love.webp',
  'https://holymercy.com/static/img/es-ve/apple_touch_icon-64x64.webp',
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