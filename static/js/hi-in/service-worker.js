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
  'https://holymercy.com/static/css/hi-in/contact.css',
  'https://holymercy.com/static/css/hi-in/styles.css',
  'https://holymercy.com/hi-in/',
  'https://holymercy.com/hi-in/the-vision',
  'https://holymercy.com/hi-in/spiritual-realms',
  'https://holymercy.com/hi-in/soldiers-of-light',
  'https://holymercy.com/hi-in/guardian-angels',
  'https://holymercy.com/hi-in/living-light',
  'https://holymercy.com/hi-in/unconditional-love',
  'https://holymercy.com/hi-in/heavenly-realms',
  'https://holymercy.com/hi-in/about-us',
  'https://holymercy.com/hi-in/ebook',
  'https://holymercy.com/hi-in/login',
  'https://holymercy.com/hi-in/signup',
  'https://holymercy.com/hi-in/share-the-faith',
  'https://holymercy.com/hi-in/powerful-scripture',
  'https://holymercy.com/hi-in/prayer-request',
  'https://holymercy.com/hi-in/contact-us',
  'https://holymercy.com/hi-in/terms',
  'https://holymercy.com/static/img/hi-in/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/hi-in/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/hi-in/angel-applauding.webp',
  'https://holymercy.com/static/img/hi-in/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/hi-in/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/hi-in/angel-praying.webp',
  'https://holymercy.com/static/img/hi-in/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/hi-in/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/hi-in/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/hi-in/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/hi-in/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/hi-in/back-to-top-link.webp',
  'https://holymercy.com/static/img/hi-in/cogwheel-icon.webp',
  'https://holymercy.com/static/img/hi-in/dove-stained-glass.webp',
  'https://holymercy.com/static/img/hi-in/favicon.webp',
  'https://holymercy.com/static/img/hi-in/heart-of-light.webp',
  'https://holymercy.com/static/img/hi-in/heavenly-realms.webp',
  'https://holymercy.com/static/img/hi-in/holymercy-logo.webp',
  'https://holymercy.com/static/img/hi-in/icon-64.png',
  'https://holymercy.com/static/img/hi-in/icon-128.png',
  'https://holymercy.com/static/img/hi-in/icon-256.png',
  'https://holymercy.com/static/img/hi-in/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/hi-in/maskable_icon_192.png',
  'https://holymercy.com/static/img/hi-in/maskable_icon_512.png',
  'https://holymercy.com/static/img/hi-in/prayer-request.webp',
  'https://holymercy.com/static/img/hi-in/prayer-request-meta.webp',
  'https://holymercy.com/static/img/hi-in/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/hi-in/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/hi-in/soldiers-of-light.webp',
  'https://holymercy.com/static/img/hi-in/spirit-dove.webp',
  'https://holymercy.com/static/img/hi-in/spiritual-realms.webp',
  'https://holymercy.com/static/img/hi-in/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/hi-in/the-vision.webp',
  'https://holymercy.com/static/img/hi-in/unconditional-love.webp',
  'https://holymercy.com/static/img/hi-in/apple_touch_icon-64x64.webp',
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