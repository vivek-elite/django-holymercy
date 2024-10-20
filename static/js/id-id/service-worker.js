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
  'https://holymercy.com/static/css/id-id/contact.css',
  'https://holymercy.com/static/css/id-id/styles.css',
  'https://holymercy.com/id-id/',
  'https://holymercy.com/id-id/the-vision',
  'https://holymercy.com/id-id/spiritual-realms',
  'https://holymercy.com/id-id/soldiers-of-light',
  'https://holymercy.com/id-id/guardian-angels',
  'https://holymercy.com/id-id/living-light',
  'https://holymercy.com/id-id/unconditional-love',
  'https://holymercy.com/id-id/heavenly-realms',
  'https://holymercy.com/id-id/about-us',
  'https://holymercy.com/id-id/ebook',
  'https://holymercy.com/id-id/login',
  'https://holymercy.com/id-id/signup',
  'https://holymercy.com/id-id/share-the-faith',
  'https://holymercy.com/id-id/powerful-scripture',
  'https://holymercy.com/id-id/prayer-request',
  'https://holymercy.com/id-id/contact-us',
  'https://holymercy.com/id-id/terms',
  'https://holymercy.com/static/img/id-id/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/id-id/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/id-id/angel-applauding.webp',
  'https://holymercy.com/static/img/id-id/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/id-id/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/id-id/angel-praying.webp',
  'https://holymercy.com/static/img/id-id/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/id-id/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/id-id/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/id-id/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/id-id/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/id-id/back-to-top-link.webp',
  'https://holymercy.com/static/img/id-id/cogwheel-icon.webp',
  'https://holymercy.com/static/img/id-id/dove-stained-glass.webp',
  'https://holymercy.com/static/img/id-id/favicon.webp',
  'https://holymercy.com/static/img/id-id/heart-of-light.webp',
  'https://holymercy.com/static/img/id-id/heavenly-realms.webp',
  'https://holymercy.com/static/img/id-id/holymercy-logo.webp',
  'https://holymercy.com/static/img/id-id/icon-64.png',
  'https://holymercy.com/static/img/id-id/icon-128.png',
  'https://holymercy.com/static/img/id-id/icon-256.png',
  'https://holymercy.com/static/img/id-id/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/id-id/maskable_icon_192.png',
  'https://holymercy.com/static/img/id-id/maskable_icon_512.png',
  'https://holymercy.com/static/img/id-id/prayer-request.webp',
  'https://holymercy.com/static/img/id-id/prayer-request-meta.webp',
  'https://holymercy.com/static/img/id-id/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/id-id/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/id-id/soldiers-of-light.webp',
  'https://holymercy.com/static/img/id-id/spirit-dove.webp',
  'https://holymercy.com/static/img/id-id/spiritual-realms.webp',
  'https://holymercy.com/static/img/id-id/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/id-id/the-vision.webp',
  'https://holymercy.com/static/img/id-id/unconditional-love.webp',
  'https://holymercy.com/static/img/id-id/apple_touch_icon-64x64.webp',
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