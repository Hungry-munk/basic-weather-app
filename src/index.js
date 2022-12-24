import * as API from './modules/apiFunctions';

// API.getLocationData('melbourne', 'AU')
// 	.then((response) => {
// 		console.log(response);
// 		return Promise.all([
// 			API.getLocationWatherData(response.latitude, response.longitude),
// 			API.getLocationImageData(response.name, response.state)
// 		]);
// 	})
// 	.then((response) => {
// 		console.log(response);
// 	});

API.getProcessedApiData('melbourne', 'AU').then((response) =>
	console.log(response)
);
