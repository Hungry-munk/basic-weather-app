export async function validateLocation(cityName, countryName) {
	const geoLocationUrlSearch = `https://api.api-ninjas.com/v1/geocoding?city=
    	${cityName.toLowerCase()}&country=${countryName.toLowerCase()}`;
	const options = {
		method: 'GET',
		mode: 'cors',
		headers: { 'X-Api-Key': 'lYcUcXk1mj5TwE6n3NmVjA==bf4kIYw9tgEzFaZG' },
		contentType: 'application/json'
	};

	try {
		const locationData = await fetch(geoLocationUrlSearch, options);
		return [...(await locationData.json())][0];
	} catch (err) {
		if (err.response.status === 404) {
			console.error('404, location wasnt found');
		} else {
			console.error(err.response.status);
		}
	}
}
