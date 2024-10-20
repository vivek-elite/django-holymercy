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
  'https://holymercy.com/static/css/fr-fr/contact.css',
  'https://holymercy.com/static/css/fr-fr/styles.css',
  'https://holymercy.com/fr-fr/',
  'https://holymercy.com/fr-fr/the-vision',
  'https://holymercy.com/fr-fr/spiritual-realms',
  'https://holymercy.com/fr-fr/soldiers-of-light',
  'https://holymercy.com/fr-fr/guardian-angels',
  'https://holymercy.com/fr-fr/living-light',
  'https://holymercy.com/fr-fr/unconditional-love',
  'https://holymercy.com/fr-fr/heavenly-realms',
  'https://holymercy.com/fr-fr/about-us',
  'https://holymercy.com/fr-fr/ebook',
  'https://holymercy.com/fr-fr/login',
  'https://holymercy.com/fr-fr/signup',
  'https://holymercy.com/fr-fr/share-the-faith',
  'https://holymercy.com/fr-fr/powerful-scripture',
  'https://holymercy.com/fr-fr/prayer-request',
  'https://holymercy.com/fr-fr/contact-us',
  'https://holymercy.com/fr-fr/terms',
  'https://holymercy.com/static/img/fr-fr/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/fr-fr/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/fr-fr/angel-applauding.webp',
  'https://holymercy.com/static/img/fr-fr/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/fr-fr/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/fr-fr/angel-praying.webp',
  'https://holymercy.com/static/img/fr-fr/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/fr-fr/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/fr-fr/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/fr-fr/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/fr-fr/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/fr-fr/back-to-top-link.webp',
  'https://holymercy.com/static/img/fr-fr/cogwheel-icon.webp',
  'https://holymercy.com/static/img/fr-fr/dove-stained-glass.webp',
  'https://holymercy.com/static/img/fr-fr/favicon.webp',
  'https://holymercy.com/static/img/fr-fr/heart-of-light.webp',
  'https://holymercy.com/static/img/fr-fr/heavenly-realms.webp',
  'https://holymercy.com/static/img/fr-fr/holymercy-logo.webp',
  'https://holymercy.com/static/img/fr-fr/icon-64.png',
  'https://holymercy.com/static/img/fr-fr/icon-128.png',
  'https://holymercy.com/static/img/fr-fr/icon-256.png',
  'https://holymercy.com/static/img/fr-fr/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/fr-fr/maskable_icon_192.png',
  'https://holymercy.com/static/img/fr-fr/maskable_icon_512.png',
  'https://holymercy.com/static/img/fr-fr/prayer-request.webp',
  'https://holymercy.com/static/img/fr-fr/prayer-request-meta.webp',
  'https://holymercy.com/static/img/fr-fr/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/fr-fr/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/fr-fr/soldiers-of-light.webp',
  'https://holymercy.com/static/img/fr-fr/spirit-dove.webp',
  'https://holymercy.com/static/img/fr-fr/spiritual-realms.webp',
  'https://holymercy.com/static/img/fr-fr/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/fr-fr/the-vision.webp',
  'https://holymercy.com/static/img/fr-fr/unconditional-love.webp',
  'https://holymercy.com/static/img/fr-fr/apple_touch_icon-64x64.webp',
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