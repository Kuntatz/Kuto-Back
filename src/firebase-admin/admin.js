import admin from 'firebase-admin';
import DotEnv from 'dotenv';
DotEnv.config();

const defaultApplication = () => {
  const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
  return admin.initializeApp({
    credential: admin.credential.cert({
      type:                         process.env.FIREBASE_TYPE,
      project_id:                   process.env.FIREBASE_PROJECT_ID,
      private_key_id:               process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key:                  FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email:                 process.env.FIREBASE_CLIENT_EMAIL,
      client_id:                    process.env.FIREBASE_CLIENT_ID,
      auth_uri:                     process.env.FIREBASE_AUTH_URI,
      token_uri:                    process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:  process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url:         process.env.FIREBASE_CLIENT_X509_CERT_URL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URI
  });
}
// admin.initializeApp({
//   credential: admin.credential.cert({
    // type:                         process.env.FIREBASE_TYPE,
    // project_id:                   process.env.FIREBASE_PROJECT_ID,
    // private_key_id:               process.env.FIREBASE_PRIVATE_KEY_ID,
    // private_key:                  FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    // client_email:                 process.env.FIREBASE_CLIENT_EMAIL,
    // client_id:                    process.env.FIREBASE_CLIENT_ID,
    // auth_uri:                     process.env.FIREBASE_AUTH_URI,
    // token_uri:                    process.env.FIREBASE_TOKEN_URI,
    // auth_provider_x509_cert_url:  process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    // client_x509_cert_url:         process.env.FIREBASE_CLIENT_X509_CERT_URL,
//   }),
//   databaseURL: "https://testkuto.firebaseio.com"
// });

export default defaultApplication();