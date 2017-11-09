"use strict";

const Navigation = require("../models/routes");

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
        return reply(response).code(200);
      });
    }
  }
];

