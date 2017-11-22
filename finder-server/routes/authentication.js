"use strict";

var hat = require('hat');
const User = require('../models/user');

module.exports = [
  {
    method: "GET",
    path: "/authentication",
    handler(request, reply) {
      if (request.headers.authorization === undefined || request.headers.authorization.indexOf(' ') === -1) {
        return reply({ message: "No valid access token was found." }).code(400);
      }

      var accessToken = request.headers.authorization.split(' ')[1];
      
      User.findOne({ 'accessToken': accessToken }, '', function (err, user) {
        if (err) {
          reply({ "message": "error"}).code(400);
        }

        if (user !== null) {
          reply({ accessToken: user.accessToken, provider: user.provider }).code(200);
        } else {
          return reply({
            "message": "No user was found with the following access token: [{token}]"
              .replace("{token}", accessToken)
          }).code(404); 
        }
      });
    }
  },
  {
    method: "POST",
    path: "/authenticate",
    handler(request, reply) {
      User.findOne({ 'userId': request.payload.userID }, '', function (err, user) {
        if (err) {
          reply({ "message": "error"}).code(400);
        }

        if (user === null) {
          var newUser = User({
            userId: request.payload.userID.toString(),
            accessToken: hat(),
            provider: request.payload.provider.toString()
          });

          newUser.save(function (err) {
            if (err) {
              reply({ "message": "error"}).code(400);
            } else {
              reply({ accessToken: newUser.accessToken, provider: newUser.provider }).code(200);
            }
          });
        } else {
          if (user.provider === request.payload.provider) {
            reply({ accessToken: user.accessToken, provider: user.provider }).code(200);
          } else {
            user.provider = request.payload.provider;

            user.save(function (err) {
              if (err) {
                reply({ "message": "error"}).code(400);
              } else {
                reply({ accessToken: user.accessToken, provider: user.provider }).code(200);
              }
            });
          }
        }
      });
    }
  }
];
