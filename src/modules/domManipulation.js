import * as API from './apiFunctions';

export function displaySearchError(message) {
    const errorMsgElement = document.querySelector('.errorMsg');
    errorMsgElement.textContent = message;
    setTimeout(() => {
        errorMsgElement.textContent = '';
    }, 1500);
}

export function displayWeatherData(apiData) {
    console.log(apiData);
    // seperating data
    const locationData = apiData.locationData;
    const imageData = apiData.imageData;
    const weatherData = apiData.weatherData;
    // gathering elements to show the data
    const infoContainer = document.querySelector('.infoContainer');
    const locationTitle = document.querySelector('.locationTitle');
    const weatherInfoContainer = document.querySelector('.weatherInfoContainer');
    const imageCreadits = document.querySelector('.imageCredits');

    infoContainer.style.backgroundImage = `url("${imageData.imageUrl}")`;
    locationTitle.textContent = `${locationData.city}, ${locationData.state}`;
    imageCreadits.innerHTML = `
        image by ${imageData.creatorDetails.firstName} ${imageData.creatorDetails.lastName} 
        on <a target="_blank" href="${imageData.creatorDetails.accountLink}">unsplash</a> 
    `;
}
