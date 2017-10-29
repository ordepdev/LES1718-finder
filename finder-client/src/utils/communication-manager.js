import { SERVER_ENDPOINT_URL } from '../constants/configuration';

/**
 * Requests a single POI.
 * @param {*} room POI name.
 */
function getRoom(room) {
    return new Promise(function (resolve, reject) {

        let requestUrl = SERVER_ENDPOINT_URL + "/rooms/" + room;

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache'
            }
        }

        fetch(requestUrl, requestOptions).then(function (response) {
            if (response.status === 200) {
                return resolve(response.json());
            } else {
                return reject(Error("An error has occurred! Please try again."));
            }
        }, function (error) {
            return reject(error);
        });
    });
}

/**
 * Get all POI's.
 */
function getAllRooms() {
    return new Promise(function (resolve, reject) {

        let requestUrl = "/rooms";

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache'
            }
        }

        fetch(requestUrl, requestOptions).then(function (response) {
            if (response.status === 200) {
                return resolve(response.json());
            } else {
                return reject(Error("An error has occurred! Please try again."));
            }
        }, function (error) {
            return reject(error);
        });
    });
}

module.exports = {
    getRoom,
    getAllRooms
}