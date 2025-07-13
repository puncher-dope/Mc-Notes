const staticCacheName = "static-v5";
const dynamicCacheName = "dynamic-v5";
const ASSETS = ["/", "/index.html"];

const pendingTasks = new Set();

self.addEventListener("install", async (event) => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(ASSETS);
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => key !== staticCacheName && key !== dynamicCacheName
            )
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener("fetch", (event) => {
  if (request.method === "POST") {
    const url = new URL(event.request.url);
    if (url.pathname.startsWith("/api/") && request.method === "GET") {
      event.respondWith(
        caches.match(request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(request).then((networkResponse) => {
              const clone = networkResponse.clone();
              caches
                .open(dynamicCacheName)
                .then((cache) => cache.put(request, clone));
              return networkResponse;
            })
          );
        })
      );
      return;
    }

    if (pendingTasks.has(request.url)) {
      event.respondWith(new Response(null, { status: 429 }));
      return;
    }

    pendingTasks.add(request.url);
    event.respondWith(
      fetch(request).finally(() => {
        pendingTasks.delete(request.url);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              const clone = networkResponse.clone();
              caches
                .open(dynamicCacheName)
                .then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => caches.match("/offline.html"))
      );
    })
  );
});
