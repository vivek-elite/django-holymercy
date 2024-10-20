// Check the browser to make sure it supports service workers
if('serviceWorker' in navigator) {
    navigator.serviceWorker
      // Register the path to the service worker file
      .register('https://holymercy.com/static/js/core/service-worker.js')
      //.register('http://127.0.0.1:8000/static/service-worker.js') tester 01-01-24
      .then(function() { console.log("Service Worker Registered"); });
  }
 