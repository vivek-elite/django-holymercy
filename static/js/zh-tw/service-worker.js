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
  'https://holymercy.com/static/css/zh-tw/contact.css',
  'https://holymercy.com/static/css/zh-tw/styles.css',
  'https://holymercy.com/zh-tw/',
  'https://holymercy.com/zh-tw/the-vision',
  'https://holymercy.com/zh-tw/spiritual-realms',
  'https://holymercy.com/zh-tw/soldiers-of-light',
  'https://holymercy.com/zh-tw/guardian-angels',
  'https://holymercy.com/zh-tw/living-light',
  'https://holymercy.com/zh-tw/unconditional-love',
  'https://holymercy.com/zh-tw/heavenly-realms',
  'https://holymercy.com/zh-tw/about-us',
  'https://holymercy.com/ur/ebook',
  'https://holymercy.com/ur/login',
  'https://holymercy.com/ur/signup',
  'https://holymercy.com/zh-tw/share-the-faith',
  'https://holymercy.com/zh-tw/powerful-scripture',
  'https://holymercy.com/zh-tw/prayer-request',
  'https://holymercy.com/zh-tw/contact-us',
  'https://holymercy.com/zh-tw/terms',
  'https://holymercy.com/static/img/zh-tw/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/zh-tw/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/zh-tw/angel-applauding.webp',
  'https://holymercy.com/static/img/zh-tw/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/zh-tw/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/zh-tw/angel-praying.webp',
  'https://holymercy.com/static/img/zh-tw/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/zh-tw/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/zh-tw/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/zh-tw/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/zh-tw/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/zh-tw/back-to-top-link.webp',
  'https://holymercy.com/static/img/zh-tw/cogwheel-icon.webp',
  'https://holymercy.com/static/img/zh-tw/dove-stained-glass.webp',
  'https://holymercy.com/static/img/zh-tw/favicon.webp',
  'https://holymercy.com/static/img/zh-tw/heart-of-light.webp',
  'https://holymercy.com/static/img/zh-tw/heavenly-realms.webp',
  'https://holymercy.com/static/img/zh-tw/holymercy-logo.webp',
  'https://holymercy.com/static/img/zh-tw/icon-64.png',
  'https://holymercy.com/static/img/zh-tw/icon-128.png',
  'https://holymercy.com/static/img/zh-tw/icon-256.png',
  'https://holymercy.com/static/img/zh-tw/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/zh-tw/maskable_icon_192.png',
  'https://holymercy.com/static/img/zh-tw/maskable_icon_512.png',
  'https://holymercy.com/static/img/zh-tw/prayer-request.webp',
  'https://holymercy.com/static/img/zh-tw/prayer-request-meta.webp',
  'https://holymercy.com/static/img/zh-tw/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/zh-tw/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/zh-tw/soldiers-of-light.webp',
  'https://holymercy.com/static/img/zh-tw/spirit-dove.webp',
  'https://holymercy.com/static/img/zh-tw/spiritual-realms.webp',
  'https://holymercy.com/static/img/zh-tw/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/zh-tw/the-vision.webp',
  'https://holymercy.com/static/img/zh-tw/unconditional-love.webp',
  'https://holymercy.com/static/img/zh-tw/apple_touch_icon-64x64.webp',
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