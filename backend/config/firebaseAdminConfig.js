const admin = require('firebase-admin');
require ('dotenv').config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

const app = global.firebaseAdminApp
  ?? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

global.firebaseAdminApp = app;

module.exports = app;
