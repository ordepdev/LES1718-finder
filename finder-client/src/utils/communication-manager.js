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