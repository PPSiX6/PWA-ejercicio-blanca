//Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_JFCF_PWA';

//Configuracion de los ficheros
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache).then(() => {
                    self.skipWaiting();
                });
            })
            .catch((err) => console.log("No se ha registrado el cache"), err)
    );
});

//Event activate
self.addEventListener("activate", (e) => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheNames => {
                        if (cacheWhiteList.indexOf(cacheName) == -1) {
                            //Borrar los elementos que no se necesitan

                            return cache.delete(cacheNames);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim();// activa el cache en el dispositivo
            })
    );
});


//Event fetch
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    console.log("Devuelve los datos desde cache/n")
                    return res;
                }
                return fetch(e.request);
            })
    );
});