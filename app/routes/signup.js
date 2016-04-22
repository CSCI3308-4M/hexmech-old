'use strict';
const express = require('express');
const _ = require('underscore');
const httpError = require('http-error');
const packageConfig = require('packageConfig');
const User = require('../models/user.js');


const router = new express.Router();


// get generic form data.
function getData() {
  return {
    title: packageConfig.name,
    signupURL: 'signup',
    loginURL: 'login',
  };
}


// get form prefill
function getPrefill(err, post) {
  const prefill = {};
  let keys = _.difference(Object.keys(post), Object.keys(err));
  keys = _.without(keys, 'password', 'confirmPassword');
  keys.forEach((key) => {
    prefill[key] = post[key];
  });
  return prefill;
}


// display flash message
function flashError(err, req, res) {
  const data = getData();
  data.prefill = getPrefill(err, req.body);
  data.flash = {
    type: 'alert-danger',
    messages: err,
  };
  res.render('signup', data);
}


// validates the signup form (sever side)
function validate(req) {
  req.checkBody({
    displayName: {
      notEmpty: {
        errorMessage: 'Display Name is required.',
      },
    },
    username: {
      username: {
        errorMessage: 'Username cannot contain spaces.',
      },
      notEmpty: {
        errorMessage: 'Username is required.',
      },
    },
    email: {
      isEmail: {
        errorMessage: 'Please enter a valid email address.',
      },
      notEmpty: {
        errorMessage: 'Email Address is required.',
      },
    },
    confirmEmail: {
      equals: {
        options: [req.body.email],
        errorMessage: 'Email addresses do not match.',
      },
    },
    password: {
      isLength: {
        options: [{ min: 6, max: 160 }],
        errorMessage: 'Password must be between 6 and 160 characters.',
      },
      notEmpty: {
        errorMessage: 'Password is required.',
      },
    },
    confirmPassword: {
      equals: {
        options: [req.body.password],
        errorMessage: 'Passwords do not match.',
      },
    },
  });
}


// save user
function saveUser(user, next) {
  user.save((err) => {
    if (err) {
      console.error(err);
      next(err);
    } else {
      console.log(`User "${user.username}" successfully registered.`);
      next();
    }
  });
}


// register a new user
function register(req, res, next) {
  // check for existing username
  User.count({ username: req.body.username }, (err, count) => {
    // handle case of dumplicate username
    if (count > 0) {
      flashError([{ msg: 'Username already exists.' }], req, res);
      return;
    }

    // set plain text fields
    const user = new User({
      displayName: req.body.displayName,
      username: req.body.username,
      email: req.body.email,
      admin: false,
      created: new Date(),
    });

    // set password and save
    user.setPassword(req.body.password, () => {
      saveUser(user, next);
    });
  });
}


// GET signup page
router.get('/', (req, res, next) => {
  res.format({
    'text/html'() {
      res.render('signup', getData());
    },
    'default'() {
      // log the request and respond with 406
      next(httpError(406));
    },
  });
});


// POST signup page
router.post('/', (req, res, next) => {
  // sanitize the input
  req.sanitizeBody('displayName').trim();

  // validate the input
  validate(req);

  // check for validation errors
  const err = req.validationErrors(true);
  if (err) {
    console.error(err);
    flashError(err, req, res);
    return;
  }

  // register user
  register(req, res, (err_) => {
    if (err_) {
      console.error(err_);
      next(httpError(500));
    } else {
      res.redirect('/');
    }
  });
});


module.exports = router;
