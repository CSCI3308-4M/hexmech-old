/* eslint-env node, mocha */
'use strict';

require('app-module-path').addPath(require('path').join(
      __dirname, '..', '..', 'lib'));
const expect = require('chai').expect;
const mongoose = require('mongoose');
const mockgoose = require('mockgoose');
const User = require('../../models/user');
const config = require('config');

describe('User Model', () => {
  before((done) => {
    mockgoose(mongoose).then(() => {
      mongoose.connect(config.mongoURI, (err) => {
        done(err);
      });
    });
  });


  beforeEach((done) => {
    mockgoose.reset();
    User.create({
      displayName: 'Example User',
      username: 'example',
      // password is 'password'
      password: '$2a$14$OagnzJvy547.L2AOgzQciuIpTCWACs7XK9f3lbOYRBAiYEFUFLR82',
      email: 'example@example.com',
      admin: false,
      created: new Date(2000, 1, 1, 0, 0, 0),
      updated: new Date(2001, 1, 1, 0, 0, 0),
    }, () => {
      User.create({
        displayName: 'Carbon Fizz',
        username: 'carbonfizz',
        // password is 'agilezebra'
        password: '$2a$14$H8yqesNBKn3Ax/7DNoRoc.HEsAz9ArtU9e.eiruARebAHMRGqMiEK',
        email: 'carbonfizz@example.com',
        admin: true,
        created: new Date(2010, 1, 1, 0, 0, 0),
        updated: new Date(2011, 1, 1, 0, 0, 0),
      }, () => {
        User.create({
          displayName: 'Ugliest Jam',
          username: 'ugliestjam',
          // password is 'growingfleet'
          password: '$2a$14$vi5FS86Pskup3QX4b1puguhBWpB4H6IBdnVuEwHzD5mgEopuBYeUy',
          email: 'ugliestjam@example.com',
          admin: false,
          created: Date.now(),
          updated: Date.now(),
        }, () => {
          done();
        });
      });
    });
  });


  afterEach((done) => {
    mockgoose.reset();
    done();
  });


  describe('.save', () => {
    it('should allow saving without error', (done) => {
      const user = new User({
        displayName: 'Jumping Unicorn',
        username: 'jumpingunicorn',
        email: 'jumpingunicorn@example.com',
        admin: false,
        created: Date.now(),
      });
      user.save((err) => {
        expect(err).to.be.an('null');
        done();
      });
    });

    it('should set the created date on creation', (done) => {
      User.findOne({ username: 'ugliestjam' }, (err, user) => {
        expect(user).to.have.property('created');
        expect(user.created).to.be.instanceof(Date);
        expect(user.created.getTime()).to.be.closeTo(Date.now(), 100);
        done(err);
      });
    });

    it('should not set the created date on update', (done) => {
      User.findOne({ username: 'carbonfizz' }, (error, user) => {
        user.email = 'carbonfizz@fizz.net'; // eslint-disable-line no-param-reassign
        user.save((err) => {
          expect(user).to.have.property('created');
          expect(user.created).to.be.instanceof(Date);
          expect(user.created.getTime()).to.be.not.closeTo(Date.now(), 100);
          done(err);
        });
      });
    });

    it('should set the updated date on creation', (done) => {
      User.findOne({ username: 'ugliestjam' }, (err, user) => {
        expect(user).to.have.property('updated');
        expect(user.updated).to.be.instanceof(Date);
        expect(user.updated.getTime()).to.be.closeTo(Date.now(), 100);
        done(err);
      });
    });

    it('should set the updated date on update', (done) => {
      User.findOne({ username: 'carbonfizz' }, (error, user) => {
        user.email = 'carbonfizz@fizz.net'; // eslint-disable-line no-param-reassign
        user.save((err) => {
          expect(user).to.have.property('updated');
          expect(user.updated).to.be.instanceof(Date);
          expect(user.updated.getTime()).to.be.closeTo(Date.now(), 100);
          done(err);
        });
      });
    });
  });


  describe('.setPassword', () => {
    it('should set the password using bcrypt', (done) => {
      const user = new User();
      user.setPassword('password', (err) => {
        expect(user).to.have.property('password');
        expect(user.password).to.be.a('string');
        done(err);
      });
    });
  });


  describe('.setPasswordSync', () => {
    it('should set the password using bcrypt', (done) => {
      const user = new User();
      user.setPasswordSync('password');
      expect(user).to.have.property('password');
      expect(user.password).to.be.a('string');
      done();
    });
  });


  describe('.findOne', () => {
    it('should find user via username', (done) => {
      User.findOne({ username: 'carbonfizz' }, (err, user) => {
        expect(user).to.have.property('displayName');
        expect(user.displayName).to.be.a('string');
        expect(user.displayName).to.equal('Carbon Fizz');
        done(err);
      });
    });

    it('should find user via email', (done) => {
      User.findOne({ email: 'carbonfizz@example.com' }, (err, user) => {
        expect(user).to.have.property('displayName');
        expect(user.displayName).to.be.a('string');
        expect(user.displayName).to.equal('Carbon Fizz');
        done(err);
      });
    });

    it('should find user via display name', (done) => {
      User.findOne({ displayName: 'Carbon Fizz' }, (err, user) => {
        expect(user).to.have.property('username');
        expect(user.username).to.be.a('string');
        expect(user.username).to.equal('carbonfizz');
        done(err);
      });
    });
  });


  describe('.checkPassword', () => {
    it('should call callback with true if password is correct', (done) => {
      User.findOne({ username: 'carbonfizz' }, (err, user) => {
        user.checkPassword('agilezebra', (res) => {
          expect(res).to.be.a('boolean');
          expect(res).to.be.true; // eslint-disable-line no-unused-expressions
          done(err);
        });
      });
    });

    it('should call callback with false if password is incorrect', (done) => {
      User.findOne({ username: 'carbonfizz' }, (err, user) => {
        user.checkPassword('agilezebra1', (res) => {
          expect(res).to.be.a('boolean');
          expect(res).to.be.false; // eslint-disable-line no-unused-expressions
          done(err);
        });
      });
    });
  });


  describe('.checkPasswordSync', () => {
    it('should return true if password is correct', (done) => {
      User.findOne({ username: 'carbonfizz' }, (err, user) => {
        const res = user.checkPasswordSync('agilezebra');
        expect(res).to.be.a('boolean');
        expect(res).to.be.true; // eslint-disable-line no-unused-expressions
        done(err);
      });
    });

    it('should return false if password is incorrect', (done) => {
      User.findOne({ username: 'carbonfizz' }, (err, user) => {
        const res = user.checkPasswordSync('agilezebra1');
        expect(res).to.be.a('boolean');
        expect(res).to.be.false; // eslint-disable-line no-unused-expressions
        done(err);
      });
    });
  });
});
