const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BFDUhOmZRHTF4ZKzfvLvhSqNGtpd84zS3D9VIOjJ3kEuilTlsdkIKCSPhQn88_eqhprLDISorBjtxn9ptsUIxcU",
   "privateKey": "QQ151kMVUCWFuGerkYvxoz6GApPT0YT2hDp1vFpO6jU"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dQuEPi33bPc:APA91bHgMwNPIeL8OpcYcjcq1E8-g5MXDQ_rWsI2Q-ia1pwkWlz4DHzBNqQfFAmm1vcHlEm5tcrzA6pLpZMwZsInUGjqqGjEtFPqY_KC-rg-9WQQvmc6yPtjDY0jn6kXqXvhc0sCUwG7",
   "keys": {
       "p256dh": "BADRQzdSDj7IsjS34D9ZqPHldsxXub4475nc2VFRSdBUT3CKXOVxSfKK7Nz5m8yuQmZz2oMkByhdTSOX9coUFD8=",
       "auth": "cgSytIm4TVzB6NxCjzyMnw=="
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