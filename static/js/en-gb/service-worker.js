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
  'https://holymercy.com/static/css/en-gb/contact.css',
  'https://holymercy.com/static/css/en-gb/styles.css',
  'https://holymercy.com/en-gb/',
  'https://holymercy.com/en-gb/the-vision',
  'https://holymercy.com/en-gb/spiritual-realms',
  'https://holymercy.com/en-gb/soldiers-of-light',
  'https://holymercy.com/en-gb/guardian-angels',
  'https://holymercy.com/en-gb/living-light',
  'https://holymercy.com/en-gb/unconditional-love',
  'https://holymercy.com/en-gb/heavenly-realms',
  'https://holymercy.com/en-gb/about-us',
  'https://holymercy.com/en-gb/ebook',
  'https://holymercy.com/en-gb/login',
  'https://holymercy.com/en-gb/signup',
  'https://holymercy.com/en-gb/share-the-faith',
  'https://holymercy.com/en-gb/powerful-scripture',
  'https://holymercy.com/en-gb/prayer-request',
  'https://holymercy.com/en-gb/contact-us',
  'https://holymercy.com/en-gb/terms',
  'https://holymercy.com/static/img/en-gb/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/en-gb/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/en-gb/angel-applauding.webp',
  'https://holymercy.com/static/img/en-gb/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/en-gb/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/en-gb/angel-praying.webp',
  'https://holymercy.com/static/img/en-gb/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/en-gb/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/en-gb/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/en-gb/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/en-gb/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/en-gb/back-to-top-link.webp',
  'https://holymercy.com/static/img/en-gb/cogwheel-icon.webp',
  'https://holymercy.com/static/img/en-gb/dove-stained-glass.webp',
  'https://holymercy.com/static/img/en-gb/favicon.webp',
  'https://holymercy.com/static/img/en-gb/heart-of-light.webp',
  'https://holymercy.com/static/img/en-gb/heavenly-realms.webp',
  'https://holymercy.com/static/img/en-gb/holymercy-logo.webp',
  'https://holymercy.com/static/img/en-gb/icon-64.png',
  'https://holymercy.com/static/img/en-gb/icon-128.png',
  'https://holymercy.com/static/img/en-gb/icon-256.png',
  'https://holymercy.com/static/img/en-gb/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/en-gb/maskable_icon_192.png',
  'https://holymercy.com/static/img/en-gb/maskable_icon_512.png',
  'https://holymercy.com/static/img/en-gb/prayer-request.webp',
  'https://holymercy.com/static/img/en-gb/prayer-request-meta.webp',
  'https://holymercy.com/static/img/en-gb/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/en-gb/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/en-gb/soldiers-of-light.webp',
  'https://holymercy.com/static/img/en-gb/spirit-dove.webp',
  'https://holymercy.com/static/img/en-gb/spiritual-realms.webp',
  'https://holymercy.com/static/img/en-gb/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/en-gb/the-vision.webp',
  'https://holymercy.com/static/img/en-gb/unconditional-love.webp',
  'https://holymercy.com/static/img/en-gb/apple_touch_icon-64x64.webp',
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