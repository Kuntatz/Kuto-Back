import express from 'express';
import validate from 'express-validation';
import * as authCtrl from '../controllers/auth';
import paramValidation from '../config/param-validation';

const router = express.Router();

router.route('/signup')
  .post(validate(paramValidation.createUser), authCtrl.signup);

export default router;
