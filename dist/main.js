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
        _domManipulation__WEBPACK_IMPORTED_MODULE_0__.enableLoader()
        const locationData = await fetch(geoLocationUrl, options);
        _domManipulation__WEBPACK_IMPORTED_MODULE_0__.disableLoader()
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

async function processSearch(cityName, Iso) {
    const regex = /^\s*$/g;
    if (regex.test(Iso || cityName)) {
        _domManipulation__WEBPACK_IMPORTED_MODULE_0__.displaySearchError('must enter both values');
    } else {
        const completeApiData = await getCompleteApiData(cityName, Iso);
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
/* harmony export */   "disableLoader": () => (/* binding */ disableLoader),
/* harmony export */   "displaySearchError": () => (/* binding */ displaySearchError),
/* harmony export */   "displayWeatherData": () => (/* binding */ displayWeatherData),
/* harmony export */   "enableLoader": () => (/* binding */ enableLoader)
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
    disableLoader();
}

function disableLoader() {
    setTimeout(() => {
        document.querySelector('#loaderContainer').style.visibility = 'hidden';
    }, 1000);
}

function enableLoader() {
    setTimeout(() => {
        document.querySelector('#loaderContainer').style.visibility = 'visible';
    }, 0);
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
searchIcon.addEventListener('click', () => {
    const cityName = document.querySelector('#cityName').value;
    const Iso = document.querySelector('#isoCode').value;
    _modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.processSearch(cityName, Iso);
});
citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = document.querySelector('#cityName').value;
        const Iso = document.querySelector('#isoCode').value;
        _modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.processSearch(cityName, Iso);
    }
});
isoSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = document.querySelector('#cityName').value;
        const Iso = document.querySelector('#isoCode').value;
        _modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.processSearch(cityName, Iso);
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

_modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.processSearch('melbourne', 'au');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SztBQUNMO0FBQ0E7Ozs7Ozs7VUM3QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDNkI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBaUI7QUFDckIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnRUFBaUI7QUFDekI7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdFQUFpQjtBQUN6QjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5RUFBZ0I7QUFDeEIsTUFBTTtBQUNOO0FBQ0EsUUFBUSxzRUFBYTtBQUNyQjtBQUNBLENBQUM7QUFDRDtBQUNBLGdFQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvYXBpRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvdW5pdENvbnZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBET00gZnJvbSAnLi9kb21NYW5pcHVsYXRpb24nO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25EYXRhKGNpdHlOYW1lLCBjb3VudHJ5TmFtZSkge1xyXG4gICAgY29uc3QgZ2VvTG9jYXRpb25VcmwgPSBgaHR0cHM6Ly9hcGkuYXBpLW5pbmphcy5jb20vdjEvZ2VvY29kaW5nP2NpdHk9XHJcbiAgICBcdCR7Y2l0eU5hbWUudG9Mb3dlckNhc2UoKX0mY291bnRyeT0ke2NvdW50cnlOYW1lLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBtb2RlOiAnY29ycycsXHJcbiAgICAgICAgaGVhZGVyczogeyAnWC1BcGktS2V5JzogJ2xZY1VjWGsxbWo1VHdFNm4zTm1WakE9PWJmNGtJWXc5dGdFekZhWkcnIH0sXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIERPTS5lbmFibGVMb2FkZXIoKVxyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGZldGNoKGdlb0xvY2F0aW9uVXJsLCBvcHRpb25zKTtcclxuICAgICAgICBET00uZGlzYWJsZUxvYWRlcigpXHJcbiAgICAgICAgcmV0dXJuIFsuLi4oYXdhaXQgbG9jYXRpb25EYXRhLmpzb24oKSldWzBdO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgaWYgKGVyci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCc0MDQsIGxvY2F0aW9uIHdhc250IGZvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uV2F0aGVyRGF0YShsYXQsIGxvbikge1xyXG4gICAgY29uc3QgYXBpS2V5ID0gJzRiZDU1NDllODc2ZDA4NWM2NjNmYWIwODI4MTE0ZjcxJztcclxuICAgIGNvbnN0IG9wZW5XYXRoZXJVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXJcclxuXHRcdD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHthcGlLZXl9JnVuaXRzPW1ldHJpY2A7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25EYXRhID0gYXdhaXQgZmV0Y2gob3BlbldhdGhlclVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGxvY2F0aW9uRGF0YS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBpZiAoZXJyLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJzQwNCwgbG9jYXRpb24gd2FzbnQgZm91bmQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25JbWFnZURhdGEoY2l0eU5hbWUsIHN0YXRlTmFtZSkge1xyXG4gICAgY29uc3QgYXBpS2V5ID0gJ2g2cTFaS2p0cUJLV1RoM3ZMb3M4UDExa2RuRjZ4N1RfQXAwRy1lRW9ZRWcnO1xyXG4gICAgY29uc3QgdW5zcGxhc2hVcmwgPSBgaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9yYW5kb21cclxuXHRcdD9xdWVyeT0ke2NpdHlOYW1lfSAke3N0YXRlTmFtZX0mb3JpZW50YXRpb249bGFuZHNjYXBlJmNsaWVudF9pZD0ke2FwaUtleX1gO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gYXdhaXQgZmV0Y2godW5zcGxhc2hVcmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBpbWFnZURhdGEuanNvbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tcGxldGVBcGlEYXRhKGNpdHlOYW1lLCBjb3VudHJ5KSB7XHJcbiAgICBjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBnZXRMb2NhdGlvbkRhdGEoY2l0eU5hbWUsIGNvdW50cnkpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyB0cnlpbmcgb3V0IGNvb2wgZGVjb25zdHJ1Y2l0b24gc3ludGF4XHJcbiAgICAgICAgY29uc3QgW3dlYXRoZXJEYXRhLCBpbWFnZURhdGFdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICBnZXRMb2NhdGlvbldhdGhlckRhdGEobG9jYXRpb25EYXRhLmxhdGl0dWRlLCBsb2NhdGlvbkRhdGEubG9uZ2l0dWRlKSxcclxuICAgICAgICAgICAgZ2V0TG9jYXRpb25JbWFnZURhdGEobG9jYXRpb25EYXRhLm5hbWUsIGxvY2F0aW9uRGF0YS5zdGF0ZSlcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0YVN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgY29tcGxldGVMb2NhdGlvbkRhdGE6IGxvY2F0aW9uRGF0YSxcclxuICAgICAgICAgICAgY29tcGxldGVXZWF0aGVyRGF0YTogd2VhdGhlckRhdGEsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlaW1hZ2VEYXRhOiBpbWFnZURhdGFcclxuICAgICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihuZXcgRXJyb3IoJ2xvY2F0aW9uIG5vdCBmb3VuZCcpKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhU3RhdHVzOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJBcGlEYXRhKGNvbXBsZXRlQXBpRGF0YSkge1xyXG4gICAgY29uc3QgeyBjb21wbGV0ZVdlYXRoZXJEYXRhIH0gPSBjb21wbGV0ZUFwaURhdGE7XHJcbiAgICBjb25zdCBjb21wbGV0ZUltYWdlRGF0YSA9IGNvbXBsZXRlQXBpRGF0YS5jb21wbGV0ZWltYWdlRGF0YTtcclxuICAgIGNvbnN0IHsgY29tcGxldGVMb2NhdGlvbkRhdGEgfSA9IGNvbXBsZXRlQXBpRGF0YTtcclxuICAgIC8vIHJldHVybmluZyBkYXRhIEkgYWN0YXVsbHkgbmVlZFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsb2NhdGlvbkRhdGE6IHtcclxuICAgICAgICAgICAgY2l0eTogY29tcGxldGVMb2NhdGlvbkRhdGEubmFtZSxcclxuICAgICAgICAgICAgc3RhdGU6IGNvbXBsZXRlTG9jYXRpb25EYXRhLnN0YXRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3ZWF0aGVyRGF0YToge1xyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZURldGFpbHM6IGNvbXBsZXRlV2VhdGhlckRhdGEubWFpbixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb25EZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLndlYXRoZXJbMF0sXHJcbiAgICAgICAgICAgIHdpbmREZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLndpbmRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGltYWdlRGF0YToge1xyXG4gICAgICAgICAgICBpbWFnZVVybDogY29tcGxldGVJbWFnZURhdGEudXJscy5zbWFsbCxcclxuICAgICAgICAgICAgYWx0RGVzY3JpcHRpb246IGNvbXBsZXRlSW1hZ2VEYXRhLmFsdF9kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgY3JlYXRvckRldGFpbHM6IHtcclxuICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogY29tcGxldGVJbWFnZURhdGEudXNlci5maXJzdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgbGFzdE5hbWU6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIubGFzdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgYWNjb3VudExpbms6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIubGlua3MuaHRtbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NTZWFyY2goY2l0eU5hbWUsIElzbykge1xyXG4gICAgY29uc3QgcmVnZXggPSAvXlxccyokL2c7XHJcbiAgICBpZiAocmVnZXgudGVzdChJc28gfHwgY2l0eU5hbWUpKSB7XHJcbiAgICAgICAgRE9NLmRpc3BsYXlTZWFyY2hFcnJvcignbXVzdCBlbnRlciBib3RoIHZhbHVlcycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZUFwaURhdGEgPSBhd2FpdCBnZXRDb21wbGV0ZUFwaURhdGEoY2l0eU5hbWUsIElzbyk7XHJcbiAgICAgICAgaWYgKGNvbXBsZXRlQXBpRGF0YS5kYXRhU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIERPTS5kaXNwbGF5V2VhdGhlckRhdGEoZmlsdGVyQXBpRGF0YShjb21wbGV0ZUFwaURhdGEpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBET00uZGlzcGxheVNlYXJjaEVycm9yKCdsb2NhdGlvbiBub3QgZm91bmQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgQVBJIGZyb20gJy4vYXBpRnVuY3Rpb25zJztcclxuaW1wb3J0IHsgY29udmVydEltcGVyaWNhbCB9IGZyb20gJy4vdW5pdENvbnZlcnNpb24nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlTZWFyY2hFcnJvcihtZXNzYWdlKSB7XHJcbiAgICBjb25zdCBlcnJvck1zZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3JNc2cnKTtcclxuICAgIGVycm9yTXNnRWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBlcnJvck1zZ0VsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcclxuICAgIH0sIDE1MDApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVdlYXRoZXJEYXRhKGFwaURhdGEpIHtcclxuICAgIC8vIHNlcGVyYXRpbmcgZGF0YVxyXG4gICAgY29uc3QgbG9jYXRpb25EYXRhID0gYXBpRGF0YS5sb2NhdGlvbkRhdGE7XHJcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhcGlEYXRhLmltYWdlRGF0YTtcclxuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXBpRGF0YS53ZWF0aGVyRGF0YTtcclxuICAgIC8vIGdhdGhlcmluZyBlbGVtZW50cyB0byBzaG93IHRoZSBkYXRhXHJcbiAgICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9Db250YWluZXInKTtcclxuICAgIGNvbnN0IGxvY2F0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb25UaXRsZScpO1xyXG4gICAgY29uc3Qgd2VhdGhlckluZm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlckluZm9Db250YWluZXInKTtcclxuICAgIGNvbnN0IGltYWdlQ3JlYWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2VDcmVkaXRzJyk7XHJcblxyXG4gICAgaW5mb0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtpbWFnZURhdGEuaW1hZ2VVcmx9XCIpYDtcclxuICAgIGxvY2F0aW9uVGl0bGUudGV4dENvbnRlbnQgPSBgJHtsb2NhdGlvbkRhdGEuY2l0eX0sICR7bG9jYXRpb25EYXRhLnN0YXRlfWA7XHJcbiAgICBpbWFnZUNyZWFkaXRzLmlubmVySFRNTCA9IGBcclxuICAgICAgICBpbWFnZSBieSAke2ltYWdlRGF0YS5jcmVhdG9yRGV0YWlscy5maXJzdE5hbWV9ICR7aW1hZ2VEYXRhLmNyZWF0b3JEZXRhaWxzLmxhc3ROYW1lfSBcclxuICAgICAgICBvbiA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHtpbWFnZURhdGEuY3JlYXRvckRldGFpbHMuYWNjb3VudExpbmt9XCI+dW5zcGxhc2g8L2E+IFxyXG4gICAgYDtcclxuICAgIHdlYXRoZXJJbmZvQ29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbkRldGFpbHNDb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGltZyBhbHQ9XCIke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9uRGV0YWlscy5tYWlufVwiIHNyYz1cclxuICAgICAgICAgICAgXCJodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8ke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9uRGV0YWlscy5pY29ufS5wbmdcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZW1wQ29udGFpbmVyXCI+JHtNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlRGV0YWlscy50ZW1wKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWF0aGVyRGVzY3JpcHRpb25cIj4ke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9uRGV0YWlscy5kZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gXHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvdGhlckRldGFpbHNDb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPkZlZWxzIGxpa2U6IDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGVtcENvbnRhaW5lclwiPiR7TWF0aC5yb3VuZChcclxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyRGF0YS50ZW1wZXJhdHVyZURldGFpbHMuZmVlbHNfbGlrZVxyXG4gICAgICAgICAgICAgICAgKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPk1heCB0ZW1wOiA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRlbXBDb250YWluZXJcIj4ke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRhdGEudGVtcGVyYXR1cmVEZXRhaWxzLnRlbXBfbWF4XHJcbiAgICAgICAgICAgICAgICApfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5NaW4gdGVtcDogPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZW1wQ29udGFpbmVyXCI+JHtNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlRGV0YWlscy50ZW1wX21pblxyXG4gICAgICAgICAgICAgICAgKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+V2luZDogPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaXN0YW5jZUNvbnRhaW5lclwiPiAke01hdGgucm91bmQod2VhdGhlckRhdGEud2luZERldGFpbHMuc3BlZWQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICBgO1xyXG5cclxuICAgIGNvbnN0IHVuaXRTd2l0Y2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5pdFN3aXRjaCcpO1xyXG4gICAgY29uc3Qgc3dpdGNoU3RhdGUgPSB1bml0U3dpdGNoLmNoZWNrZWQ7XHJcbiAgICBpZiAoc3dpdGNoU3RhdGUpIHtcclxuICAgICAgICAvLyBpbXBlcmljYWxcclxuICAgICAgICBjb252ZXJ0SW1wZXJpY2FsKCk7XHJcbiAgICB9XHJcbiAgICBkaXNhYmxlTG9hZGVyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlTG9hZGVyKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlckNvbnRhaW5lcicpLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgIH0sIDEwMDApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlTG9hZGVyKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlckNvbnRhaW5lcicpLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICB9LCAwKTtcclxufVxyXG4iLCJmdW5jdGlvbiBjZWxzaXVzVG9GYXJlbmhlaXQobnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgobnVtYmVyICogOSkgLyA1LjAgKyAzMi4wKTtcclxufVxyXG5mdW5jdGlvbiBGYXJlbmhlaXRUb0NlbHN1cyhudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKCgobnVtYmVyIC0gMzIuMCkgKiA1LjApIC8gOS4wKTtcclxufVxyXG5mdW5jdGlvbiBtaWxlVG9LaWxvbWV0ZXIobnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChudW1iZXIgLyAxLjYpO1xyXG59XHJcbmZ1bmN0aW9uIGtpbG9tZXRlclRvTWlsZShudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKG51bWJlciAqIDEuNik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0TWV0cmljKCkge1xyXG4gICAgY29uc3QgdGVtcENvbnRhaW5lcnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlbXBDb250YWluZXInKV07XHJcbiAgICBjb25zdCBkaXN0YW5jZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXN0YW5jZUNvbnRhaW5lcicpO1xyXG4gICAgdGVtcENvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XHJcbiAgICAgICAgY29udGFpbmVyLnRleHRDb250ZW50ID0gRmFyZW5oZWl0VG9DZWxzdXMocGFyc2VJbnQoY29udGFpbmVyLnRleHRDb250ZW50KSk7XHJcbiAgICB9KTtcclxuICAgIGRpc3RhbmNlQ29udGFpbmVyLnRleHRDb250ZW50ID0gbWlsZVRvS2lsb21ldGVyKHBhcnNlSW50KGRpc3RhbmNlQ29udGFpbmVyLnRleHRDb250ZW50KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0SW1wZXJpY2FsKCkge1xyXG4gICAgY29uc3QgdGVtcENvbnRhaW5lcnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlbXBDb250YWluZXInKV07XHJcbiAgICBjb25zdCBkaXN0YW5jZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXN0YW5jZUNvbnRhaW5lcicpO1xyXG4gICAgdGVtcENvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XHJcbiAgICAgICAgY29udGFpbmVyLnRleHRDb250ZW50ID0gY2Vsc2l1c1RvRmFyZW5oZWl0KHBhcnNlSW50KGNvbnRhaW5lci50ZXh0Q29udGVudCkpO1xyXG4gICAgfSk7XHJcbiAgICBkaXN0YW5jZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IGtpbG9tZXRlclRvTWlsZShwYXJzZUludChkaXN0YW5jZUNvbnRhaW5lci50ZXh0Q29udGVudCkpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgQVBJIGZyb20gJy4vbW9kdWxlcy9hcGlGdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyBjb252ZXJ0SW1wZXJpY2FsLCBjb252ZXJ0TWV0cmljIH0gZnJvbSAnLi9tb2R1bGVzL3VuaXRDb252ZXJzaW9uJztcclxuXHJcbmNvbnN0IHNlYXJjaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmEtc2VhcmNoZW5naW4nKTtcclxuY29uc3QgY2l0eVNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXR5TmFtZScpO1xyXG5jb25zdCBpc29TZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaXNvQ29kZScpO1xyXG5jb25zdCB1bml0U3dpdGNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuaXRTd2l0Y2gnKTtcclxuLy8gc2V0dGluZyB1cCBldmVudCBsaXN0ZW5lcnNcclxuc2VhcmNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHlOYW1lJykudmFsdWU7XHJcbiAgICBjb25zdCBJc28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaXNvQ29kZScpLnZhbHVlO1xyXG4gICAgQVBJLnByb2Nlc3NTZWFyY2goY2l0eU5hbWUsIElzbyk7XHJcbn0pO1xyXG5jaXR5U2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHlOYW1lJykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgSXNvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lzb0NvZGUnKS52YWx1ZTtcclxuICAgICAgICBBUEkucHJvY2Vzc1NlYXJjaChjaXR5TmFtZSwgSXNvKTtcclxuICAgIH1cclxufSk7XHJcbmlzb1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XHJcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXR5TmFtZScpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IElzbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpc29Db2RlJykudmFsdWU7XHJcbiAgICAgICAgQVBJLnByb2Nlc3NTZWFyY2goY2l0eU5hbWUsIElzbyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxudW5pdFN3aXRjaC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBzd2l0Y2hTdGF0ZSA9IHVuaXRTd2l0Y2guY2hlY2tlZDtcclxuICAgIGlmIChzd2l0Y2hTdGF0ZSkge1xyXG4gICAgICAgIC8vIGltcGVyaWNhbFxyXG4gICAgICAgIGNvbnZlcnRJbXBlcmljYWwoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gbWV0cmljXHJcbiAgICAgICAgY29udmVydE1ldHJpYygpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbkFQSS5wcm9jZXNzU2VhcmNoKCdtZWxib3VybmUnLCAnYXUnKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9