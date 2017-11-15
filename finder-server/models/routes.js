"use strict";

const Neo4j = require("../neo4j");
const session = Neo4j.db.session();

module.exports = {
  route: function(a, b, callback) {
    const query = [
      "MATCH (a {code:{startCode}}), (b {code:{endCode}})",
      "MATCH path=(a)-[:TRAVELS*]-(b)",
      "WITH path, reduce(s = 0, r IN rels(path) | s + r.distance) AS distance",
      "RETURN NODES(path) as path, distance ORDER BY distance ASC",
      "LIMIT 1"
    ].join("\n");

    const params = {
      startCode: a,
      endCode: b
    };

    session.run(query, params)
      .then(function (result) {
        const distance = result.records
          .map(r => r.get("distance"));
        const path = result.records
          .map(r => r.get("path"))
          .reduce(function(a,b) {
            return a.concat(b);
          }, [])
          .map(node => node.properties)
        const response = {
          path: path,
          distance: distance
        };
        session.close();
        callback(response);
      });
  }
}
