'use strict';

process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../models/user');
const History = require('../models/history');
const chai = require('chai');
const http = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(http);

describe('History', () => {

  before((done) => {
    new User({ userId: 12345, accessToken: "user-token-1", provider: "google" })
      .save(function() {
        new History({from: "R001", to: "R002", user: 12345 })
          .save(function() {
            new History({from: "R001", to: "R003", user: 12345 })
              .save(function() {
                done();
              });
          });
      });
  });

  after((done) => {
    History.remove({}, (err) => { 
      User.remove({}, (err) => {
        done();
      });        
    });
  });

  describe('given a valid user with navigation history', () => {
    it('it should GET all history records', (done) => {
      chai.request('http://localhost:3000')
        .get('/history')
        .set('authorization', 'basic user-token-1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe('given a request without authorization header', () => {
    it('it should return an unauthorized error', (done) => {
      chai.request('http://localhost:3000')
        .get('/history')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('given a request with an invalid user', () => {
    it('it should return a not found error', (done) => {
      chai.request('http://localhost:3000')
        .get('/history')
        .set('authorization', 'basic user-token-2')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

