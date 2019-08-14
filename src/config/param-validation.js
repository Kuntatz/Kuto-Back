import Joi from 'joi';

export default {
  createUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      username: Joi.string().alphanum().required()
    }
  }
}
