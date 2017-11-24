'use strict';

process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../models/user');
const Room = require('../models/room');
const Favorite = require('../models/favorite');
const chai = require('chai');
const http = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(http);

describe('Favorite', () => {

  before((done) => {
    new User({ userId: 12345, accessToken: "user-token-1", provider: "google" })
      .save(function() {
        new Favorite({code: "R001", user: 12345 })
          .save(function() {
            new Favorite({code: "R002", user: 12345 })
              .save(function() {
                new Room({name: "R001", coordinate: "-8.5957654,41.1777352"})
                  .save(function() {
                    new Room({name: "R003", coordinate: "-8.5957654,41.1777352"})
                      .save(function() {
                        done();
                      });
                  });
              });
          });
      });
  });

  after((done) => {
    Favorite.remove({}, (err) => { 
      User.remove({}, (err) => {
        Room.remove({}, (err) => { 
          done();
        });
      });        
    });
  });

  describe('given a valid user with favorites', () => {
    it('it should GET all favorite records', (done) => {
      chai.request('http://localhost:3000')
        .get('/favorites')
        .set('authorization', 'basic user-token-1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });

    it('it should return a 409 when POST existing favorite', (done) => {
      chai.request('http://localhost:3000')
        .post('/favorites/R001')
        .set('authorization', 'basic user-token-1')
        .end((err, res) => {
          res.should.have.status(409)
          done();
        });
    });

    it('it should return a 201 when POST new favorite', (done) => {
      chai.request('http://localhost:3000')
        .post('/favorites/R003')
        .set('authorization', 'basic user-token-1')
        .end((err, res) => {
          res.should.have.status(201)
          done();
        });
    });

    it('it should return a 204 when DELETE existing favorite', (done) => {
      chai.request('http://localhost:3000')
        .delete('/favorites/R001')
        .set('authorization', 'basic user-token-1')
        .end((err, res) => {
          res.should.have.status(204)
          done();
        });
    });
  });

  describe('given a request without authorization header', () => {
    it('it should return an unauthorized error', (done) => {
      chai.request('http://localhost:3000')
        .get('/favorites')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('given a request with an invalid user', () => {
    it('it should return a not found error', (done) => {
      chai.request('http://localhost:3000')
        .get('/favorites')
        .set('authorization', 'basic user-token-2')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

