'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: {
    type: String,
    required: "Room name is mandatory."  
  },
  coordinate: {
    type: String,
    required: "Room coordinate is mandatory."
  },
  description: {
    type: String
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

module.exports = mongoose.model('Rooms', RoomSchema);

