"use strict";

const History = require("../models/history");
const AuthenticationService = require("../services/authenticationService");

module.exports = [
  {
    method: "GET",
    path: "/history",
    handler(request, reply) {
      AuthenticationService.isAuthenticated(request, reply, function(user) {
        if (!user) {
          return reply({ message: "No valid access token was found."}).code(401);
        }

        History.find({ user: user.userId }, "from to createdAt", function(err, response) {
          return reply(response).code(200);
        });
      });
    }
  }
];
