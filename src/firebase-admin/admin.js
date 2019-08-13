import admin from 'firebase-admin';
import serviceAccount from '../config/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testkuto.firebaseio.com"
});

export default admin;