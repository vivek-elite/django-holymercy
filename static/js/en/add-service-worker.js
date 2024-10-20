// Check the browser to make sure it supports service workers
if('serviceWorker' in navigator) {
    navigator.serviceWorker
      // Register the path to the service worker file
      .register('https://holymercy.com/static/js/en/service-worker.js')
      .then(function() { console.log("Service Worker Registered"); });
  }
 