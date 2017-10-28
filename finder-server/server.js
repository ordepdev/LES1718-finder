'use strict';

const Hapi = require('hapi');
const port = process.env.PORT || 3000;
const server = new Hapi.Server();
const mongodb = require('./mongodb');
const rooms= require('./routes/Rooms');

server.connection({ port: port, host: 'localhost' });
server.start((err) => {
  if (err) {
    throw err;
  }
});

server.route(rooms);

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.register({
  register: require("hapi-and-healthy"),
  options: {
    path: "/health"
  }
});

module.exports = server;

