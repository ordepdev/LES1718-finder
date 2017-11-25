"use strict";

const Room = require("../models/room");
const Favorite = require("../models/favorite");
const AuthenticationService = require("../services/authenticationService");

module.exports = [
  {
    method: "GET",
    path: "/favorites",
    handler(request, reply) {
      AuthenticationService.isAuthenticated(request, reply, function(user) {
        if (!user) {
          return reply({ message: "No valid access token was found."}).code(401);
        }

        Favorite.find({ user: user.userId }, function(err, response) {
          return reply(response).code(200);
        });
      });
    }
  },
  {
    method: "POST",
    path: "/favorites/{code}",
    handler(request, reply) {
      AuthenticationService.isAuthenticated(request, reply, function(user) {
        if (!user) {
          return reply({ message: "No valid access token was found."}).code(401);
        }
        
        Room.findOne({'name': request.params.code}, '', function(err, room) {
          if (room === null) {
            return reply({
              "message": "Room [{room}] was not found."
                .replace("{room}", request.params.name)
            }).code(404);  
          }

          Favorite.findOne({ code: request.params.code, user: user.userId }, function(err, favorite) {
            if (favorite) {
              return reply({ message: "Room was already marked as favorite."}).code(409);
            }
            new Favorite({ code: request.params.code, user: user.userId }).save(function(err, favorite) {
              return reply(favorite).code(201);
            }); 
          });
        });
      });
    }
  },
  {
    method: "DELETE",
    path: "/favorites/{code}",
    handler(request, reply) {
      AuthenticationService.isAuthenticated(request, reply, function(user) {
        if (!user) {
          return reply({ message: "No valid access token was found."}).code(401);
        }
        
        Room.findOne({'name': request.params.code}, '', function(err, room) {
          if (room === null) {
            return reply({
              "message": "Room [{room}] was not found."
                .replace("{room}", request.params.name)
            }).code(404);  
          }

          Favorite.remove({ code: request.params.code, user: user.userId }, function(err) {
            return reply().code(204);
          });
        });
      });
    }
  }
];
