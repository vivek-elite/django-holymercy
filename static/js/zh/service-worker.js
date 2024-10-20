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
  'https://holymercy.com/static/css/zh/contact.css',
  'https://holymercy.com/static/css/zh/styles.css',
  'https://holymercy.com/zh/',
  'https://holymercy.com/zh/the-vision',
  'https://holymercy.com/zh/spiritual-realms',
  'https://holymercy.com/zh/soldiers-of-light',
  'https://holymercy.com/zh/guardian-angels',
  'https://holymercy.com/zh/living-light',
  'https://holymercy.com/zh/unconditional-love',
  'https://holymercy.com/zh/heavenly-realms',
  'https://holymercy.com/zh/about-us',
  'https://holymercy.com/zh/ebook',
  'https://holymercy.com/zh/login',
  'https://holymercy.com/zh/signup',
  'https://holymercy.com/zh/share-the-faith',
  'https://holymercy.com/zh/powerful-scripture',
  'https://holymercy.com/zh/prayer-request',
  'https://holymercy.com/zh/contact-us',
  'https://holymercy.com/zh/terms',
  'https://holymercy.com/static/img/zh/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/zh/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/zh/angel-applauding.webp',
  'https://holymercy.com/static/img/zh/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/zh/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/zh/angel-praying.webp',
  'https://holymercy.com/static/img/zh/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/zh/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/zh/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/zh/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/zh/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/zh/back-to-top-link.webp',
  'https://holymercy.com/static/img/zh/cogwheel-icon.webp',
  'https://holymercy.com/static/img/zh/dove-stained-glass.webp',
  'https://holymercy.com/static/img/zh/favicon.webp',
  'https://holymercy.com/static/img/zh/heart-of-light.webp',
  'https://holymercy.com/static/img/zh/heavenly-realms.webp',
  'https://holymercy.com/static/img/zh/holymercy-logo.webp',
  'https://holymercy.com/static/img/zh/icon-64.png',
  'https://holymercy.com/static/img/zh/icon-128.png',
  'https://holymercy.com/static/img/zh/icon-256.png',
  'https://holymercy.com/static/img/zh/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/zh/maskable_icon_192.png',
  'https://holymercy.com/static/img/zh/maskable_icon_512.png',
  'https://holymercy.com/static/img/zh/prayer-request.webp',
  'https://holymercy.com/static/img/zh/prayer-request-meta.webp',
  'https://holymercy.com/static/img/zh/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/zh/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/zh/soldiers-of-light.webp',
  'https://holymercy.com/static/img/zh/spirit-dove.webp',
  'https://holymercy.com/static/img/zh/spiritual-realms.webp',
  'https://holymercy.com/static/img/zh/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/zh/the-vision.webp',
  'https://holymercy.com/static/img/zh/unconditional-love.webp',
  'https://holymercy.com/static/img/zh/apple_touch_icon-64x64.webp',
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