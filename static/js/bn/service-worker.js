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
  'https://holymercy.com/static/css/bn/contact.css',
  'https://holymercy.com/static/css/bn/styles.css',
  'https://holymercy.com/bn/',
  'https://holymercy.com/bn/the-vision',
  'https://holymercy.com/bn/spiritual-realms',
  'https://holymercy.com/bn/soldiers-of-light',
  'https://holymercy.com/bn/guardian-angels',
  'https://holymercy.com/bn/living-light',
  'https://holymercy.com/bn/unconditional-love',
  'https://holymercy.com/bn/heavenly-realms',
  'https://holymercy.com/bn/about-us',
  'https://holymercy.com/bn/ebook',
  'https://holymercy.com/bn/login',
  'https://holymercy.com/bn/signup',
  'https://holymercy.com/bn/share-the-faith',
  'https://holymercy.com/bn/powerful-scripture',
  'https://holymercy.com/bn/prayer-request',
  'https://holymercy.com/bn/contact-us',
  'https://holymercy.com/bn/terms',
  'https://holymercy.com/static/img/bn/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/bn/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/bn/angel-applauding.webp',
  'https://holymercy.com/static/img/bn/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/bn/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/bn/angel-praying.webp',
  'https://holymercy.com/static/img/bn/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/bn/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/bn/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/bn/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/bn/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/bn/back-to-top-link.webp',
  'https://holymercy.com/static/img/bn/cogwheel-icon.webp',
  'https://holymercy.com/static/img/bn/dove-stained-glass.webp',
  'https://holymercy.com/static/img/bn/favicon.webp',
  'https://holymercy.com/static/img/bn/heart-of-light.webp',
  'https://holymercy.com/static/img/bn/heavenly-realms.webp',
  'https://holymercy.com/static/img/bn/holymercy-logo.webp',
  'https://holymercy.com/static/img/bn/icon-64.png',
  'https://holymercy.com/static/img/bn/icon-128.png',
  'https://holymercy.com/static/img/bn/icon-256.png',
  'https://holymercy.com/static/img/bn/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/bn/maskable_icon_192.png',
  'https://holymercy.com/static/img/bn/maskable_icon_512.png',
  'https://holymercy.com/static/img/bn/prayer-request.webp',
  'https://holymercy.com/static/img/bn/prayer-request-meta.webp',
  'https://holymercy.com/static/img/bn/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/bn/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/bn/soldiers-of-light.webp',
  'https://holymercy.com/static/img/bn/spirit-dove.webp',
  'https://holymercy.com/static/img/bn/spiritual-realms.webp',
  'https://holymercy.com/static/img/bn/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/bn/the-vision.webp',
  'https://holymercy.com/static/img/bn/unconditional-love.webp',
  'https://holymercy.com/static/img/bn/apple_touch_icon-64x64.webp',
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