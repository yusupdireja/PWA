const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIbgNu9N49SQ7Lr4tu69nhhfvQ0ewhzN8eoxFtbLz2MlH1JfmVkvx8GF7KQwrvSng_8m0wGle474UULv5Tun7fQ",
   "privateKey": "ars7v66mIXplpaebeQCteAKcTYx2bzUv4mxXvCyDq38"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dT9VxvK2jjA:APA91bHTCrK5n68X9eY9OWuNtI9ba__BQWsvKtYwKLYqxx2xGGrfmdxNk6e3aXM7n1wJwWFealnoR0RdvgqhSNzEoRXt9aJ7EtMM2vRF6zTw3u72N-FSUS6uTj09D4yD0x1klO-U4mYg",
   "keys": {
       "p256dh": "BPFr9TdM3FfOHzGA4cg18QKMz+yLdy0jncDAh2TTTupbQsv/nRmvoEsCwKhsVCnA+DjrvrIz+qGH9DAPX22rS7I=",
       "auth": "hGLjd/BizsBTFvkHz/KdcQ=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '910845837317',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);