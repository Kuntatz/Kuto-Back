import httpStatus from 'http-status';
import admin from '../firebase-admin/admin';

export const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyToken(idToken);
    if (decodedToken) {
      req.body.uid = decodedToken.uid;
      return next();
    } else {
      return res.status(httpStatus.UNAUTHORIZED).send('You are not authorized!');
    }
  } catch (e) {
    return res.status(httpStatus.UNAUTHORIZED).send('You are not authorized!');
  }
}

export const signup = async (req, res) => {
  const { email, password } = req.body;
  console.info('admin', admin);
  try {
    const user = await admin.auth().createUser({
      email,
      password,
      disabled: false,
      emailVerified: true,
      displayName: 'John Doe'
    });
    return res.send({
      user
    });
  } catch(e) {
    console.info('error signup', e);
    return res.send({
      error: e
    });
  }
}