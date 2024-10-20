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
  'https://holymercy.com/static/css/ko/contact.css',
  'https://holymercy.com/static/css/ko/styles.css',
  'https://holymercy.com/ko/',
  'https://holymercy.com/ko/the-vision',
  'https://holymercy.com/ko/spiritual-realms',
  'https://holymercy.com/ko/soldiers-of-light',
  'https://holymercy.com/ko/guardian-angels',
  'https://holymercy.com/ko/living-light',
  'https://holymercy.com/ko/unconditional-love',
  'https://holymercy.com/ko/heavenly-realms',
  'https://holymercy.com/ko/about-us',
  'https://holymercy.com/ko/ebook',
  'https://holymercy.com/ko/login',
  'https://holymercy.com/ko/signup',
  'https://holymercy.com/ko/share-the-faith',
  'https://holymercy.com/ko/powerful-scripture',
  'https://holymercy.com/ko/prayer-request',
  'https://holymercy.com/ko/contact-us',
  'https://holymercy.com/ko/terms',
  'https://holymercy.com/static/img/ko/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/ko/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/ko/angel-applauding.webp',
  'https://holymercy.com/static/img/ko/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/ko/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/ko/angel-praying.webp',
  'https://holymercy.com/static/img/ko/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/ko/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/ko/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/ko/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/ko/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/ko/back-to-top-link.webp',
  'https://holymercy.com/static/img/ko/cogwheel-icon.webp',
  'https://holymercy.com/static/img/ko/dove-stained-glass.webp',
  'https://holymercy.com/static/img/ko/favicon.webp',
  'https://holymercy.com/static/img/ko/heart-of-light.webp',
  'https://holymercy.com/static/img/ko/heavenly-realms.webp',
  'https://holymercy.com/static/img/ko/holymercy-logo.webp',
  'https://holymercy.com/static/img/ko/icon-64.png',
  'https://holymercy.com/static/img/ko/icon-128.png',
  'https://holymercy.com/static/img/ko/icon-256.png',
  'https://holymercy.com/static/img/ko/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/ko/maskable_icon_192.png',
  'https://holymercy.com/static/img/ko/maskable_icon_512.png',
  'https://holymercy.com/static/img/ko/prayer-request.webp',
  'https://holymercy.com/static/img/ko/prayer-request-meta.webp',
  'https://holymercy.com/static/img/ko/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/ko/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/ko/soldiers-of-light.webp',
  'https://holymercy.com/static/img/ko/spirit-dove.webp',
  'https://holymercy.com/static/img/ko/spiritual-realms.webp',
  'https://holymercy.com/static/img/ko/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/ko/the-vision.webp',
  'https://holymercy.com/static/img/ko/unconditional-love.webp',
  'https://holymercy.com/static/img/ko/apple_touch_icon-64x64.webp',
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