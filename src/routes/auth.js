import express from 'express';
import validate from 'express-validation';
import * as authCtrl from '../controllers/auth';
import paramValidation from '../config/param-validation';

const router = express.Router();

router.route('/signup').post(validate(paramValidation.createUser), authCtrl.signup);

router.route('/delete/:uid').delete(authCtrl.deleteUser);

router.route('/update/:uid').put(authCtrl.updateUser);

router.route('/:uid').get(authCtrl.getUser);

router.route('/all/:nextPageToken').get(authCtrl.getAllUsers);

export default router;
