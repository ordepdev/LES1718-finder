import logging
from io import open
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO)
client = MongoClient('mongodb://localhost:27017/')
database = client['finder']

# always start with a fresh state
logging.info("Deleting collection rooms.")
database.rooms.drop()
assert database.rooms.count() == 0, "Collection rooms was not deleted!"

with open('coordinates') as f:
  for row in f:
    # row format should be: "{name}:{coordinate}"
    data = row.split(":")
    name = data[0]
    coordinates = data[1]
    
    logging.info("Inserting room: {0}:{1}...".format(name, coordinates))
    id = database.rooms.insert_one({"name": name, "coordinates": coordinates}).inserted_id
    logging.info("Inserted room: {0}:{1} with id {2}.".format(name, coordinates, id))

