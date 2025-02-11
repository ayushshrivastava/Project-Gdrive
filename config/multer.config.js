const { credential } = require('firebase-admin');
const multer = require('multer');

const firebaseStorage = require('multer-firebase-storage');

const firebase = require('./firebase.config');
const serviceAccount = require('../drive-1ddc6-firebase-adminsdk-fbsvc-dfca16dadd.json');


const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drive-1ddc6.firebasestorage.app',
    unique: true,
})

const upload = multer({
    storage : storage,
})

module.exports = upload;