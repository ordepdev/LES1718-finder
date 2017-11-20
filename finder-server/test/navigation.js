"use strict";

process.env.NODE_ENV = "test";

const Neo4j = require("../neo4j");
const session = Neo4j.db.session();
const User = require('../models/user');
const Routes = require('../models/routes');
const History = require('../models/history');
const chai = require('chai');
const http = require('chai-http');
const server = require('../server').default;
const should = chai.should();
chai.use(http);

describe('Navigation', () => {

  before(function(done) {
    new User({ userId: 12345, accessToken: "user-token-1", provider: "google" })
      .save(function() {
        done();
      });
  });

  beforeEach(function(done) {
    session.run('CREATE (R001:CLASSROOM {code : "R001", coordinate: ' +
      '"41.1774890, -8.5951243"})-[:TRAVELS{distance:20}]->(R002:CLASSROOM ' +
      '{code : "R002", coordinate: "41.1774890, -8.5951243"})-[' +
      ':TRAVELS{distance:10}]->(R003:CLASSROOM {code : "R003", ' + 
      'coordinate: "41.1774890, -8.5951243"})')
      .then(function(res){
        done();
      });
  });

  afterEach(function(done) {
    session.run('MATCH (R001{code:"R001"}),(R002{code:"R002"})' +
      ',(R003{code:"R003"}) DETACH DELETE R001, R002, R003')
      .then(function(res){
        done();
      });
  });

  after(function(done) {
    session.close();
    History.remove({}, (err) => { 
      User.remove({}, (err) => {
        done();
      });        
    });
  });

  describe('given two directly connected rooms', () => {
    it('it should return the route path with size two', (done) => {
      chai.request('http://localhost:3000')
        .get('/navigation/from/R001/to/R002')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.path.should.be.a('array');
          res.body.path.length.should.be.eql(2);
          done();
        });
    });
  });

  describe('given two indirectly connected rooms', () => {
    it('it should return the route path with size three', (done) => {
      chai.request('http://localhost:3000')
        .get('/navigation/from/R001/to/R003')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.path.should.be.a('array');
          res.body.path.length.should.be.eql(3);
          done();
        });
    });
  });

  describe('given a authenticated navigation request', () => {
    it('it should save the request into history', (done) => {
      chai.request('http://localhost:3000')
        .get('/navigation/from/R001/to/R002')
        .set('authorization', 'basic user-token-1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.path.should.be.a('array');
          res.body.path.length.should.be.eql(2);
          History.find({ user: 12345 }, function(err, response) {
            response.should.be.a('array');
            response.length.should.be.eql(1);
            done();
          });
        });
    });
  });

  describe('given two rooms that are not connected', () => {
    it('it should return 404 route not found', (done) => {
      chai.request('http://localhost:3000')
        .get('/navigation/from/A001/to/A002')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

