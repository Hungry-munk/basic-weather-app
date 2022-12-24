export async function getLocationData(cityName, countryName) {
	const geoLocationUrl = `https://api.api-ninjas.com/v1/geocoding?city=
    	${cityName.toLowerCase()}&country=${countryName.toLowerCase()}`;
	const options = {
		method: 'GET',
		mode: 'cors',
		headers: { 'X-Api-Key': 'lYcUcXk1mj5TwE6n3NmVjA==bf4kIYw9tgEzFaZG' },
		contentType: 'application/json'
	};

	try {
		const locationData = await fetch(geoLocationUrl, options);
		return [...(await locationData.json())][0];
	} catch (err) {
		if (err.response.status === 404) {
			console.error('404, location wasnt found');
		} else {
			console.error(err.response.status);
		}
	}
}

export async function getLocationWatherData(lat, lon) {
	const apiKey = '4bd5549e876d085c663fab0828114f71';
	const openWatherUrl = `https://api.openweathermap.org/data/2.5/weather
		?lat=${lat}&lon=${lon}&appid=${apiKey}`;

	const options = {
		method: 'GET',
		mode: 'cors',
		contentType: 'application/json'
	};

	try {
		const locationData = await fetch(openWatherUrl, options);
		return await locationData.json();
	} catch (err) {
		if (err.response.status === 404) {
			console.error('404, location wasnt found');
		} else {
			console.error(err.response.status);
		}
	}
}

export async function getLocationImageData(cityName, stateName) {
	const apiKey = 'h6q1ZKjtqBKWTh3vLos8P11kdnF6x7T_Ap0G-eEoYEg';
	const unsplashUrl = `https://api.unsplash.com/photos/random
		?query=${cityName} ${stateName}&orientation=landscape&client_id=${apiKey}`;
	const options = {
		method: 'GET',
		mode: 'cors',
		contentType: 'application/json'
	};

	try {
		const imageData = await fetch(unsplashUrl, options);
		return await imageData.json();
	} catch (err) {
		console.error(err);
	}
}

export async function getProcessedApiData(cityName, country) {
	const locationData = await getLocationData(cityName, country);
	// trying out cool deconstruciton syntax
	const [weatherData, imageData] = await Promise.all([
		getLocationWatherData(locationData.latitude, locationData.longitude),
		getLocationImageData(locationData.name, locationData.state)
	]);

	return {
		weatherData,
		imageData
	};
}
