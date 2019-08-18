const express = require('express');
const { body } = require('express-validator');

const { catchAsyncErrors } = require('../helpers/errorHandlers');
const { login, register, checkToken } = require('../controllers/authController');

const router = express.Router();

router
  .route('/register')
  .post(
    [
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    catchAsyncErrors(register)
  );

router.route('/login').post(
  [
    body('email', 'Email is required')
      .not()
      .isEmpty(),
    body('password', 'Password is required')
      .not()
      .isEmpty(),
  ],
  login
);

router.route('/checkToken').get(checkToken);

module.exports = router;
