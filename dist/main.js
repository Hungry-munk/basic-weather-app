/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/apiFunctions.js":
/*!*************************************!*\
  !*** ./src/modules/apiFunctions.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterApiData": () => (/* binding */ filterApiData),
/* harmony export */   "getCompleteApiData": () => (/* binding */ getCompleteApiData),
/* harmony export */   "processSearch": () => (/* binding */ processSearch)
/* harmony export */ });
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManipulation */ "./src/modules/domManipulation.js");


async function getLocationData(cityName, countryName) {
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

async function getLocationWatherData(lat, lon) {
    const apiKey = '4bd5549e876d085c663fab0828114f71';
    const openWatherUrl = `https://api.openweathermap.org/data/2.5/weather
		?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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

async function getLocationImageData(cityName, stateName) {
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

async function getCompleteApiData(cityName, country) {
    const locationData = await getLocationData(cityName, country);
    try {
        // trying out cool deconstruciton syntax
        const [weatherData, imageData] = await Promise.all([
            getLocationWatherData(locationData.latitude, locationData.longitude),
            getLocationImageData(locationData.name, locationData.state)
        ]);

        return {
            dataStatus: true,
            completeLocationData: locationData,
            completeWeatherData: weatherData,
            completeimageData: imageData
        };
    } catch (err) {
        console.error(new Error('location not found'));
        return {
            dataStatus: false
        };
    }
}

function filterApiData(completeApiData) {
    const { completeWeatherData } = completeApiData;
    const completeImageData = completeApiData.completeimageData;
    const { completeLocationData } = completeApiData;
    // returning data I actaully need
    return {
        locationData: {
            city: completeLocationData.name,
            state: completeLocationData.state
        },
        weatherData: {
            temperatureDetails: completeWeatherData.main,
            descriptionDetails: completeWeatherData.weather[0],
            windDetails: completeWeatherData.wind
        },
        imageData: {
            imageUrl: completeImageData.urls.small,
            altDescription: completeImageData.alt_description,
            creatorDetails: {
                firstName: completeImageData.user.first_name,
                lastName: completeImageData.user.last_name,
                accountLink: completeImageData.user.links.html
            }
        }
    };
}

async function processSearch() {
    const cityNameValue = document.querySelector('#cityName').value;
    const IsoValue = document.querySelector('#isoCode').value;
    const regex = /^\s*$/g;
    if (regex.test(IsoValue || cityNameValue)) {
        _domManipulation__WEBPACK_IMPORTED_MODULE_0__.displaySearchError('must enter both values');
    } else {
        const completeApiData = await getCompleteApiData(cityNameValue, IsoValue);
        if (completeApiData.dataStatus) {
            _domManipulation__WEBPACK_IMPORTED_MODULE_0__.displayWeatherData(filterApiData(completeApiData));
        } else {
            _domManipulation__WEBPACK_IMPORTED_MODULE_0__.displaySearchError('location not found');
        }
    }
}


/***/ }),

/***/ "./src/modules/domManipulation.js":
/*!****************************************!*\
  !*** ./src/modules/domManipulation.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displaySearchError": () => (/* binding */ displaySearchError),
/* harmony export */   "displayWeatherData": () => (/* binding */ displayWeatherData)
/* harmony export */ });
/* harmony import */ var _apiFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiFunctions */ "./src/modules/apiFunctions.js");
/* harmony import */ var _unitConversion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unitConversion */ "./src/modules/unitConversion.js");



function displaySearchError(message) {
    const errorMsgElement = document.querySelector('.errorMsg');
    errorMsgElement.textContent = message;
    setTimeout(() => {
        errorMsgElement.textContent = '';
    }, 1500);
}

function displayWeatherData(apiData) {
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
        (0,_unitConversion__WEBPACK_IMPORTED_MODULE_1__.convertImperical)();
    }
}


/***/ }),

/***/ "./src/modules/unitConversion.js":
/*!***************************************!*\
  !*** ./src/modules/unitConversion.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertImperical": () => (/* binding */ convertImperical),
/* harmony export */   "convertMetric": () => (/* binding */ convertMetric)
/* harmony export */ });
function celsiusToFarenheit(number) {
    return Math.round((number * 9) / 5.0 + 32.0);
}
function FarenheitToCelsus(number) {
    return Math.round(((number - 32.0) * 5.0) / 9.0);
}
function mileToKilometer(number) {
    return Math.round(number / 1.6);
}
function kilometerToMile(number) {
    return Math.round(number * 1.6);
}

function convertMetric() {
    const tempContainers = [...document.querySelectorAll('.tempContainer')];
    const distanceContainer = document.querySelector('.distanceContainer');
    tempContainers.forEach((container) => {
        container.textContent = FarenheitToCelsus(parseInt(container.textContent));
    });
    distanceContainer.textContent = mileToKilometer(parseInt(distanceContainer.textContent));
}

function convertImperical() {
    const tempContainers = [...document.querySelectorAll('.tempContainer')];
    const distanceContainer = document.querySelector('.distanceContainer');
    tempContainers.forEach((container) => {
        container.textContent = celsiusToFarenheit(parseInt(container.textContent));
    });
    distanceContainer.textContent = kilometerToMile(parseInt(distanceContainer.textContent));
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/apiFunctions */ "./src/modules/apiFunctions.js");
/* harmony import */ var _modules_unitConversion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/unitConversion */ "./src/modules/unitConversion.js");



const searchIcon = document.querySelector('.fa-searchengin');
const citySearch = document.querySelector('#cityName');
const isoSearch = document.querySelector('#isoCode');
const unitSwitch = document.querySelector('.unitSwitch');
// setting up event listeners
searchIcon.addEventListener('click', _modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.processSearch);
citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        _modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.processSearch();
    }
});
isoSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        _modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.processSearch();
    }
});

unitSwitch.addEventListener('change', () => {
    const switchState = unitSwitch.checked;
    if (switchState) {
        // imperical
        (0,_modules_unitConversion__WEBPACK_IMPORTED_MODULE_1__.convertImperical)();
    } else {
        // metric
        (0,_modules_unitConversion__WEBPACK_IMPORTED_MODULE_1__.convertMetric)();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQzZCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnRUFBaUI7QUFDdEQ7QUFDQTtBQUNBLFFBQVEsZ0VBQWlCO0FBQ3pCO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxRQUFRLGdFQUFpQjtBQUN6QjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5RUFBZ0I7QUFDeEIsTUFBTTtBQUNOO0FBQ0EsUUFBUSxzRUFBYTtBQUNyQjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2FwaUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2RvbU1hbmlwdWxhdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL3VuaXRDb252ZXJzaW9uLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRE9NIGZyb20gJy4vZG9tTWFuaXB1bGF0aW9uJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uRGF0YShjaXR5TmFtZSwgY291bnRyeU5hbWUpIHtcclxuICAgIGNvbnN0IGdlb0xvY2F0aW9uVXJsID0gYGh0dHBzOi8vYXBpLmFwaS1uaW5qYXMuY29tL3YxL2dlb2NvZGluZz9jaXR5PVxyXG4gICAgXHQke2NpdHlOYW1lLnRvTG93ZXJDYXNlKCl9JmNvdW50cnk9JHtjb3VudHJ5TmFtZS50b0xvd2VyQ2FzZSgpfWA7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgJ1gtQXBpLUtleSc6ICdsWWNVY1hrMW1qNVR3RTZuM05tVmpBPT1iZjRrSVl3OXRnRXpGYVpHJyB9LFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBmZXRjaChnZW9Mb2NhdGlvblVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIFsuLi4oYXdhaXQgbG9jYXRpb25EYXRhLmpzb24oKSldWzBdO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgaWYgKGVyci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCc0MDQsIGxvY2F0aW9uIHdhc250IGZvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uV2F0aGVyRGF0YShsYXQsIGxvbikge1xyXG4gICAgY29uc3QgYXBpS2V5ID0gJzRiZDU1NDllODc2ZDA4NWM2NjNmYWIwODI4MTE0ZjcxJztcclxuICAgIGNvbnN0IG9wZW5XYXRoZXJVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXJcclxuXHRcdD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHthcGlLZXl9JnVuaXRzPW1ldHJpY2A7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25EYXRhID0gYXdhaXQgZmV0Y2gob3BlbldhdGhlclVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGxvY2F0aW9uRGF0YS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBpZiAoZXJyLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJzQwNCwgbG9jYXRpb24gd2FzbnQgZm91bmQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25JbWFnZURhdGEoY2l0eU5hbWUsIHN0YXRlTmFtZSkge1xyXG4gICAgY29uc3QgYXBpS2V5ID0gJ2g2cTFaS2p0cUJLV1RoM3ZMb3M4UDExa2RuRjZ4N1RfQXAwRy1lRW9ZRWcnO1xyXG4gICAgY29uc3QgdW5zcGxhc2hVcmwgPSBgaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9yYW5kb21cclxuXHRcdD9xdWVyeT0ke2NpdHlOYW1lfSAke3N0YXRlTmFtZX0mb3JpZW50YXRpb249bGFuZHNjYXBlJmNsaWVudF9pZD0ke2FwaUtleX1gO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gYXdhaXQgZmV0Y2godW5zcGxhc2hVcmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBpbWFnZURhdGEuanNvbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tcGxldGVBcGlEYXRhKGNpdHlOYW1lLCBjb3VudHJ5KSB7XHJcbiAgICBjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBnZXRMb2NhdGlvbkRhdGEoY2l0eU5hbWUsIGNvdW50cnkpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyB0cnlpbmcgb3V0IGNvb2wgZGVjb25zdHJ1Y2l0b24gc3ludGF4XHJcbiAgICAgICAgY29uc3QgW3dlYXRoZXJEYXRhLCBpbWFnZURhdGFdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICBnZXRMb2NhdGlvbldhdGhlckRhdGEobG9jYXRpb25EYXRhLmxhdGl0dWRlLCBsb2NhdGlvbkRhdGEubG9uZ2l0dWRlKSxcclxuICAgICAgICAgICAgZ2V0TG9jYXRpb25JbWFnZURhdGEobG9jYXRpb25EYXRhLm5hbWUsIGxvY2F0aW9uRGF0YS5zdGF0ZSlcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0YVN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgY29tcGxldGVMb2NhdGlvbkRhdGE6IGxvY2F0aW9uRGF0YSxcclxuICAgICAgICAgICAgY29tcGxldGVXZWF0aGVyRGF0YTogd2VhdGhlckRhdGEsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlaW1hZ2VEYXRhOiBpbWFnZURhdGFcclxuICAgICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihuZXcgRXJyb3IoJ2xvY2F0aW9uIG5vdCBmb3VuZCcpKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhU3RhdHVzOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJBcGlEYXRhKGNvbXBsZXRlQXBpRGF0YSkge1xyXG4gICAgY29uc3QgeyBjb21wbGV0ZVdlYXRoZXJEYXRhIH0gPSBjb21wbGV0ZUFwaURhdGE7XHJcbiAgICBjb25zdCBjb21wbGV0ZUltYWdlRGF0YSA9IGNvbXBsZXRlQXBpRGF0YS5jb21wbGV0ZWltYWdlRGF0YTtcclxuICAgIGNvbnN0IHsgY29tcGxldGVMb2NhdGlvbkRhdGEgfSA9IGNvbXBsZXRlQXBpRGF0YTtcclxuICAgIC8vIHJldHVybmluZyBkYXRhIEkgYWN0YXVsbHkgbmVlZFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsb2NhdGlvbkRhdGE6IHtcclxuICAgICAgICAgICAgY2l0eTogY29tcGxldGVMb2NhdGlvbkRhdGEubmFtZSxcclxuICAgICAgICAgICAgc3RhdGU6IGNvbXBsZXRlTG9jYXRpb25EYXRhLnN0YXRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3ZWF0aGVyRGF0YToge1xyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZURldGFpbHM6IGNvbXBsZXRlV2VhdGhlckRhdGEubWFpbixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb25EZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLndlYXRoZXJbMF0sXHJcbiAgICAgICAgICAgIHdpbmREZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLndpbmRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGltYWdlRGF0YToge1xyXG4gICAgICAgICAgICBpbWFnZVVybDogY29tcGxldGVJbWFnZURhdGEudXJscy5zbWFsbCxcclxuICAgICAgICAgICAgYWx0RGVzY3JpcHRpb246IGNvbXBsZXRlSW1hZ2VEYXRhLmFsdF9kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgY3JlYXRvckRldGFpbHM6IHtcclxuICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogY29tcGxldGVJbWFnZURhdGEudXNlci5maXJzdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgbGFzdE5hbWU6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIubGFzdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgYWNjb3VudExpbms6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIubGlua3MuaHRtbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NTZWFyY2goKSB7XHJcbiAgICBjb25zdCBjaXR5TmFtZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHlOYW1lJykudmFsdWU7XHJcbiAgICBjb25zdCBJc29WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpc29Db2RlJykudmFsdWU7XHJcbiAgICBjb25zdCByZWdleCA9IC9eXFxzKiQvZztcclxuICAgIGlmIChyZWdleC50ZXN0KElzb1ZhbHVlIHx8IGNpdHlOYW1lVmFsdWUpKSB7XHJcbiAgICAgICAgRE9NLmRpc3BsYXlTZWFyY2hFcnJvcignbXVzdCBlbnRlciBib3RoIHZhbHVlcycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZUFwaURhdGEgPSBhd2FpdCBnZXRDb21wbGV0ZUFwaURhdGEoY2l0eU5hbWVWYWx1ZSwgSXNvVmFsdWUpO1xyXG4gICAgICAgIGlmIChjb21wbGV0ZUFwaURhdGEuZGF0YVN0YXR1cykge1xyXG4gICAgICAgICAgICBET00uZGlzcGxheVdlYXRoZXJEYXRhKGZpbHRlckFwaURhdGEoY29tcGxldGVBcGlEYXRhKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NLmRpc3BsYXlTZWFyY2hFcnJvcignbG9jYXRpb24gbm90IGZvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEFQSSBmcm9tICcuL2FwaUZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IGNvbnZlcnRJbXBlcmljYWwgfSBmcm9tICcuL3VuaXRDb252ZXJzaW9uJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5U2VhcmNoRXJyb3IobWVzc2FnZSkge1xyXG4gICAgY29uc3QgZXJyb3JNc2dFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yTXNnJyk7XHJcbiAgICBlcnJvck1zZ0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZXJyb3JNc2dFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XHJcbiAgICB9LCAxNTAwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlXZWF0aGVyRGF0YShhcGlEYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhhcGlEYXRhKTtcclxuICAgIC8vIHNlcGVyYXRpbmcgZGF0YVxyXG4gICAgY29uc3QgbG9jYXRpb25EYXRhID0gYXBpRGF0YS5sb2NhdGlvbkRhdGE7XHJcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhcGlEYXRhLmltYWdlRGF0YTtcclxuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXBpRGF0YS53ZWF0aGVyRGF0YTtcclxuICAgIC8vIGdhdGhlcmluZyBlbGVtZW50cyB0byBzaG93IHRoZSBkYXRhXHJcbiAgICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9Db250YWluZXInKTtcclxuICAgIGNvbnN0IGxvY2F0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb25UaXRsZScpO1xyXG4gICAgY29uc3Qgd2VhdGhlckluZm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlckluZm9Db250YWluZXInKTtcclxuICAgIGNvbnN0IGltYWdlQ3JlYWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2VDcmVkaXRzJyk7XHJcblxyXG4gICAgaW5mb0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtpbWFnZURhdGEuaW1hZ2VVcmx9XCIpYDtcclxuICAgIGxvY2F0aW9uVGl0bGUudGV4dENvbnRlbnQgPSBgJHtsb2NhdGlvbkRhdGEuY2l0eX0sICR7bG9jYXRpb25EYXRhLnN0YXRlfWA7XHJcbiAgICBpbWFnZUNyZWFkaXRzLmlubmVySFRNTCA9IGBcclxuICAgICAgICBpbWFnZSBieSAke2ltYWdlRGF0YS5jcmVhdG9yRGV0YWlscy5maXJzdE5hbWV9ICR7aW1hZ2VEYXRhLmNyZWF0b3JEZXRhaWxzLmxhc3ROYW1lfSBcclxuICAgICAgICBvbiA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHtpbWFnZURhdGEuY3JlYXRvckRldGFpbHMuYWNjb3VudExpbmt9XCI+dW5zcGxhc2g8L2E+IFxyXG4gICAgYDtcclxuICAgIHdlYXRoZXJJbmZvQ29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbkRldGFpbHNDb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGltZyBhbHQ9XCIke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9uRGV0YWlscy5tYWlufVwiIHNyYz1cclxuICAgICAgICAgICAgXCJodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8ke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9uRGV0YWlscy5pY29ufS5wbmdcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZW1wQ29udGFpbmVyXCI+JHtNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlRGV0YWlscy50ZW1wKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWF0aGVyRGVzY3JpcHRpb25cIj4ke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9uRGV0YWlscy5kZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gXHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvdGhlckRldGFpbHNDb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPkZlZWxzIGxpa2U6IDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGVtcENvbnRhaW5lclwiPiR7TWF0aC5yb3VuZChcclxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyRGF0YS50ZW1wZXJhdHVyZURldGFpbHMuZmVlbHNfbGlrZVxyXG4gICAgICAgICAgICAgICAgKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPk1heCB0ZW1wOiA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRlbXBDb250YWluZXJcIj4ke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRhdGEudGVtcGVyYXR1cmVEZXRhaWxzLnRlbXBfbWF4XHJcbiAgICAgICAgICAgICAgICApfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5NaW4gdGVtcDogPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZW1wQ29udGFpbmVyXCI+JHtNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlRGV0YWlscy50ZW1wX21pblxyXG4gICAgICAgICAgICAgICAgKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+V2luZDogPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaXN0YW5jZUNvbnRhaW5lclwiPiAke01hdGgucm91bmQod2VhdGhlckRhdGEud2luZERldGFpbHMuc3BlZWQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICBgO1xyXG5cclxuICAgIGNvbnN0IHVuaXRTd2l0Y2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5pdFN3aXRjaCcpO1xyXG4gICAgY29uc3Qgc3dpdGNoU3RhdGUgPSB1bml0U3dpdGNoLmNoZWNrZWQ7XHJcbiAgICBpZiAoc3dpdGNoU3RhdGUpIHtcclxuICAgICAgICAvLyBpbXBlcmljYWxcclxuICAgICAgICBjb252ZXJ0SW1wZXJpY2FsKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiZnVuY3Rpb24gY2Vsc2l1c1RvRmFyZW5oZWl0KG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKG51bWJlciAqIDkpIC8gNS4wICsgMzIuMCk7XHJcbn1cclxuZnVuY3Rpb24gRmFyZW5oZWl0VG9DZWxzdXMobnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoKG51bWJlciAtIDMyLjApICogNS4wKSAvIDkuMCk7XHJcbn1cclxuZnVuY3Rpb24gbWlsZVRvS2lsb21ldGVyKG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQobnVtYmVyIC8gMS42KTtcclxufVxyXG5mdW5jdGlvbiBraWxvbWV0ZXJUb01pbGUobnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChudW1iZXIgKiAxLjYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydE1ldHJpYygpIHtcclxuICAgIGNvbnN0IHRlbXBDb250YWluZXJzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZW1wQ29udGFpbmVyJyldO1xyXG4gICAgY29uc3QgZGlzdGFuY2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlzdGFuY2VDb250YWluZXInKTtcclxuICAgIHRlbXBDb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xyXG4gICAgICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IEZhcmVuaGVpdFRvQ2Vsc3VzKHBhcnNlSW50KGNvbnRhaW5lci50ZXh0Q29udGVudCkpO1xyXG4gICAgfSk7XHJcbiAgICBkaXN0YW5jZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IG1pbGVUb0tpbG9tZXRlcihwYXJzZUludChkaXN0YW5jZUNvbnRhaW5lci50ZXh0Q29udGVudCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEltcGVyaWNhbCgpIHtcclxuICAgIGNvbnN0IHRlbXBDb250YWluZXJzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZW1wQ29udGFpbmVyJyldO1xyXG4gICAgY29uc3QgZGlzdGFuY2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlzdGFuY2VDb250YWluZXInKTtcclxuICAgIHRlbXBDb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xyXG4gICAgICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IGNlbHNpdXNUb0ZhcmVuaGVpdChwYXJzZUludChjb250YWluZXIudGV4dENvbnRlbnQpKTtcclxuICAgIH0pO1xyXG4gICAgZGlzdGFuY2VDb250YWluZXIudGV4dENvbnRlbnQgPSBraWxvbWV0ZXJUb01pbGUocGFyc2VJbnQoZGlzdGFuY2VDb250YWluZXIudGV4dENvbnRlbnQpKTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIEFQSSBmcm9tICcuL21vZHVsZXMvYXBpRnVuY3Rpb25zJztcclxuaW1wb3J0IHsgY29udmVydEltcGVyaWNhbCwgY29udmVydE1ldHJpYyB9IGZyb20gJy4vbW9kdWxlcy91bml0Q29udmVyc2lvbic7XHJcblxyXG5jb25zdCBzZWFyY2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLXNlYXJjaGVuZ2luJyk7XHJcbmNvbnN0IGNpdHlTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eU5hbWUnKTtcclxuY29uc3QgaXNvU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lzb0NvZGUnKTtcclxuY29uc3QgdW5pdFN3aXRjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bml0U3dpdGNoJyk7XHJcbi8vIHNldHRpbmcgdXAgZXZlbnQgbGlzdGVuZXJzXHJcbnNlYXJjaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBBUEkucHJvY2Vzc1NlYXJjaCk7XHJcbmNpdHlTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgQVBJLnByb2Nlc3NTZWFyY2goKTtcclxuICAgIH1cclxufSk7XHJcbmlzb1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XHJcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICBBUEkucHJvY2Vzc1NlYXJjaCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnVuaXRTd2l0Y2guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgY29uc3Qgc3dpdGNoU3RhdGUgPSB1bml0U3dpdGNoLmNoZWNrZWQ7XHJcbiAgICBpZiAoc3dpdGNoU3RhdGUpIHtcclxuICAgICAgICAvLyBpbXBlcmljYWxcclxuICAgICAgICBjb252ZXJ0SW1wZXJpY2FsKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG1ldHJpY1xyXG4gICAgICAgIGNvbnZlcnRNZXRyaWMoKTtcclxuICAgIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==