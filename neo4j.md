# Node Labels
* ENTRANCE: it should list all entrances;
* CORRIDOR: it should list all corridors;
* CLASSROOMS: it should list all classrooms;
* STAIRS: it should list all stairs;
* BATHROOM: it should list all bathrooms;

# Node Relationships
* TRAVELS: connection between point A and B. It should have a `distance` property.

# How to create nodes

```
CREATE
    (E01:ENTRANCE { code: "E01", coordinate: "41.1774821, -8.5950999" }),
    (C01:CORRIDOR {code : "C01", coordinate: "41.1774890, -8.5951243"})
```

# How to create relationships between existant nodes

```
MATCH (E01 {code:'E01'}), (C01 {code:'C01'})
CREATE (E01)-[:TRAVELS{distance:0}]->(C01)
```

