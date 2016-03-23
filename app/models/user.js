"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('config');
var bcrypt = require('bcrypt');


// make user schema
var userSchema = new Schema({
  displayName: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    set: function (v) { return v.toLowerCase() }
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  created: Date,
  updated: Date
});


userSchema.methods.setPassword = function setPassword(password, next) {
  let user = this;
  bcrypt.hash(password, config.bcryptStrength, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      user.password = res;
      next()
    }
  });
};


userSchema.methods.setPasswordSync = function setPasswordSync(password) {
  this.password = bcrypt.hashSync(req.body.password, config.bcryptStrength);
};


// verify password asynchronously
userSchema.methods.checkPassword = function checkPassword(password, next) {
  bcrypt.compare(password, this.password, function (err, res) {
    if (err) {
      console.log(err);
    }
    next(res);
  });
};


// verify password synchronously
userSchema.methods.checkPasswordSync = function checkPasswordSync(password) {
  return bcrypt.compareSync(password, this.password);
};


userSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updated = currentDate;
  if (!this.created) {
    this.created = currentDate;
  }
  next();
});


// make user model
var User = mongoose.model('User', userSchema);


// export the model
module.exports = User;
