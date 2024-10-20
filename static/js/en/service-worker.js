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
  'https://holymercy.com/static/css/en/contact.css',
  'https://holymercy.com/static/css/en/styles.css',
  'https://holymercy.com/en/',
  'https://holymercy.com/en/the-vision',
  'https://holymercy.com/en/spiritual-realms',
  'https://holymercy.com/en/soldiers-of-light',
  'https://holymercy.com/en/guardian-angels',
  'https://holymercy.com/en/living-light',
  'https://holymercy.com/en/unconditional-love',
  'https://holymercy.com/en/heavenly-realms',
  'https://holymercy.com/en/about-us',
  'https://holymercy.com/en/ebook',
  'https://holymercy.com/en/login',
  'https://holymercy.com/en/signup',
  'https://holymercy.com/en/share-the-faith',
  'https://holymercy.com/en/powerful-scripture',
  'https://holymercy.com/en/prayer-request',
  'https://holymercy.com/en/contact-us',
  'https://holymercy.com/en/terms',
  'https://holymercy.com/static/img/en/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/en/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/en/angel-applauding.webp',
  'https://holymercy.com/static/img/en/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/en/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/en/angel-praying.webp',
  'https://holymercy.com/static/img/en/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/en/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/en/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/en/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/en/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/en/back-to-top-link.webp',
  'https://holymercy.com/static/img/en/cogwheel-icon.webp',
  'https://holymercy.com/static/img/en/dove-stained-glass.webp',
  'https://holymercy.com/static/img/en/favicon.webp',
  'https://holymercy.com/static/img/en/heart-of-light.webp',
  'https://holymercy.com/static/img/en/heavenly-realms.webp',
  'https://holymercy.com/static/img/en/holymercy-logo.webp',
  'https://holymercy.com/static/img/en/icon-64.png',
  'https://holymercy.com/static/img/en/icon-128.png',
  'https://holymercy.com/static/img/en/icon-256.png',
  'https://holymercy.com/static/img/en/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/en/maskable_icon_192.png',
  'https://holymercy.com/static/img/en/maskable_icon_512.png',
  'https://holymercy.com/static/img/en/prayer-request.webp',
  'https://holymercy.com/static/img/en/prayer-request-meta.webp',
  'https://holymercy.com/static/img/en/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/en/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/en/soldiers-of-light.webp',
  'https://holymercy.com/static/img/en/spirit-dove.webp',
  'https://holymercy.com/static/img/en/spiritual-realms.webp',
  'https://holymercy.com/static/img/en/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/en/the-vision.webp',
  'https://holymercy.com/static/img/en/unconditional-love.webp',
  'https://holymercy.com/static/img/en/apple_touch_icon-64x64.webp',
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