"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  from: {
    type: String,
    required: "From (point) is mandatory."
  },
  to: {
    type: String,
    required: "To (point) is mandatory."
  },
  user: {
    type: String,
    required: "User is mandatory."
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

module.exports = mongoose.model(
    "NavigationHistory",
    HistorySchema,
    "navigationHistory"
);
