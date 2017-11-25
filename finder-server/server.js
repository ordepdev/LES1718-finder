'use strict';

const Hapi = require('hapi');
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
const server = new Hapi.Server();
const mongodb = require('./mongodb');
const rooms = require('./routes/rooms');
const navigation = require("./routes/navigation");
const authentication = require('./routes/authentication');
const history = require('./routes/history');
const favorites= require('./routes/favorites');

server.connection({ port: port, host: host });
server.start();

server.route(rooms);
server.route(history);
server.route(favorites);
server.route(navigation);
server.route(authentication);

server.register({
  register: require("hapi-and-healthy"),
  options: {
    path: "/health"
  }
});

module.exports = server;
