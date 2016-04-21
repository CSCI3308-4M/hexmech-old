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
  keys = _.without(keys, 'password');
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
  res.render('login', data);
}


// login user
function login(req, res, next) {
  User.findOne({ username: req.body.username }, (err, user) => {
    // database error
    if (err) {
      next(err);
    }
    // TODO: Both failure conditions should return a generic no combination
    // message and should take the same amount of time for security reasons.
    if (!user) {
      flashError([{ msg: 'No user by that name exists.' }], req, res);
      return;
    }
    user.checkPassword(req.body.password, (passwordMatch) => {
      if (!passwordMatch) {
        flashError([{ msg: 'Incorrect password.' }], req, res);
        return;
      }
      next();
    });
  });
}


// GET login page
router.get('/', (req, res, next) => {
  res.format({
    'text/html'() {
      res.render('login', getData());
    },
    'default'() {
      // log the request and respond with 406
      next(httpError(406));
    },
  });
});


// POST login page
router.post('/', (req, res, next) => {
  login(req, res, (err) => {
    if (err) {
      console.error(err);
      next(httpError(500));
    } else {
      res.redirect('/');
    }
  });
});


module.exports = router;
