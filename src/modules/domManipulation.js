import * as API from './apiFunctions';
import { convertImperical } from './unitConversion';

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
    weatherInfoContainer.innerHTML = `
        <div class="mainDetailsContainer">
            <img alt="${weatherData.descriptionDetails.main}" src=
            "https://openweathermap.org/img/w/${weatherData.descriptionDetails.icon}.png">

            <div class="tempContainer">${Math.round(weatherData.temperatureDetails.temp)}</div>
               
            <div class="weatherDescription">${weatherData.descriptionDetails.description}</div>
        </div> 

        <div class="otherDetailsContainer">
            <div>
                <span>Feels like: </span>
                <span class="tempContainer">${Math.round(
                    weatherData.temperatureDetails.feels_like
                )}</span>
            </div>

            <div>
                <span>Max temp: </span>
                <span class="tempContainer">${Math.round(
                    weatherData.temperatureDetails.temp_max
                )}</span>
            </div>
            <div>
                <span>Min temp: </span>
                <span class="tempContainer">${Math.round(
                    weatherData.temperatureDetails.temp_min
                )}</span>
            </div>
            <div>
                <span>Wind: </span>
                <span class="distanceContainer"> ${Math.round(weatherData.windDetails.speed)}</span>
            </div>
        </div>
        
    `;

    const unitSwitch = document.querySelector('.unitSwitch');
    const switchState = unitSwitch.checked;
    if (switchState) {
        // imperical
        convertImperical();
    }
}
