'use strict';

require('app-module-path').addPath(require('path').join(
      __dirname, '..', '..', 'lib'));
const expect = require('chai').expect;
const mongoose = require('mongoose');
const mockgoose = require('mockgoose');
const proxyquire = require
const User = require('../../models/user');
const config = require('config')

describe('User Model', function () {

  before(function (done) {
    mockgoose(mongoose).then(function() {
      mongoose.connect(config.mongoURI, function (err) {
        done(err);
      });
    });
  });


  beforeEach(function (done) {
    mockgoose.reset()

    User.create({
      displayName: 'Example User',
      username: 'example',
      // password is 'password'
      password: '$2a$14$OagnzJvy547.L2AOgzQciuIpTCWACs7XK9f3lbOYRBAiYEFUFLR82',
      email: 'example@example.com',
      admin: false,
      created: new Date(2000,1,1,0,0,0),
      updated: new Date(2001,1,1,0,0,0)
    }, function () {

      User.create({
        displayName: 'Carbon Fizz',
        username: 'carbonfizz',
        // password is 'agilezebra'
        password: '$2a$14$H8yqesNBKn3Ax/7DNoRoc.HEsAz9ArtU9e.eiruARebAHMRGqMiEK',
        email: 'carbonfizz@example.com',
        admin: true,
        created: new Date(2010,1,1,0,0,0),
        updated: new Date(2011,1,1,0,0,0)
      }, function () {
    
        User.create({
          displayName: 'Ugliest Jam',
          username: 'ugliestjam',
          // password is 'growingfleet'
          password: '$2a$14$vi5FS86Pskup3QX4b1puguhBWpB4H6IBdnVuEwHzD5mgEopuBYeUy',
          email: 'ugliestjam@example.com',
          admin: false,
          created: Date.now(),
          updated: Date.now()
        }, function () {
          done();
        });
      });
    });
  });


  afterEach(function (done) {
    mockgoose.reset();
    done();
  });


  describe('.save', function () {

    it('should allow saving without error', function (done) {
      const user = new User({
        displayName: 'Jumping Unicorn',
        username: 'jumpingunicorn',
        email: 'jumpingunicorn@example.com',
        admin: false,
        created: Date.now(),
      });
      user.save(function (err) {
        expect(err).to.be.an('null');
        done();
      });
    });

    it('should set the created date on creation', function (done) {
      User.findOne({username: 'ugliestjam'}, function (err, user) {
        if (err){
          done(err);
          return;
        }
        expect(user).to.have.property('created');
        expect(user.created).to.be.instanceof(Date);
        expect(user.created.getTime()).to.be.closeTo(Date.now(), 100);
        done();
      });
    });

    it('should not set the created date on update', function (done) {
      User.findOne({username: 'carbonfizz'}, function (err, user) {
        if (err){
          done(err);
          return;
        }
        user.email = 'carbonfizz@fizz.net';
        user.save(function (err) {
          expect(user).to.have.property('created');
          expect(user.created).to.be.instanceof(Date);
          expect(user.created.getTime()).to.be.not.closeTo(Date.now(), 100);
          done();
        });
      });
    });

    it('should set the updated date on creation', function (done) {
      User.findOne({username: 'ugliestjam'}, function (err, user) {
        if (err){
          done(err);
          return;
        }
        expect(user).to.have.property('updated');
        expect(user.updated).to.be.instanceof(Date);
        expect(user.updated.getTime()).to.be.closeTo(Date.now(), 100);
        done();
      });
    });

    it('should set the updated date on update', function (done) {
      User.findOne({username: 'carbonfizz'}, function (err, user) {
        user.email = 'carbonfizz@fizz.net';
        user.save(function (err) {
          expect(user).to.have.property('updated');
          expect(user.updated).to.be.instanceof(Date);
          expect(user.updated.getTime()).to.be.closeTo(Date.now(), 100);
          done(err);
        });
      });
    });

  });


  describe('.setPassword', function () {

    it('should set the password using bcrypt', function (done) {
      const user = new User();
      user.setPassword('password', function (err) {
        expect(user).to.have.property('password');
        expect(user.password).to.be.a('string');
        done(err);
      })
    });

  });


  describe('.setPasswordSync', function () {

    it('should set the password using bcrypt', function (done) {
      const user = new User();
      user.setPasswordSync('password')
      expect(user).to.have.property('password');
      expect(user.password).to.be.a('string');
      done();
    });

  });


  describe('.findOne', function () {

    it('should find user via username', function (done) {
      User.findOne({username: 'carbonfizz'}, function (err, user) {
        expect(user).to.have.property('displayName');
        expect(user.displayName).to.be.a('string');
        expect(user.displayName).to.equal('Carbon Fizz');
        done(err);
      });
    });

    it('should find user via email', function (done) {
      User.findOne({email: 'carbonfizz@example.com'}, function (err, user) {
        expect(user).to.have.property('displayName');
        expect(user.displayName).to.be.a('string');
        expect(user.displayName).to.equal('Carbon Fizz');
        done(err);
      });
    });

    it('should find user via display name', function (done) {
      User.findOne({displayName: 'Carbon Fizz'}, function (err, user) {
        expect(user).to.have.property('username');
        expect(user.username).to.be.a('string');
        expect(user.username).to.equal('carbonfizz');
        done(err);
      });
    });

  });


  describe('.checkPassword', function () {

    it('should call callback with true if password is correct', function (done) {
      User.findOne({username: 'carbonfizz'}, function (err, user) {
        user.checkPassword('agilezebra', function (res) {
          expect(res).to.be.a('boolean');
          expect(res).to.be.true;
          done(err);
        });
      });
    });

    it('should call callback with false if password is incorrect', function (done) {
      User.findOne({username: 'carbonfizz'}, function (err, user) {
        user.checkPassword('agilezebra1', function (res) {
          expect(res).to.be.a('boolean');
          expect(res).to.be.false;
          done(err);
        });
      });
    });

  });


  describe('.checkPasswordSync', function () {

    it('should return true if password is correct', function (done) {
      User.findOne({username: 'carbonfizz'}, function (err, user) {
        const res = user.checkPasswordSync('agilezebra');
        expect(res).to.be.a('boolean');
        expect(res).to.be.true;
        done(err);
      });
    });

    it('should return false if password is incorrect', function (done) {
      User.findOne({username: 'carbonfizz'}, function (err, user) {
        const res = user.checkPasswordSync('agilezebra1');
        expect(res).to.be.a('boolean');
        expect(res).to.be.false;
        done(err);
      });
    });

  });

});
