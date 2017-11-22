"use strict";

const Navigation = require("../models/routes");
const History = require("../models/history");
const AuthenticationService = require("../services/authenticationService");

module.exports = [
  {
    method: "GET",
    path: "/navigation/from/{start}/to/{end}",
    handler(request, reply) {
      Navigation.route(request.params.start,
        request.params.end, function(response) {
        if (!response.path.length) {
          return reply({ message: "Route not found."}).code(404);
        }
        AuthenticationService.isAuthenticated(request, reply, function(user) {
          if (user) {
            new History({
              from: request.params.start,
              to: request.params.end,
              user: user.userId
            }).save();    
          }
        });
        return reply(response).code(200);
      });
    }
  }
];
