var express = require('express');
var router = express.Router();
var httpError = require('http-error');
var package = require('package');


// GET signup page
router.get('/', function(req, res, next) {

  data = {
    title: package.name,
    signupLink: "/signup"
  };

  res.format({
    'text/html': function(){
      res.render('signup', data);
    },

    'default': function() {
      // log the request and respond with 406
      next(httpError(406));
    }
  });

});


// POST signup page
router.post('/', function(req, res, next){
  res.json(req.body);
});


module.exports = router;
