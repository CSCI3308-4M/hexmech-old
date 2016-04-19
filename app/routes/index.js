var express = require('express');
var router = express.Router();
var httpError = require('http-error');
var package = require('package');

/* GET home page. */
router.get('/', function(req, res, next) {

  data = {
    title: package.name,
    version: package.version,
    description: package.description,
    repository: package.repository.url,
    contributors: package.contributors,
    signupLink: 'signup',
    loginLink: 'login',
    gameLink: 'game',
    game2Link: 'game2'
  };

  res.format({
    'text/html': function(){
      res.render('index', data);
    },

    'application/json': function(){
      res.json(data);
    },

    'default': function() {
      // log the request and respond with 406
      next(httpError(406));
    }
  });

});

module.exports = router;
