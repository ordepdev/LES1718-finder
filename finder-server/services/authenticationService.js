"use strict";

const User = require('../models/user');

const hasAuthorizationToken = function(request) {
  return !(request.headers.authorization === undefined
    || request.headers.authorization.indexOf(" ") === -1);
};

module.exports = {
  isAuthenticated: function(request, reply, callback) {
    if (!hasAuthorizationToken(request)) {
      return callback(null);
    }

    const token = request.headers.authorization.split(' ')[1];
      
    User.findOne({ 'accessToken': token }, '', function (err, user) {
      if (err) {
        reply({ "message": "error"}).code(400);
      }

      if (user !== null) {
        callback(user);
      } else {
        return reply({
          "message": "No user was found with the following access token: [{token}]"
            .replace("{token}", token)
        }).code(404); 
      }
    });
  }
};
