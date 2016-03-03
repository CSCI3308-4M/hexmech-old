var express = require('express');
var router = express.Router();
var _ = underscore = require('underscore');
var httpError = require('http-error');
var package = require('package');


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
  var errors = req.validationErrors(true);
  if (errors){
    console.log(errors);
    data = getData();
    data.prefill = setPrefill(errors, req.body)
    data.flash = {
        type: 'alert-danger',
        messages: errors
    };
    console.log(data);
    res.render('signup', data);
    return;
  }

  console.log(req.body);
  res.json(req.body);
});


module.exports = router;
