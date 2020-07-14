importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) {
  console.log('Workbox berhasil dimuat');
}else{
  console.log('Workbox gagal dimuat');
}

workbox.precaching.precacheAndRoute([
  {url:'/css/main.css',revision:'1'},
  {url:'/css/materialize.min.css',revision:'1'},
  {url:'/img/cv_liverpool.jpeg',revision:'1'},
  {url:'/img/ic_bookmark.svg',revision:'1'},
  {url:'/img/ic_home.svg',revision:'1'},
  {url:'/img/ic_rank.svg',revision:'1'},
  {url:'/img/ic_stadium.svg',revision:'1'},
  {url:'/img/ic_logo_192.png',revision:'1'},
  {url:'/img/ic_logo_360x240.png',revision:'1'},
  {url:'/img/ic_logo_512.png',revision:'1'},
  {url:'/img/news1.jpeg',revision:'1'},
  {url:'/img/news2.jpeg',revision:'1'},
  {url:'/js/data/data-source.js',revision:'1'},
  {url:'/js/data/db.js',revision:'1'},
  {url:'/js/check-sw.js',revision:'1'},
  {url:'/js/idb.js',revision:'1'},
  {url:'/js/main.js',revision:'1'},
  {url:'/js/materialize.min.js',revision:'1'},
  {url:'/push.js',revision:'1'},
  {url:'/index.html',revision:'1'},
  {url:'/manifest.json',revision:'1'},
  {url:'/package.json',revision:'1'},
  {url:'/package-lock.json',revision:'1'},
  {url:'/service-worker.js',revision:'1'}

]);


workbox.routing.registerRoute(
  new RegExp('/page/'),workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
);
 
self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/img/ic_logo_360x240.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Info Jadwal', options)
    );
  });