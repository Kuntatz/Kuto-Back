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
  const { email, password, username } = req.body;
  try {
    const user = await admin.auth().createUser({
      email,
      password,
      disabled: false,
      emailVerified: true,
      displayName: username
    });
    return res.send({ user: user.toJSON() });
  } catch (e) {
    console.info('error signup', e);
    return res.status(httpStatus.BAD_REQUEST).send({ error: e });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const result = await admin.auth().deleteUser(req.params.uid);
    return res.send({ success: true, msg: 'Successfully deleted user' });
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: e });
  }
}

export const updateUser = async (req, res) => {
  const { email, password, username } = req.body;
  const updatedUser = {};
  if (email) {
    updatedUser.email = email;
  }
  if (password) {
    updatedUser.password = password;
  }
  if (username) {
    updatedUser.displayName = username;
  }
  try {
    const user = await admin.auth().updateUser(req.params.uid, updatedUser);
    return res.send({ user: user.toJSON() });
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: e });
  }
}

export const getUser = async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.params.uid);
    return res.send({ user: userRecord.toJSON() });
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: e });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = [];
    const result = await admin.auth().listUsers(1000, req.params.nextPageToken);
    for (let i = 0; i < result.users.length; i += 1) {
      users.push(result.users[i].toJSON());
    }
    return res.send({ users, nextPageToken: result.pageToken });
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: e });
  }
}