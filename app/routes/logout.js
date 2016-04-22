'use strict';
const express = require('express');
const httpError = require('http-error');
const config = require('config');

const router = new express.Router();


// TODO: We also need to invalidate the token instead of just instructing the
// browser to delete it.


// GET login page
router.get('/', (req, res, next) => {
  res.clearCookie(config.jwtCookieName);
  res.redirect('/');
});


// POST login page
router.post('/', (req, res, next) => {
  res.clearCookie(config.jwtCookieName);
  res.redirect('/');
});


module.exports = router;
