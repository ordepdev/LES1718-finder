'use strict';

const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || "mongodb://localhost/finder";

mongoose.Promise = global.Promise;
mongoose.connect(url, {
  useMongoClient: true
});
