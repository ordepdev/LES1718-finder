'use strict';

process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../models/user');
const chai = require('chai');
const http = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(http);

describe('Users', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  after((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('/GET authentication', () => {

    it('it should return a 400 when no access token is present', (done) => {
      chai.request('http://localhost:3000')
        .get('/authentication')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('it should return a 400 when the authorization header is not well parsed', (done) => {
      chai.request('http://localhost:3000')
        .get('/authentication')
        .set('authorization', 'basicfoobar')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('it should GET the authentication info of an user', (done) => {
      new User({ userId: 1, accessToken: "user-token-1", provider: "google" }).save();
      chai.request('http://localhost:3000')
        .get('/authentication')
        .set('authorization', 'basic user-token-1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.deep.property("accessToken", "user-token-1");
          res.body.should.have.deep.property("provider", "google");
          done();
        });
    });

    it('it should return a 404 when no user is found', (done) => {
      chai.request('http://localhost:3000')
        .get('/authentication')
        .set('authorization', 'basic foobar')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/POST authenticate', () => {

    it('it should POST the user authentication info', (done) => {
      chai.request('http://localhost:3000')
        .post('/authenticate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ userID: 12345, provider: "google"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.deep.property("accessToken");
          res.body.should.have.deep.property("provider", "google");
          done();
        });
    });

    it('it should POST the user authentication info but obtain the existing data', (done) => {
      new User({ userId: 12345, accessToken: "user-token-1", provider: "google" }).save();
      chai.request('http://localhost:3000')
        .post('/authenticate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ userID: 12345, provider: "google"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.deep.property("accessToken");
          res.body.should.have.deep.property("provider", "google");
          done();
        });
    });

    it('it should POST the user authentication info and obtain the updated data', (done) => {
      new User({ userId: 12345, accessToken: "user-token-1", provider: "google" }).save();
      chai.request('http://localhost:3000')
        .post('/authenticate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ userID: 12345, provider: "facebook"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.deep.property("accessToken");
          res.body.should.have.deep.property("provider", "facebook");
          done();
        });
    });

  });
});

