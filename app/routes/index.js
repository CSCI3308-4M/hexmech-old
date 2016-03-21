const express = require('express');
const httpError = require('http-error');
const packageConfig = require('package');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // data to be passed to template
  const data = {
    title: packageConfig.name,
    version: packageConfig.version,
    description: packageConfig.description,
    repository: packageConfig.repository.url,
    contributors: packageConfig.contributors,
    signupURL: 'signup',
    loginURL: 'login',
  };

  // display home page
  res.format({
    'text/html'() {
      res.render('index', data);
    },
    'application/json'() {
      res.json(data);
    },
    default() {
      // log the request and respond with 406
      next(httpError(406));
    },
  });
});

module.exports = router;
