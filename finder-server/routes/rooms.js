'use strict';

const Room = require('../models/room');

module.exports = [
  {
    method: 'GET',
    path: '/rooms',
    handler(request, reply) {
      Room.find({}, '', function(err, rooms) {
        if (err) {
          throw err;
        }
        reply(rooms);
      });
    }
  },
  {
    method: 'GET',
    path: '/rooms/{name}',
    handler(request, reply) {
      Room.findOne({'name': request.params.name}, '', function(err, room) {
        if (err) {
          throw err;
        }
        if (room === null) {
          return reply({
            "message": "Room [{room}] was not found."
              .replace("{room}", request.params.name)
          }).code(404);  
        }
        reply(room).code(200);
      });
    }
  } 
];

