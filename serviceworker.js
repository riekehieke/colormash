const APP_NAME = 'color mash'
const APP_VERSION = '1.1.4'
const CACHE_NAME = APP_NAME + '@' + APP_VERSION

const staticAssets = ['.']

// Nach Installation bekannte Assets dem Cache hinzufügen
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(staticAssets))
      .then(() => self.skipWaiting()),
  )
})

// Bei Aktivierung alten Cache löschen
self.addEventListener('activate', event => {
  const allowedCaches = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const cacheDeletePromises = cacheNames.map(cacheName => {
        if (!allowedCaches.includes(cacheName)) {
          return caches.delete(cacheName)
        }
      })
      return Promise.all(cacheDeletePromises)
    }),
  )
})

const checkResponseStatus = r => {
  return new Promise((res, rej) => {
    if ((r.status >= 200 && r.status < 300) || r.status === 0) res(r)
    else rej(r.statusText)
  })
}

const isRequestCacheable = request => {
  const url = new URL(request.url)
  if (url.protocol === 'chrome-extension:') return false

  return true
}
const isResponseCacheable = response => {
  // Keine opaque responses cachen, siehe
  // see https://cloudfour.com/thinks/when-7-kb-equals-7-mb/
  if (response.status === 0 || response.type === 'opaque') return false

  return true
}

const requestFailingWith404 = event => {
  return fetch(event.request).catch(() => {
    const body = JSON.stringify({
      error:
        "Sorry, you're offline. Try again once you have a working internet connection.",
    })
    const headers = { 'Content-Type': 'application/json' }
    return new Response(body, { status: 404, statusText: 'Not Found', headers })
  })
}
const requestThenCache = (event, cache) => {
  return fetch(event.request)
    .then(checkResponseStatus)
    .then(response => {
      if (isResponseCacheable(response)) {
        cache.put(event.request, response.clone())
      }
      return response
    })
    .catch(() => cache.match(event.request))
}

self.addEventListener('fetch', event => {
  if (!isRequestCacheable(event.request)) {
    event.respondWith(requestFailingWith404(event))
    return
  }

  const requestURL = event.request.url
  const request = requestURL.includes('?')
    ? new Request(requestURL.substring(requestURL.indexOf('?') + 1))
    : event.request

  event.respondWith(
    caches
      .match(request)
      .then(checkResponseStatus)
      .then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          if (navigator.onLine) requestThenCache(event, cache)
          return response
        })
      })
      .catch(() =>
        caches.open(CACHE_NAME).then(cache => requestThenCache(event, cache)),
      ),
  )
})
