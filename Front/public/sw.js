// const filesToCache = [
//     'assets/img/banner/b10.WebP',
//     'assets/img/banner/b17.WebP',
//     'assets/img/banner/b18.Webp',
//     'assets/img/banner/b4.WebP',
//     'assets/img/banner/b7.WebP',
//     'assets/img/15.WebP',
//     'assets/img/landing.WebP',
//     'static/js/bundle.js',
// ];

// const CACHE_NAME = 'my-cache';

// this.addEventListener('install',event=>{
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//         .then(cache=>{
//             console.log("installed")
//             return cache.addAll(filesToCache)
//         })
//     )
// })

// this.addEventListener('activate',event=>{
//     console.log('activating service worker ', event)
// });

// this.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(cachedResponse => {
//       // If the response is found in the cache, return it
//       if (cachedResponse) {
//         return cachedResponse;
//       }

//       // If the response is not found in the cache, fetch it from the network
//       return fetch(event.request).then(networkResponse => {
//         // Clone the network response as it can only be consumed once
//         const responseToCache = networkResponse.clone();

//         // Open the cache and store the fetched response for future use
//         caches.open(CACHE_NAME).then(cache => {
//           cache.put(event.request, responseToCache);
//         });

//         // Return the network response to be used in the fetch event
//         return networkResponse;
//       });
//     }).catch(error => {
//       // If an error occurs during caching or fetching, handle it here
//       console.error('Error fetching and caching:', error);
//     })
//   );
// });
