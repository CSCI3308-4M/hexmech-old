'use strict';
require('app-module-path').addPath(require('path').join(__dirname, 'lib'));

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const navbar = require('navbar');
const expressValidator = require('express-validator');
const config = require('config');

const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

require('./models/db');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator(require('express-validators')));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup JWT authentication
app.use(jwt({
  secret: config.jwtSecret,
  getToken: (req) => {
    const token = req.cookies[config.jwtCookieName];
    if (token) {
      return token;
    } else {
      return null;
    }
  },
}));
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    req.user = null;
    if (err.inner.name === 'TokenExpiredError') {
      res.clearCookie(config.jwtCookieName);
    }
  }
  next();
});
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use(navbar);
app.use('/', routes);
app.use('/users', users);
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use(express.static('public'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
