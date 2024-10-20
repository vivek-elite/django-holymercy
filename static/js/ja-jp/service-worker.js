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
  'https://holymercy.com/static/css/ja-jp/contact.css',
  'https://holymercy.com/static/css/ja-jp/styles.css',
  'https://holymercy.com/ja-jp/',
  'https://holymercy.com/ja-jp/the-vision',
  'https://holymercy.com/ja-jp/spiritual-realms',
  'https://holymercy.com/ja-jp/soldiers-of-light',
  'https://holymercy.com/ja-jp/guardian-angels',
  'https://holymercy.com/ja-jp/living-light',
  'https://holymercy.com/ja-jp/unconditional-love',
  'https://holymercy.com/ja-jp/heavenly-realms',
  'https://holymercy.com/ja-jp/about-us',
  'https://holymercy.com/ja-jp/ebook',
  'https://holymercy.com/ja-jp/login',
  'https://holymercy.com/ja-jp/signup',
  'https://holymercy.com/ja-jp/share-the-faith',
  'https://holymercy.com/ja-jp/powerful-scripture',
  'https://holymercy.com/ja-jp/prayer-request',
  'https://holymercy.com/ja-jp/contact-us',
  'https://holymercy.com/ja-jp/terms',
  'https://holymercy.com/static/img/ja-jp/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/ja-jp/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/ja-jp/angel-applauding.webp',
  'https://holymercy.com/static/img/ja-jp/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/ja-jp/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/ja-jp/angel-praying.webp',
  'https://holymercy.com/static/img/ja-jp/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/ja-jp/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/ja-jp/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/ja-jp/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/ja-jp/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/ja-jp/back-to-top-link.webp',
  'https://holymercy.com/static/img/ja-jp/cogwheel-icon.webp',
  'https://holymercy.com/static/img/ja-jp/dove-stained-glass.webp',
  'https://holymercy.com/static/img/ja-jp/favicon.webp',
  'https://holymercy.com/static/img/ja-jp/heart-of-light.webp',
  'https://holymercy.com/static/img/ja-jp/heavenly-realms.webp',
  'https://holymercy.com/static/img/ja-jp/holymercy-logo.webp',
  'https://holymercy.com/static/img/ja-jp/icon-64.png',
  'https://holymercy.com/static/img/ja-jp/icon-128.png',
  'https://holymercy.com/static/img/ja-jp/icon-256.png',
  'https://holymercy.com/static/img/ja-jp/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/ja-jp/maskable_icon_192.png',
  'https://holymercy.com/static/img/ja-jp/maskable_icon_512.png',
  'https://holymercy.com/static/img/ja-jp/prayer-request.webp',
  'https://holymercy.com/static/img/ja-jp/prayer-request-meta.webp',
  'https://holymercy.com/static/img/ja-jp/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/ja-jp/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/ja-jp/soldiers-of-light.webp',
  'https://holymercy.com/static/img/ja-jp/spirit-dove.webp',
  'https://holymercy.com/static/img/ja-jp/spiritual-realms.webp',
  'https://holymercy.com/static/img/ja-jp/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/ja-jp/the-vision.webp',
  'https://holymercy.com/static/img/ja-jp/unconditional-love.webp',
  'https://holymercy.com/static/img/ja-jp/apple_touch_icon-64x64.webp',
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