var express = require('express');
var router = express.Router();
var _ = require('underscore');
var bcrypt = require('bcrypt');
var httpError = require('http-error');
var package = require('package');
var config = require('config');
var User = require('../models/user.js');


// GET signup page
router.get('/', function (req, res, next) {
  res.format({
    'text/html': function(){
      res.render('signup', getData());
    },
    'default': function() {
      // log the request and respond with 406
      next(httpError(406));
    }
  });
});


// POST signup page
router.post('/', function (req, res, next) {

  // sanitize the input
  req.sanitizeBody('displayName').trim();

  // validate the input
  validate(req);

  // check for validation errors
  var err = req.validationErrors(true);
  if (err){
    console.log(err);
    flashError(err, req, res);
    return;
  }

  // register user
  register(req, res, function (err) {
    if (err) {
      console.log(err);
      next(httpError(500));
    } else {
      res.redirect('/');
    }
  });

});


function flashError(err, req, res) {
    data = getData();
    data.prefill = setPrefill(err, req.body);
    data.flash = {
        type: 'alert-danger',
        messages: err
    };
    res.render('signup', data);
}


function getData() {
  return {
    title: package.name,
    signupURL: 'signup',
    loginURL: 'login'
  }
};


function setPrefill(errors, post) {
  prefill = {};
  keys = _.difference(Object.keys(post), Object.keys(errors));
  keys = _.without(keys, 'password', 'confirmPassword');
  keys.forEach(function (key) {
    prefill[key] = post[key];
  });
  return prefill;
}


// validates the signup form (sever side)
function validate(req) {
  req.checkBody({
    displayName: {
      notEmpty: {
        errorMessage: 'Display Name is required.'
      }
    },
    username: {
      username: {
        errorMessage: 'Username cannot contain spaces.'
      },
      notEmpty: {
        errorMessage: 'Username is required.'
      }
    },
    email: {
      isEmail: {
        errorMessage: 'Please enter a valid email address.'
      },
      notEmpty: {
        errorMessage: 'Email Address is required.'
      }
    },
    confirmEmail: {
      equals: {
        options: [req.body.email],
        errorMessage: 'Email addresses do not match.'
      }
    },
    password: {
      isLength: {
        options: [{min: 14, max: 160}],
        errorMessage: 'Password must be between 14 and 160 characters.'
      },
      notEmpty: {
        errorMessage: 'Password is required.'
      }
    },
    confirmPassword: {
      equals: {
        options: [req.body.password],
        errorMessage: 'Passwords do not match.'
      }
    }
  });
}


function register(req, res, next) {

  // TODO: add check for existing user
  User.count({username: req.body.username}, function (err, count) {

    // handle case of dumplicate username
    if (count > 0) {
      flashError([{msg: "Username already exists."}], req, res);
      return;
    }

    // set plain text fields
    var user = new User({
      displayName: req.body.displayName,
      username: req.body.username,
      email: req.body.email,
      admin: false,
      created: new Date()
    });

    // set password and save
    user.setPassword(req.body.password, function () {
      saveUser(user, next);
    });

  });
}


function saveUser(user, next) {
  console.log("saving");
  user.save(function (err) {
    if (err) {
    console.log("saving failed");
      console.log(err);
      next(err);
    } else {
      console.log("User " + user.username + " successfully registered.");
      next()
    }
  });
}


module.exports = router;
