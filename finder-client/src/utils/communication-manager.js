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
 * Authenticates an user.
 * @param {*} userID User id.
 * @param {*} provider Provider the user used to login.
 */
export function authenticateUser(userID, provider) {
	return new Promise(function (resolve, reject) {

		let requestUrl = "/authentication/" + userID + "/" + provider;

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
 * Logs out the user.
 */
export function logoutUser() {
	return new Promise(function (resolve, reject) {

		let requestUrl = "/logout";

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
				return resolve();
			} else {
				return reject(Error("An error has occurred! Please try again."));
			}
		}, function (error) {
			return reject(error);
		});
	});
}