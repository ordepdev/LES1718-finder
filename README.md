# LES1718: FEUP Finder [![Build Status](https://travis-ci.com/ordepdev/LES1718-finder.svg?token=yJmC8DYmQ3gxwiHEB2wf&branch=master)](https://travis-ci.com/ordepdev/LES1718-finder) [![codecov](https://codecov.io/gh/ordepdev/LES1718-finder/branch/master/graph/badge.svg?token=4BOQHHa4Hk)](https://codecov.io/gh/ordepdev/LES1718-finder) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/ee331492695f4740aab99b2f6c64f309)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ordepdev/LES1718-finder&amp;utm_campaign=Badge_Grade)

> Aims to provide the easiest and shortest path between 2 points inside the FEUP campus.

## Installation process in development

### Software needed
* NodeJS (includes NPM)
* Docker
* Python (with the pymongo package)
* Git (not necessary if the project is downloaded manually)

### Steps 
1. Install the software stated in the **Software needed** section.
2. Clone the **LES1718-finder** project using the command `git clone https://github.com/ordepdev/LES1718-finder.git` or download it manually [here](https://github.com/ordepdev/LES1718-finder/archive/master.zip).
3. Initialize docker and wait for the instance to be ready.
4. Inside the project root folder, run the command `docker-compose up` to build the necessary state for our container.
5. On the same location, run `python import.py` to seed the database with informations about the points of interest in the FEUP campus.
6. Go to `~/finder-server/` and run the following commands in sequence: `npm install` and `npm start`. This will install all the dependencies and run the server on the port `3000`.
7. Go to `~/finder-client/` and run the following commands in sequence: `npm install` and `npm start`. This will install all the dependencies and run the client on the port `3001`.
8. The sistem is now up and running. If the default ports are used, go to [http://localhost:3001](http://localhost:3001) to use Finder FEUP!

### Troubleshoot
* In order to prevent cross-origin problems, we have a proxy pass in the `package.json` of the client that's configured to look out for `localhost:3000`. If you're running the server on a different port, you need to update the `package.json` at `~/finder-client/` and change the configuration from `"proxy": "http://localhost:3000/"` to `"proxy": "http://localhost:YOUR_PORT_HERE/"`.
