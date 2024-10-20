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
  'https://holymercy.com/static/css/hi/contact.css',
  'https://holymercy.com/static/css/hi/styles.css',
  'https://holymercy.com/hi/',
  'https://holymercy.com/hi/the-vision',
  'https://holymercy.com/hi/spiritual-realms',
  'https://holymercy.com/hi/soldiers-of-light',
  'https://holymercy.com/hi/guardian-angels',
  'https://holymercy.com/hi/living-light',
  'https://holymercy.com/hi/unconditional-love',
  'https://holymercy.com/hi/heavenly-realms',
  'https://holymercy.com/hi/about-us',
  'https://holymercy.com/hi/ebook',
  'https://holymercy.com/hi/login',
  'https://holymercy.com/hi/signup',
  'https://holymercy.com/hi/share-the-faith',
  'https://holymercy.com/hi/powerful-scripture',
  'https://holymercy.com/hi/prayer-request',
  'https://holymercy.com/hi/contact-us',
  'https://holymercy.com/hi/terms',
  'https://holymercy.com/static/img/hi/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/hi/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/hi/angel-applauding.webp',
  'https://holymercy.com/static/img/hi/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/hi/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/hi/angel-praying.webp',
  'https://holymercy.com/static/img/hi/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/hi/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/hi/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/hi/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/hi/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/hi/back-to-top-link.webp',
  'https://holymercy.com/static/img/hi/cogwheel-icon.webp',
  'https://holymercy.com/static/img/hi/dove-stained-glass.webp',
  'https://holymercy.com/static/img/hi/favicon.webp',
  'https://holymercy.com/static/img/hi/heart-of-light.webp',
  'https://holymercy.com/static/img/hi/heavenly-realms.webp',
  'https://holymercy.com/static/img/hi/holymercy-logo.webp',
  'https://holymercy.com/static/img/hi/icon-64.png',
  'https://holymercy.com/static/img/hi/icon-128.png',
  'https://holymercy.com/static/img/hi/icon-256.png',
  'https://holymercy.com/static/img/hi/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/hi/maskable_icon_192.png',
  'https://holymercy.com/static/img/hi/maskable_icon_512.png',
  'https://holymercy.com/static/img/hi/prayer-request.webp',
  'https://holymercy.com/static/img/hi/prayer-request-meta.webp',
  'https://holymercy.com/static/img/hi/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/hi/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/hi/soldiers-of-light.webp',
  'https://holymercy.com/static/img/hi/spirit-dove.webp',
  'https://holymercy.com/static/img/hi/spiritual-realms.webp',
  'https://holymercy.com/static/img/hi/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/hi/the-vision.webp',
  'https://holymercy.com/static/img/hi/unconditional-love.webp',
  'https://holymercy.com/static/img/hi/apple_touch_icon-64x64.webp',
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