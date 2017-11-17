"use strict";

module.exports = [
  {
    method: "GET",
    path: "/authentication/{userID}/{provider}",
    handler(request, reply) {
      return reply({ accessToken: "123", provider: request.params.provider }).code(200);
    }
  }
];

