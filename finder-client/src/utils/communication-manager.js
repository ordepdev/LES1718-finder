import { SERVER_ENDPOINT_URL } from '../constants/configuration';

/**
 * Requests a shortest Path .
 * @param [*] rooms POI name.
 */
export function getPath(local, destination) {
	return new Promise(function (resolve, reject) {

		let requestUrl = "/navigation/from/" + local + "/to/" + destination;
		console.log(requestUrl);
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
				let errorMessage = "";

				switch (response.status) {
					case 404:
						errorMessage = "No rooms found."
						break;
					default:
						errorMessage = "An error has occurred! Please try again."
						break;
				}

				return reject(Error(errorMessage));
			}
		}, function (error) {
			return reject(error);
		});
	});
}

/**
 * Requests a single POI.
 * @param {*} room POI name.
 */
export function getRoom(room) {
	return new Promise(function (resolve, reject) {

		let requestUrl = "/rooms/" + room;

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
				let errorMessage = "";

				switch (response.status) {
					case 404:
						errorMessage = "No rooms found."
						break;
					default:
						errorMessage = "An error has occurred! Please try again."
						break;
				}

				return reject(Error(errorMessage));
			}
		}, function (error) {
			return reject(error);
		});
	});
}

/**
 * Gets the authentication info.
 * @param {*} secret Secret (access token) used to authenticate the user.
 */
export function getAuthInfo(secret) {
	return new Promise(function (resolve, reject) {

		let requestUrl = "/authentication";

		let requestOptions = {
			uri: requestUrl,
			method: "GET",
			headers: {
				'Authorization': 'Basic ' + secret,
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
 * Authenticates an user.
 * @param {*} userID User id.
 * @param {*} provider Provider the user used to login.
 */
export function authenticateUser(userID, provider) {
	return new Promise(function (resolve, reject) {

		let requestUrl = "/authenticate";

		let requestOptions = {
			uri: requestUrl,
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'pragma': 'no-cache',
				'cache-control': 'no-cache'
			},
			body: JSON.stringify({ "userID": userID, "provider": provider})
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