const Firebase = require('firebase-admin');

const serviceAccount = require('../drive-1ddc6-firebase-adminsdk-fbsvc-dfca16dadd.json')

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-1ddc6.firebasestorage.app'
})

module.exports = Firebase;