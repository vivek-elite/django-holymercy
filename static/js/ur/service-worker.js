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
  'https://holymercy.com/static/css/ur/contact.css',
  'https://holymercy.com/static/css/ur/styles.css',
  'https://holymercy.com/ur/',
  'https://holymercy.com/ur/the-vision',
  'https://holymercy.com/ur/spiritual-realms',
  'https://holymercy.com/ur/soldiers-of-light',
  'https://holymercy.com/ur/guardian-angels',
  'https://holymercy.com/ur/living-light',
  'https://holymercy.com/ur/unconditional-love',
  'https://holymercy.com/ur/heavenly-realms',
  'https://holymercy.com/ur/about-us',
  'https://holymercy.com/ur/ebook',
  'https://holymercy.com/ur/login',
  'https://holymercy.com/ur/signup',
  'https://holymercy.com/ur/share-the-faith',
  'https://holymercy.com/ur/powerful-scripture',
  'https://holymercy.com/ur/prayer-request',
  'https://holymercy.com/ur/contact-us',
  'https://holymercy.com/ur/terms',
  'https://holymercy.com/static/img/ur/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/ur/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/ur/angel-applauding.webp',
  'https://holymercy.com/static/img/ur/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/ur/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/ur/angel-praying.webp',
  'https://holymercy.com/static/img/ur/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/ur/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/ur/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/ur/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/ur/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/ur/back-to-top-link.webp',
  'https://holymercy.com/static/img/ur/cogwheel-icon.webp',
  'https://holymercy.com/static/img/ur/dove-stained-glass.webp',
  'https://holymercy.com/static/img/ur/favicon.webp',
  'https://holymercy.com/static/img/ur/heart-of-light.webp',
  'https://holymercy.com/static/img/ur/heavenly-realms.webp',
  'https://holymercy.com/static/img/ur/holymercy-logo.webp',
  'https://holymercy.com/static/img/ur/icon-64.png',
  'https://holymercy.com/static/img/ur/icon-128.png',
  'https://holymercy.com/static/img/ur/icon-256.png',
  'https://holymercy.com/static/img/ur/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/ur/maskable_icon_192.png',
  'https://holymercy.com/static/img/ur/maskable_icon_512.png',
  'https://holymercy.com/static/img/ur/prayer-request.webp',
  'https://holymercy.com/static/img/ur/prayer-request-meta.webp',
  'https://holymercy.com/static/img/ur/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/ur/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/ur/soldiers-of-light.webp',
  'https://holymercy.com/static/img/ur/spirit-dove.webp',
  'https://holymercy.com/static/img/ur/spiritual-realms.webp',
  'https://holymercy.com/static/img/ur/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/ur/the-vision.webp',
  'https://holymercy.com/static/img/ur/unconditional-love.webp',
  'https://holymercy.com/static/img/ur/apple_touch_icon-64x64.webp',
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