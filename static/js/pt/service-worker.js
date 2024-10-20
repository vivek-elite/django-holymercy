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
  'https://holymercy.com/static/css/pt/contact.css',
  'https://holymercy.com/static/css/pt/styles.css',
  'https://holymercy.com/pt/',
  'https://holymercy.com/pt/the-vision',
  'https://holymercy.com/pt/spiritual-realms',
  'https://holymercy.com/pt/soldiers-of-light',
  'https://holymercy.com/pt/guardian-angels',
  'https://holymercy.com/pt/living-light',
  'https://holymercy.com/pt/unconditional-love',
  'https://holymercy.com/pt/heavenly-realms',
  'https://holymercy.com/pt/about-us',
  'https://holymercy.com/pt/ebook',
  'https://holymercy.com/pt/login',
  'https://holymercy.com/pt/signup',
  'https://holymercy.com/pt/share-the-faith',
  'https://holymercy.com/pt/powerful-scripture',
  'https://holymercy.com/pt/prayer-request',
  'https://holymercy.com/pt/contact-us',
  'https://holymercy.com/pt/terms',
  'https://holymercy.com/static/img/pt/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/pt/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/pt/angel-applauding.webp',
  'https://holymercy.com/static/img/pt/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/pt/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/pt/angel-praying.webp',
  'https://holymercy.com/static/img/pt/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/pt/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/pt/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/pt/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/pt/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/pt/back-to-top-link.webp',
  'https://holymercy.com/static/img/pt/cogwheel-icon.webp',
  'https://holymercy.com/static/img/pt/dove-stained-glass.webp',
  'https://holymercy.com/static/img/pt/favicon.webp',
  'https://holymercy.com/static/img/pt/heart-of-light.webp',
  'https://holymercy.com/static/img/pt/heavenly-realms.webp',
  'https://holymercy.com/static/img/pt/holymercy-logo.webp',
  'https://holymercy.com/static/img/pt/icon-64.png',
  'https://holymercy.com/static/img/pt/icon-128.png',
  'https://holymercy.com/static/img/pt/icon-256.png',
  'https://holymercy.com/static/img/pt/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/pt/maskable_icon_192.png',
  'https://holymercy.com/static/img/pt/maskable_icon_512.png',
  'https://holymercy.com/static/img/pt/prayer-request.webp',
  'https://holymercy.com/static/img/pt/prayer-request-meta.webp',
  'https://holymercy.com/static/img/pt/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/pt/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/pt/soldiers-of-light.webp',
  'https://holymercy.com/static/img/pt/spirit-dove.webp',
  'https://holymercy.com/static/img/pt/spiritual-realms.webp',
  'https://holymercy.com/static/img/pt/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/pt/the-vision.webp',
  'https://holymercy.com/static/img/pt/unconditional-love.webp',
  'https://holymercy.com/static/img/pt/apple_touch_icon-64x64.webp',
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