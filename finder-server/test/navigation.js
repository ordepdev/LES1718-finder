"use strict";

process.env.NODE_ENV = "test";

const Neo4j = require("../neo4j");
const session = Neo4j.db.session();
const Routes = require('../models/routes');
const chai = require('chai');
const http = require('chai-http');
const server = require('../server').default;
const should = chai.should();
chai.use(http);

describe('Navigation', () => {

  beforeEach(function(done){
    session.run('CREATE (B001:CLASSROOM {code : "B001", coordinate: "41.1774890, -8.5951243"})-[:TRAVELS{distance:20}]->(B002:CLASSROOM {code : "B002", coordinate: "41.1774890, -8.5951243"})-[:TRAVELS{distance:10}]->(B003:CLASSROOM {code : "B003", coordinate: "41.1774890, -8.5951243"}) ')
      .then(function(res){
        done();
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  after(function(done) {
    session.close();
    done();
  });

  describe('given two directly connected rooms', () => {
    it('it should return the route path with size two', (done) => {
      chai.request('http://localhost:3000')
        .get('/navigation/from/B001/to/B002')
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
        .get('/navigation/from/B001/to/B003')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.path.should.be.a('array');
          res.body.path.length.should.be.eql(3);
          done();
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

