var CACHE_NAME = 'v3Helados';
var cacheFiles = [
    './',
    './index.html',
    './style.css',
    './manifest.json',
    './contacto.html',
    './productos.html',
    './ubicacion.html',
    './nosotros.html',
    './app.js',
    './ws.js',
    './img/Carrusel1.jpg',
    './img/Carrusel2.jpg',
    './img/Carrusel3.jpg',
    './img/Carrusel4.jpeg',
    './img/CubetasHelados.jpeg',
    './img/Desktop_Captura.png',
    './img/EdoMexMapa.jpeg',
    './img/ESTi.jpg',
    './img/fondo.jpg',
    './img/HeladosSabores.jpg',
    './img/Huasca.jpg',
    './img/icono1.png',
    './img/icono2.png',
    './img/MexicoBandera.png',
    './img/Mobile_Captura.png',
    './img/PachucaMapa.png',
    './img/PaletasHielo.jpg',
    './img/Perfil.png',
    './img/Temascalapa.jpeg',
    './img/TizayucaMapa.png',
    './img/VillasTezontepecMapa.png',
    './img/mision.png',
    './img/vision.jpg',
    './img/objetivos.jpg',
]

self.addEventListener('install', function(e) {
    console.log('Service Worker: Instalado');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Service Worker: Cache abierto');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e) {
    console.log('Service Worker: Activado');
    e.waitUntil()(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                   if(thisCacheName !== CACHE_NAME) {
                    console.log('Service Worker: Cache viejo eliminado', thisCacheName);
                    return caches.delete(thisCacheName);
                   }
            }))
        })
    )
})

self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetching', e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Cache encontrada', e.request.url);
                return response;
            }
            var requestClone = e.request.clone();
            fetch(requestClone).then(function(response) {
                if(!response){
                    console.log('No se encontro respuesta');
                    return response;
                }
                var responseClone = response.clone();
                
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, responseClone);
                    return response;
                });
            })
            .catch(function(err){
                console.log('Error al hacer fetch', err);
            })
        })
    )
})
