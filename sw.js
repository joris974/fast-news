
const CACHE = 'cache-v1'

const PRECACHE_URLS =
  [ '/'
  , 'index.html'

  , '/css/main.css'
  , '/css/normalize.min.css'
  , '/css/font-awesome.min.css'

  , '/js/vendor/jquery-1.11.2.min.js'
  , '/js/main.js'

  , 'manifest.json'

  , '/images/default-image.png'
  ]

self.addEventListener('install', function(event) {
  event.waitUntil(
    precache()
    .then(function() {
      return self.skipWaiting()
    })
  )
})

self.addEventListener('fetch', function(event) {
  // Only worry about GET requests and certain domains
  if (event.request.method !== "GET") {
    return
  }

  event.respondWith(fromCache(event.request))
  event.waitUntil(update(event.request))
})

self.addEventListener('activate', function(event) {
  const currentCaches = [CACHE]
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return cacheNames.filter(function(cacheName) {
        return !currentCaches.includes(cacheName)
      })
    }).then(function(cachesToDelete) {
      return Promise.all(cachesToDelete.map(function(cacheToDelete) {
        return caches.delete(cacheToDelete)
      }))
    }).then(function() {
      return self.clients.claim()
    })
  )
})

function precache() {
  return caches.open(CACHE)
    .then(function(cache) {
      return cache.addAll(PRECACHE_URLS)
    })
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match')
    })
  })
}

function fromNetwork(request) {
  return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) {
      fulfill(response)
    }, reject)
  })
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request.clone()).then(function (response) {
      return cache.put(request, response)
    })
  })
}
