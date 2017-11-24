"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoritesSchema = new Schema({
  code: {
    type: String,
    required: "Point of interest is mandatory."
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
    "Favorites",
    FavoritesSchema,
    "favorites"
);
