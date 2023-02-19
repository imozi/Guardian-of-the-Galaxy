const CACHE_NAME = 'gotg-cache-v1'
const CACHE_CONTENT_TYPES = [
  'document',
  'script',
  'style',
  'font',
  'image',
  'audio',
  'object',
]
const PRECACHE_URLS = ['/', '/index.html']

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(PRECACHE_URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

self.addEventListener('fetch', event => {
  if (!CACHE_CONTENT_TYPES.includes(event.request.destination)) {
    return
  }

  if (!event.request.url.match(/^http/)) {
    return
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  )
})
