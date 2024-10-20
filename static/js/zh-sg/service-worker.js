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
  'https://holymercy.com/static/css/zh-sg/contact.css',
  'https://holymercy.com/static/css/zh-sg/styles.css',
  'https://holymercy.com/zh-sg/',
  'https://holymercy.com/zh-sg/the-vision',
  'https://holymercy.com/zh-sg/spiritual-realms',
  'https://holymercy.com/zh-sg/soldiers-of-light',
  'https://holymercy.com/zh-sg/guardian-angels',
  'https://holymercy.com/zh-sg/living-light',
  'https://holymercy.com/zh-sg/unconditional-love',
  'https://holymercy.com/zh-sg/heavenly-realms',
  'https://holymercy.com/zh-sg/about-us',
  'https://holymercy.com/zh-sg/ebook',
  'https://holymercy.com/zh-sg/login',
  'https://holymercy.com/zh-sg/signup',
  'https://holymercy.com/zh-sg/share-the-faith',
  'https://holymercy.com/zh-sg/powerful-scripture',
  'https://holymercy.com/zh-sg/prayer-request',
  'https://holymercy.com/zh-sg/contact-us',
  'https://holymercy.com/zh-sg/terms',
  'https://holymercy.com/static/img/zh-sg/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/zh-sg/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/zh-sg/angel-applauding.webp',
  'https://holymercy.com/static/img/zh-sg/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/zh-sg/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/zh-sg/angel-praying.webp',
  'https://holymercy.com/static/img/zh-sg/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/zh-sg/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/zh-sg/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/zh-sg/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/zh-sg/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/zh-sg/back-to-top-link.webp',
  'https://holymercy.com/static/img/zh-sg/cogwheel-icon.webp',
  'https://holymercy.com/static/img/zh-sg/dove-stained-glass.webp',
  'https://holymercy.com/static/img/zh-sg/favicon.webp',
  'https://holymercy.com/static/img/zh-sg/heart-of-light.webp',
  'https://holymercy.com/static/img/zh-sg/heavenly-realms.webp',
  'https://holymercy.com/static/img/zh-sg/holymercy-logo.webp',
  'https://holymercy.com/static/img/zh-sg/icon-64.png',
  'https://holymercy.com/static/img/zh-sg/icon-128.png',
  'https://holymercy.com/static/img/zh-sg/icon-256.png',
  'https://holymercy.com/static/img/zh-sg/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/zh-sg/maskable_icon_192.png',
  'https://holymercy.com/static/img/zh-sg/maskable_icon_512.png',
  'https://holymercy.com/static/img/zh-sg/prayer-request.webp',
  'https://holymercy.com/static/img/zh-sg/prayer-request-meta.webp',
  'https://holymercy.com/static/img/zh-sg/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/zh-sg/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/zh-sg/soldiers-of-light.webp',
  'https://holymercy.com/static/img/zh-sg/spirit-dove.webp',
  'https://holymercy.com/static/img/zh-sg/spiritual-realms.webp',
  'https://holymercy.com/static/img/zh-sg/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/zh-sg/the-vision.webp',
  'https://holymercy.com/static/img/zh-sg/unconditional-love.webp',
  'https://holymercy.com/static/img/zh-sg/apple_touch_icon-64x64.webp',
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