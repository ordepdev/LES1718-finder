# LES1718: FEUP Finder [![Build Status](https://travis-ci.com/ordepdev/LES1718-finder.svg?token=yJmC8DYmQ3gxwiHEB2wf&branch=master)](https://travis-ci.com/ordepdev/LES1718-finder) [![codecov](https://codecov.io/gh/ordepdev/LES1718-finder/branch/master/graph/badge.svg?token=4BOQHHa4Hk)](https://codecov.io/gh/ordepdev/LES1718-finder) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/ee331492695f4740aab99b2f6c64f309)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ordepdev/LES1718-finder&amp;utm_campaign=Badge_Grade)

> Aims to provide the easiest and shortest path between 2 points inside the FEUP campus.

## Installation process in development

### Software needed
* NodeJS (includes NPM)
* Docker
* Python (with the pymongo package)
* Git (not necessary if the project is downloaded manually)

### Steps 
1. Install the software stated in the [Software needed](https://github.com/ordepdev/LES1718-finder/blob/master/README.md#software-needed) section.
2. Clone the **LES1718-finder** project using the command `git clone https://github.com/ordepdev/LES1718-finder.git` or download it manually [here](https://github.com/ordepdev/LES1718-finder/archive/master.zip).
3. Initialize docker and wait for the instance to be ready.
4. Inside the project root folder, run the command `docker-compose up` to build the necessary state for our container.
5. On the same location, run `python import.py` to seed the database with informations about the points of interest in the FEUP campus.
6. Still on the root folder, run `npm start` to install the client and server dependencies and run both the client and the server.
7. The sistem is now up and running. If the default ports are used, go to [http://localhost:3001](http://localhost:3001) to use Finder FEUP!

### Individual README.md files
* [Client](https://github.com/ordepdev/LES1718-finder/blob/master/finder-client/README.md)

### Troubleshoot
* In order to prevent cross-origin problems, we have a proxy pass in the `package.json` of the client that's configured to look out for `localhost:3000`. If you're running the server on a different port, you need to update the `package.json` at `~/finder-client/` and change the configuration from `"proxy": "http://localhost:3000/"` to `"proxy": "http://localhost:YOUR_PORT_HERE/"`.

## CI/CD Flow
![ci-cd-flow](https://github.com/ordepdev/LES1718-finder/blob/master/ci-cd-process.png)
Currently, we can run both unit and integration tests on Travis CI and get information about the coverage and other quality metrics from Codecov and Codacy. If the build pass, the artifacts are published to Heroku.
