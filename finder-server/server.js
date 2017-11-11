'use strict';

const Hapi = require('hapi');
const port = process.env.PORT || 3000;
const server = new Hapi.Server();
const mongodb = require('./mongodb');
const rooms = require('./routes/rooms');
const navigation = require("./routes/navigation"); 

server.connection({ port: port, host: 'localhost' });
server.start();

server.route(rooms);
server.route(navigation);

server.register({
  register: require("hapi-and-healthy"),
  options: {
    path: "/health"
  }
});

module.exports = server;
