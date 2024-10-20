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
  'https://holymercy.com/static/css/pt-pt/contact.css',
  'https://holymercy.com/static/css/pt-pt/styles.css',
  'https://holymercy.com/pt-pt/',
  'https://holymercy.com/pt-pt/the-vision',
  'https://holymercy.com/pt-pt/spiritual-realms',
  'https://holymercy.com/pt-pt/soldiers-of-light',
  'https://holymercy.com/pt-pt/guardian-angels',
  'https://holymercy.com/pt-pt/living-light',
  'https://holymercy.com/pt-pt/unconditional-love',
  'https://holymercy.com/pt-pt/heavenly-realms',
  'https://holymercy.com/pt-pt/about-us',
  'https://holymercy.com/pt-pt/ebook',
  'https://holymercy.com/pt-pt/login',
  'https://holymercy.com/pt-pt/signup',
  'https://holymercy.com/pt-pt/share-the-faith',
  'https://holymercy.com/pt-pt/powerful-scripture',
  'https://holymercy.com/pt-pt/prayer-request',
  'https://holymercy.com/pt-pt/contact-us',
  'https://holymercy.com/pt-pt/terms',
  'https://holymercy.com/static/img/pt-pt/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/pt-pt/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/pt-pt/angel-applauding.webp',
  'https://holymercy.com/static/img/pt-pt/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/pt-pt/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/pt-pt/angel-praying.webp',
  'https://holymercy.com/static/img/pt-pt/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/pt-pt/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/pt-pt/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/pt-pt/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/pt-pt/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/pt-pt/back-to-top-link.webp',
  'https://holymercy.com/static/img/pt-pt/cogwheel-icon.webp',
  'https://holymercy.com/static/img/pt-pt/dove-stained-glass.webp',
  'https://holymercy.com/static/img/pt-pt/favicon.webp',
  'https://holymercy.com/static/img/pt-pt/heart-of-light.webp',
  'https://holymercy.com/static/img/pt-pt/heavenly-realms.webp',
  'https://holymercy.com/static/img/pt-pt/holymercy-logo.webp',
  'https://holymercy.com/static/img/pt-pt/icon-64.png',
  'https://holymercy.com/static/img/pt-pt/icon-128.png',
  'https://holymercy.com/static/img/pt-pt/icon-256.png',
  'https://holymercy.com/static/img/pt-pt/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/pt-pt/maskable_icon_192.png',
  'https://holymercy.com/static/img/pt-pt/maskable_icon_512.png',
  'https://holymercy.com/static/img/pt-pt/prayer-request.webp',
  'https://holymercy.com/static/img/pt-pt/prayer-request-meta.webp',
  'https://holymercy.com/static/img/pt-pt/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/pt-pt/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/pt-pt/soldiers-of-light.webp',
  'https://holymercy.com/static/img/pt-pt/spirit-dove.webp',
  'https://holymercy.com/static/img/pt-pt/spiritual-realms.webp',
  'https://holymercy.com/static/img/pt-pt/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/pt-pt/the-vision.webp',
  'https://holymercy.com/static/img/pt-pt/unconditional-love.webp',
  'https://holymercy.com/static/img/pt-pt/apple_touch_icon-64x64.webp',
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