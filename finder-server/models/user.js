'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: String,
    required: "User id is mandatory."
  },
  accessToken: {
    type: String,
    required: "Access token is mandatory"
  },
  provider: {
    type: String,
    required: "Provider is mandatory"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);