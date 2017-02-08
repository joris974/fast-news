const CACHE_NAME = 'fast-news-v1'
const staticWebsiteCache =
  [ '/'
  , '/index.html'

  , '/css/main.css'
  , '/css/normalize.min.css'
  , '/css/font-awesome.min.css'

  , '/js/vendor/jquery-1.11.2.min.js'
  , '/js/main.js'

  , '/manifest.json'

  , '/fonts/FontAwesome.otf?v=4.7.0'
  , '/fonts/fontawesome-webfont.eot?v=4.7.0'
  , '/fonts/fontawesome-webfont.svg?v=4.7.0'
  , '/fonts/fontawesome-webfont.ttf?v=4.7.0'
  , '/fonts/fontawesome-webfont.woff?v=4.7.0'
  , '/fonts/fontawesome-webfont.woff2?v=4.7.0'
  ]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(staticWebsiteCache)
    })
  )
})

self.addEventListener('activate', function(event) {
  console.log('Activated', event)
})

self.addEventListener('push', function(event) {
  console.log('Push message received', event)
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      // Cache hit - return response
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()

      return fetch(fetchRequest).then(function(response) {
        // Check if we received a valid response
        if(!response) {
          return response
        }

        const responseToCache = response.clone()

        caches.open(CACHE_NAME)
        .then(function(cache) {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})