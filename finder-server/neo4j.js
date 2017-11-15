"use strict";

const neo4j = require('neo4j-driver').v1;
const url = process.env.GRAPHENEDB_BOLT_URL || "bolt://localhost";
const user = process.env.GRAPHENEDB_BOLT_USER || "neo4j";
const password = process.env.GRAPHENEDB_BOLT_PASSWORD || "neo4j";
const db = neo4j.driver(url, neo4j.auth.basic(user, password)); 

module.exports = {
  db
};
