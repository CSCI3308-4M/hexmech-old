'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('config');
const bcrypt = require('bcrypt');


// make user schema
const userSchema = new Schema({
  displayName: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    set(v) {
      return v.toLowerCase();
    },
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  created: Date,
  updated: Date,
});


// set password asynchronously
userSchema.methods.setPassword = function setPassword(password, next) {
  bcrypt.hash(password, config.bcryptStrength, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      this.password = res;
      next();
    }
  });
};


// set password synchronously
userSchema.methods.setPasswordSync = function setPasswordSync(password) {
  this.password = bcrypt.hashSync(password, config.bcryptStrength);
};


// verify password asynchronously
userSchema.methods.checkPassword = function checkPassword(password, next) {
  bcrypt.compare(password, this.password, (err, res) => {
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


// ran before saving user
userSchema.pre('save', (next) => {
  const currentDate = new Date();
  this.updated = currentDate;
  if (!this.created) {
    this.created = currentDate;
  }
  next();
});


// make user model
const User = mongoose.model('User', userSchema);


// export the model
module.exports = User;
