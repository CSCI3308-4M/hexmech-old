/* eslint-env node, mocha */
'use strict';

const expect = require('chai').expect;
const httpError = require('../lib/http-error');


describe('HTTP Error', () => {
  it('returns node error with http status and message', (done) => {
    const err = httpError(200);
    expect(err).to.have.property('name');
    expect(err.name).to.be.a('string');
    expect(err.name).to.equal('Error');
    expect(err).to.have.property('status');
    expect(err.status).to.be.a('number');
    expect(err.status).to.equal(200);
    expect(err).to.have.property('message');
    expect(err.message).to.be.a('string');
    expect(err.message).to.equal('OK');
    done();
  });

  it('handles 301', (done) => {
    const err = httpError(301);
    expect(err).to.have.property('name');
    expect(err.name).to.be.a('string');
    expect(err.name).to.equal('Error');
    expect(err).to.have.property('status');
    expect(err.status).to.be.a('number');
    expect(err.status).to.equal(301);
    expect(err).to.have.property('message');
    expect(err.message).to.be.a('string');
    expect(err.message).to.equal('Moved Permanently');
    done();
  });

  it('handles 404', (done) => {
    const err = httpError(404);
    expect(err).to.have.property('name');
    expect(err.name).to.be.a('string');
    expect(err.name).to.equal('Error');
    expect(err).to.have.property('status');
    expect(err.status).to.be.a('number');
    expect(err.status).to.equal(404);
    expect(err).to.have.property('message');
    expect(err.message).to.be.a('string');
    expect(err.message).to.equal('Not Found');
    done();
  });

  it('handles 501', (done) => {
    const err = httpError(501);
    expect(err).to.have.property('name');
    expect(err.name).to.be.a('string');
    expect(err.name).to.equal('Error');
    expect(err).to.have.property('status');
    expect(err.status).to.be.a('number');
    expect(err.status).to.equal(501);
    expect(err).to.have.property('message');
    expect(err.message).to.be.a('string');
    expect(err.message).to.equal('Not Implemented');
    done();
  });
});
