'use strict';

module.exports = (req, res, next) => {
  if (req.user) {
    res.locals.navbar = [
      {text: 'Hello ' + req.user.displayName, href: ''},
      {text: 'Log Out', href: 'logout'},
    ]
  } else {
    res.locals.navbar = [
      {text: 'Log In', href: 'login'},
      {text: 'Sign Up', href: 'signup'},
    ]
  }
  next();
}
