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
  'https://holymercy.com/static/css/fr/contact.css',
  'https://holymercy.com/static/css/fr/styles.css',
  'https://holymercy.com/fr/',
  'https://holymercy.com/fr/the-vision',
  'https://holymercy.com/fr/spiritual-realms',
  'https://holymercy.com/fr/soldiers-of-light',
  'https://holymercy.com/fr/guardian-angels',
  'https://holymercy.com/fr/living-light',
  'https://holymercy.com/fr/unconditional-love',
  'https://holymercy.com/fr/heavenly-realms',
  'https://holymercy.com/fr/about-us',
  'https://holymercy.com/fr/ebook',
  'https://holymercy.com/fr/login',
  'https://holymercy.com/fr/signup',
  'https://holymercy.com/fr/share-the-faith',
  'https://holymercy.com/fr/powerful-scripture',
  'https://holymercy.com/fr/prayer-request',
  'https://holymercy.com/fr/contact-us',
  'https://holymercy.com/fr/terms',
  'https://holymercy.com/static/img/fr/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/fr/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/fr/angel-applauding.webp',
  'https://holymercy.com/static/img/fr/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/fr/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/fr/angel-praying.webp',
  'https://holymercy.com/static/img/fr/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/fr/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/fr/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/fr/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/fr/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/fr/back-to-top-link.webp',
  'https://holymercy.com/static/img/fr/cogwheel-icon.webp',
  'https://holymercy.com/static/img/fr/dove-stained-glass.webp',
  'https://holymercy.com/static/img/fr/favicon.webp',
  'https://holymercy.com/static/img/fr/heart-of-light.webp',
  'https://holymercy.com/static/img/fr/heavenly-realms.webp',
  'https://holymercy.com/static/img/fr/holymercy-logo.webp',
  'https://holymercy.com/static/img/fr/icon-64.png',
  'https://holymercy.com/static/img/fr/icon-128.png',
  'https://holymercy.com/static/img/fr/icon-256.png',
  'https://holymercy.com/static/img/fr/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/fr/maskable_icon_192.png',
  'https://holymercy.com/static/img/fr/maskable_icon_512.png',
  'https://holymercy.com/static/img/fr/prayer-request.webp',
  'https://holymercy.com/static/img/fr/prayer-request-meta.webp',
  'https://holymercy.com/static/img/fr/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/fr/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/fr/soldiers-of-light.webp',
  'https://holymercy.com/static/img/fr/spirit-dove.webp',
  'https://holymercy.com/static/img/fr/spiritual-realms.webp',
  'https://holymercy.com/static/img/fr/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/fr/the-vision.webp',
  'https://holymercy.com/static/img/fr/unconditional-love.webp',
  'https://holymercy.com/static/img/fr/apple_touch_icon-64x64.webp',
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