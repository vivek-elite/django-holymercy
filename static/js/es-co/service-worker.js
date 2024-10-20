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
  'https://holymercy.com/static/css/es-co/contact.css',
  'https://holymercy.com/static/css/es-co/styles.css',
  'https://holymercy.com/es-co/',
  'https://holymercy.com/es-co/the-vision',
  'https://holymercy.com/es-co/spiritual-realms',
  'https://holymercy.com/es-co/soldiers-of-light',
  'https://holymercy.com/es-co/guardian-angels',
  'https://holymercy.com/es-co/living-light',
  'https://holymercy.com/es-co/unconditional-love',
  'https://holymercy.com/es-co/heavenly-realms',
  'https://holymercy.com/es-co/about-us',
  'https://holymercy.com/es-co/ebook',
  'https://holymercy.com/es-co/login',
  'https://holymercy.com/es-co/signup',
  'https://holymercy.com/es-co/share-the-faith',
  'https://holymercy.com/es-co/powerful-scripture',
  'https://holymercy.com/es-co/prayer-request',
  'https://holymercy.com/es-co/contact-us',
  'https://holymercy.com/es-co/terms',
  'https://holymercy.com/static/img/es-co/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/es-co/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/es-co/angel-applauding.webp',
  'https://holymercy.com/static/img/es-co/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/es-co/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/es-co/angel-praying.webp',
  'https://holymercy.com/static/img/es-co/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/es-co/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/es-co/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/es-co/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/es-co/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/es-co/back-to-top-link.webp',
  'https://holymercy.com/static/img/es-co/cogwheel-icon.webp',
  'https://holymercy.com/static/img/es-co/dove-stained-glass.webp',
  'https://holymercy.com/static/img/es-co/favicon.webp',
  'https://holymercy.com/static/img/es-co/heart-of-light.webp',
  'https://holymercy.com/static/img/es-co/heavenly-realms.webp',
  'https://holymercy.com/static/img/es-co/holymercy-logo.webp',
  'https://holymercy.com/static/img/es-co/icon-64.png',
  'https://holymercy.com/static/img/es-co/icon-128.png',
  'https://holymercy.com/static/img/es-co/icon-256.png',
  'https://holymercy.com/static/img/es-co/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/es-co/maskable_icon_192.png',
  'https://holymercy.com/static/img/es-co/maskable_icon_512.png',
  'https://holymercy.com/static/img/es-co/prayer-request.webp',
  'https://holymercy.com/static/img/es-co/prayer-request-meta.webp',
  'https://holymercy.com/static/img/es-co/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/es-co/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/es-co/soldiers-of-light.webp',
  'https://holymercy.com/static/img/es-co/spirit-dove.webp',
  'https://holymercy.com/static/img/es-co/spiritual-realms.webp',
  'https://holymercy.com/static/img/es-co/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/es-co/the-vision.webp',
  'https://holymercy.com/static/img/es-co/unconditional-love.webp',
  'https://holymercy.com/static/img/es-co/apple_touch_icon-64x64.webp',
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