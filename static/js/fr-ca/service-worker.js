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
  'https://holymercy.com/static/css/fr-ca/contact.css',
  'https://holymercy.com/static/css/fr-ca/styles.css',
  'https://holymercy.com/fr-ca/',
  'https://holymercy.com/fr-ca/the-vision',
  'https://holymercy.com/fr-ca/spiritual-realms',
  'https://holymercy.com/fr-ca/soldiers-of-light',
  'https://holymercy.com/fr-ca/guardian-angels',
  'https://holymercy.com/fr-ca/living-light',
  'https://holymercy.com/fr-ca/unconditional-love',
  'https://holymercy.com/fr-ca/heavenly-realms',
  'https://holymercy.com/fr-ca/about-us',
  'https://holymercy.com/fr-ca/ebook',
  'https://holymercy.com/fr-ca/login',
  'https://holymercy.com/fr-ca/signup',
  'https://holymercy.com/fr-ca/share-the-faith',
  'https://holymercy.com/fr-ca/powerful-scripture',
  'https://holymercy.com/fr-ca/prayer-request',
  'https://holymercy.com/fr-ca/contact-us',
  'https://holymercy.com/fr-ca/terms',
  'https://holymercy.com/static/img/fr-ca/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/fr-ca/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/fr-ca/angel-applauding.webp',
  'https://holymercy.com/static/img/fr-ca/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/fr-ca/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/fr-ca/angel-praying.webp',
  'https://holymercy.com/static/img/fr-ca/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/fr-ca/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/fr-ca/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/fr-ca/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/fr-ca/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/fr-ca/back-to-top-link.webp',
  'https://holymercy.com/static/img/fr-ca/cogwheel-icon.webp',
  'https://holymercy.com/static/img/fr-ca/dove-stained-glass.webp',
  'https://holymercy.com/static/img/fr-ca/favicon.webp',
  'https://holymercy.com/static/img/fr-ca/heart-of-light.webp',
  'https://holymercy.com/static/img/fr-ca/heavenly-realms.webp',
  'https://holymercy.com/static/img/fr-ca/holymercy-logo.webp',
  'https://holymercy.com/static/img/fr-ca/icon-64.png',
  'https://holymercy.com/static/img/fr-ca/icon-128.png',
  'https://holymercy.com/static/img/fr-ca/icon-256.png',
  'https://holymercy.com/static/img/fr-ca/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/fr-ca/maskable_icon_192.png',
  'https://holymercy.com/static/img/fr-ca/maskable_icon_512.png',
  'https://holymercy.com/static/img/fr-ca/prayer-request.webp',
  'https://holymercy.com/static/img/fr-ca/prayer-request-meta.webp',
  'https://holymercy.com/static/img/fr-ca/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/fr-ca/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/fr-ca/soldiers-of-light.webp',
  'https://holymercy.com/static/img/fr-ca/spirit-dove.webp',
  'https://holymercy.com/static/img/fr-ca/spiritual-realms.webp',
  'https://holymercy.com/static/img/fr-ca/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/fr-ca/the-vision.webp',
  'https://holymercy.com/static/img/fr-ca/unconditional-love.webp',
  'https://holymercy.com/static/img/fr-ca/apple_touch_icon-64x64.webp',
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