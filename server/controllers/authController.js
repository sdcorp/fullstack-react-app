const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');
const { catchExpressValidatorErrors } = require('../helpers/customValidators');

exports.register = async (req, res, next) => {
  catchExpressValidatorErrors(req);
  const { email, password } = req.body;
  //  check if user exists
  let user = await User.findOne({ email });
  if (user) {
    const err = new Error('User with this email already exists');
    err.status = 400;
    throw err;
  }
  // create user instanse
  user = new User({ email, password });
  // hash password
  user.hashPassword(password);
  // save user
  await user.save();
  // create token
  const token = user.generateJWT();
  res.status(201).json({ msg: 'User registered successfully', token });
};

exports.login = (req, res, next) => {
  catchExpressValidatorErrors(req);
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      return res.json({ user: passportUser.toAuthJSON() });
    }
    const loginError = new Error('Email or password are wrong');
    loginError.status = 401;
    throw loginError;
  })(req, res, next);
};

exports.authorize = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, passportUser, info) => {
    if (err) {
      next(err);
    }
    if (passportUser) {
      return next();
    }
    const accessError = new Error('Access denied');
    accessError.status = 401;
    accessError.data = info;
    throw accessError;
  })(req, res, next);

exports.checkToken = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, passportUser, info) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (passportUser) {
      return res.status(200).json({ authenticated: true });
    }
    const accessError = new Error('Invalid token');
    accessError.status = 401;
    accessError.data = info;
    throw accessError;
  })(req, res, next);
