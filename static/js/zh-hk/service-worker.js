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
  'https://holymercy.com/static/css/zh-hk/contact.css',
  'https://holymercy.com/static/css/zh-hk/styles.css',
  'https://holymercy.com/zh-hk/',
  'https://holymercy.com/zh-hk/the-vision',
  'https://holymercy.com/zh-hk/spiritual-realms',
  'https://holymercy.com/zh-hk/soldiers-of-light',
  'https://holymercy.com/zh-hk/guardian-angels',
  'https://holymercy.com/zh-hk/living-light',
  'https://holymercy.com/zh-hk/unconditional-love',
  'https://holymercy.com/zh-hk/heavenly-realms',
  'https://holymercy.com/zh-hk/about-us',
  'https://holymercy.com/zh-hk/ebook',
  'https://holymercy.com/zh-hk/login',
  'https://holymercy.com/zh-hk/signup',
  'https://holymercy.com/zh-hk/share-the-faith',
  'https://holymercy.com/zh-hk/powerful-scripture',
  'https://holymercy.com/zh-hk/prayer-request',
  'https://holymercy.com/zh-hk/contact-us',
  'https://holymercy.com/zh-hk/terms',
  'https://holymercy.com/static/img/zh-hk/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/zh-hk/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/zh-hk/angel-applauding.webp',
  'https://holymercy.com/static/img/zh-hk/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/zh-hk/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/zh-hk/angel-praying.webp',
  'https://holymercy.com/static/img/zh-hk/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/zh-hk/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/zh-hk/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/zh-hk/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/zh-hk/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/zh-hk/back-to-top-link.webp',
  'https://holymercy.com/static/img/zh-hk/cogwheel-icon.webp',
  'https://holymercy.com/static/img/zh-hk/dove-stained-glass.webp',
  'https://holymercy.com/static/img/zh-hk/favicon.webp',
  'https://holymercy.com/static/img/zh-hk/heart-of-light.webp',
  'https://holymercy.com/static/img/zh-hk/heavenly-realms.webp',
  'https://holymercy.com/static/img/zh-hk/holymercy-logo.webp',
  'https://holymercy.com/static/img/zh-hk/icon-64.png',
  'https://holymercy.com/static/img/zh-hk/icon-128.png',
  'https://holymercy.com/static/img/zh-hk/icon-256.png',
  'https://holymercy.com/static/img/zh-hk/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/zh-hk/maskable_icon_192.png',
  'https://holymercy.com/static/img/zh-hk/maskable_icon_512.png',
  'https://holymercy.com/static/img/zh-hk/prayer-request.webp',
  'https://holymercy.com/static/img/zh-hk/prayer-request-meta.webp',
  'https://holymercy.com/static/img/zh-hk/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/zh-hk/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/zh-hk/soldiers-of-light.webp',
  'https://holymercy.com/static/img/zh-hk/spirit-dove.webp',
  'https://holymercy.com/static/img/zh-hk/spiritual-realms.webp',
  'https://holymercy.com/static/img/zh-hk/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/zh-hk/the-vision.webp',
  'https://holymercy.com/static/img/zh-hk/unconditional-love.webp',
  'https://holymercy.com/static/img/zh-hk/apple_touch_icon-64x64.webp',
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