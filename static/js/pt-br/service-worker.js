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
  'https://holymercy.com/static/css/pt-br/contact.css',
  'https://holymercy.com/static/css/pt-br/styles.css',
  'https://holymercy.com/pt-br/',
  'https://holymercy.com/pt-br/the-vision',
  'https://holymercy.com/pt-br/spiritual-realms',
  'https://holymercy.com/pt-br/soldiers-of-light',
  'https://holymercy.com/pt-br/guardian-angels',
  'https://holymercy.com/pt-br/living-light',
  'https://holymercy.com/pt-br/unconditional-love',
  'https://holymercy.com/pt-br/heavenly-realms',
  'https://holymercy.com/pt-br/about-us',
  'https://holymercy.com/pt-br/ebook',
  'https://holymercy.com/pt-br/login',
  'https://holymercy.com/pt-br/signup',
  'https://holymercy.com/pt-br/share-the-faith',
  'https://holymercy.com/pt-br/powerful-scripture',
  'https://holymercy.com/pt-br/prayer-request',
  'https://holymercy.com/pt-br/contact-us',
  'https://holymercy.com/pt-br/terms',
  'https://holymercy.com/static/img/pt-br/stairway-to-heaven.webp',
  'https://holymercy.com/static/img/pt-br/stairway-to-heaven-meta.webp',
  'https://holymercy.com/static/img/pt-br/angel-applauding.webp',
  'https://holymercy.com/static/img/pt-br/angel-from-christ-in-majesty-with-saints.webp',
  'https://holymercy.com/static/img/pt-br/angel-from-christ-meta.webp',
  'https://holymercy.com/static/img/pt-br/angel-praying.webp',
  'https://holymercy.com/static/img/pt-br/angel-with-crossed-hands.webp',
  'https://holymercy.com/static/img/pt-br/angel-with-open-arms.webp',
  'https://holymercy.com/static/img/pt-br/apple_touch_icon-48x48.webp',
  'https://holymercy.com/static/img/pt-br/apple_touch_icon-128x128.webp',
  'https://holymercy.com/static/img/pt-br/apple_touch_icon-256x256.webp',
  'https://holymercy.com/static/img/pt-br/back-to-top-link.webp',
  'https://holymercy.com/static/img/pt-br/cogwheel-icon.webp',
  'https://holymercy.com/static/img/pt-br/dove-stained-glass.webp',
  'https://holymercy.com/static/img/pt-br/favicon.webp',
  'https://holymercy.com/static/img/pt-br/heart-of-light.webp',
  'https://holymercy.com/static/img/pt-br/heavenly-realms.webp',
  'https://holymercy.com/static/img/pt-br/holymercy-logo.webp',
  'https://holymercy.com/static/img/pt-br/icon-64.png',
  'https://holymercy.com/static/img/pt-br/icon-128.png',
  'https://holymercy.com/static/img/pt-br/icon-256.png',
  'https://holymercy.com/static/img/pt-br/leftside-candle-gif.webp',
  'https://holymercy.com/static/img/pt-br/maskable_icon_192.png',
  'https://holymercy.com/static/img/pt-br/maskable_icon_512.png',
  'https://holymercy.com/static/img/pt-br/prayer-request.webp',
  'https://holymercy.com/static/img/pt-br/prayer-request-meta.webp',
  'https://holymercy.com/static/img/pt-br/rightside-candle-gif.webp',
  'https://holymercy.com/static/img/pt-br/rose-crowned-angel.webp',
  'https://holymercy.com/static/img/pt-br/soldiers-of-light.webp',
  'https://holymercy.com/static/img/pt-br/spirit-dove.webp',
  'https://holymercy.com/static/img/pt-br/spiritual-realms.webp',
  'https://holymercy.com/static/img/pt-br/the-circle-of-love-bookcover.webp',
  'https://holymercy.com/static/img/pt-br/the-vision.webp',
  'https://holymercy.com/static/img/pt-br/unconditional-love.webp',
  'https://holymercy.com/static/img/pt-br/apple_touch_icon-64x64.webp',
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