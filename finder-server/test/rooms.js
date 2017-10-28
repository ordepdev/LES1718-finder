'use strict';

process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Room = require('../models/room');
const chai = require('chai');
const http = require('chai-http');
const server = require('../server').default;
const should = chai.should();
chai.use(http);

describe('Rooms', () => {
  beforeEach((done) => {
    Room.remove({}, (err) => { 
       done();         
    });     
  });

  after(function(){
    mongoose.connection.close()
    process.exit();
  });

  describe('/GET rooms', () => {
    it('it should GET all the rooms', (done) => {
      new Room({name: "B101", coordinate: "-8.5957654,41.1777352"}).save();
      new Room({name: "B102", coordinate: "-8.5957654,41.1777352"}).save();
      chai.request('http://localhost:3000')
        .get('/rooms')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });

    it('it should GET a room with a given name', (done) => {
      new Room({name: "B101", coordinate: "-8.5957654,41.1777352"}).save();
      new Room({name: "B102", coordinate: "-8.5957654,41.1777352"}).save();
      chai.request('http://localhost:3000')
        .get('/rooms/B101')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.deep.property("name", "B101");
          done();
        });
    });

    it('it should return a 404 when no room is found', (done) => {
      chai.request('http://localhost:3000')
        .get('/rooms/B101')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

