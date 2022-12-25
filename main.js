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
    disableLoader();
}

function disableLoader() {
    setTimeout(() => {
        document.querySelector('#loaderContainer').style.visibility = 'hidden';
    }, 800);
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

// API.processSearch('melbourne', 'au');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztVQzdCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ044QztBQUM2QjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdFQUFpQjtBQUNyQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdFQUFpQjtBQUN6QjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0VBQWlCO0FBQ3pCO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlFQUFnQjtBQUN4QixNQUFNO0FBQ047QUFDQSxRQUFRLHNFQUFhO0FBQ3JCO0FBQ0EsQ0FBQztBQUNEO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2FwaUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2RvbU1hbmlwdWxhdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL3VuaXRDb252ZXJzaW9uLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRE9NIGZyb20gJy4vZG9tTWFuaXB1bGF0aW9uJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uRGF0YShjaXR5TmFtZSwgY291bnRyeU5hbWUpIHtcclxuICAgIGNvbnN0IGdlb0xvY2F0aW9uVXJsID0gYGh0dHBzOi8vYXBpLmFwaS1uaW5qYXMuY29tL3YxL2dlb2NvZGluZz9jaXR5PVxyXG4gICAgXHQke2NpdHlOYW1lLnRvTG93ZXJDYXNlKCl9JmNvdW50cnk9JHtjb3VudHJ5TmFtZS50b0xvd2VyQ2FzZSgpfWA7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgJ1gtQXBpLUtleSc6ICdsWWNVY1hrMW1qNVR3RTZuM05tVmpBPT1iZjRrSVl3OXRnRXpGYVpHJyB9LFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBET00uZW5hYmxlTG9hZGVyKClcclxuICAgICAgICBjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBmZXRjaChnZW9Mb2NhdGlvblVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgRE9NLmRpc2FibGVMb2FkZXIoKVxyXG4gICAgICAgIHJldHVybiBbLi4uKGF3YWl0IGxvY2F0aW9uRGF0YS5qc29uKCkpXVswXTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGlmIChlcnIucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignNDA0LCBsb2NhdGlvbiB3YXNudCBmb3VuZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRMb2NhdGlvbldhdGhlckRhdGEobGF0LCBsb24pIHtcclxuICAgIGNvbnN0IGFwaUtleSA9ICc0YmQ1NTQ5ZTg3NmQwODVjNjYzZmFiMDgyODExNGY3MSc7XHJcbiAgICBjb25zdCBvcGVuV2F0aGVyVXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyXHJcblx0XHQ/bGF0PSR7bGF0fSZsb249JHtsb259JmFwcGlkPSR7YXBpS2V5fSZ1bml0cz1tZXRyaWNgO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBtb2RlOiAnY29ycycsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGZldGNoKG9wZW5XYXRoZXJVcmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBsb2NhdGlvbkRhdGEuanNvbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgaWYgKGVyci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCc0MDQsIGxvY2F0aW9uIHdhc250IGZvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uSW1hZ2VEYXRhKGNpdHlOYW1lLCBzdGF0ZU5hbWUpIHtcclxuICAgIGNvbnN0IGFwaUtleSA9ICdoNnExWktqdHFCS1dUaDN2TG9zOFAxMWtkbkY2eDdUX0FwMEctZUVvWUVnJztcclxuICAgIGNvbnN0IHVuc3BsYXNoVXJsID0gYGh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvcmFuZG9tXHJcblx0XHQ/cXVlcnk9JHtjaXR5TmFtZX0gJHtzdGF0ZU5hbWV9Jm9yaWVudGF0aW9uPWxhbmRzY2FwZSZjbGllbnRfaWQ9JHthcGlLZXl9YDtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBtb2RlOiAnY29ycycsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IGF3YWl0IGZldGNoKHVuc3BsYXNoVXJsLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgaW1hZ2VEYXRhLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbXBsZXRlQXBpRGF0YShjaXR5TmFtZSwgY291bnRyeSkge1xyXG4gICAgY29uc3QgbG9jYXRpb25EYXRhID0gYXdhaXQgZ2V0TG9jYXRpb25EYXRhKGNpdHlOYW1lLCBjb3VudHJ5KTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gdHJ5aW5nIG91dCBjb29sIGRlY29uc3RydWNpdG9uIHN5bnRheFxyXG4gICAgICAgIGNvbnN0IFt3ZWF0aGVyRGF0YSwgaW1hZ2VEYXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgZ2V0TG9jYXRpb25XYXRoZXJEYXRhKGxvY2F0aW9uRGF0YS5sYXRpdHVkZSwgbG9jYXRpb25EYXRhLmxvbmdpdHVkZSksXHJcbiAgICAgICAgICAgIGdldExvY2F0aW9uSW1hZ2VEYXRhKGxvY2F0aW9uRGF0YS5uYW1lLCBsb2NhdGlvbkRhdGEuc3RhdGUpXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGFTdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlTG9jYXRpb25EYXRhOiBsb2NhdGlvbkRhdGEsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlV2VhdGhlckRhdGE6IHdlYXRoZXJEYXRhLFxyXG4gICAgICAgICAgICBjb21wbGV0ZWltYWdlRGF0YTogaW1hZ2VEYXRhXHJcbiAgICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKCdsb2NhdGlvbiBub3QgZm91bmQnKSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0YVN0YXR1czogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyQXBpRGF0YShjb21wbGV0ZUFwaURhdGEpIHtcclxuICAgIGNvbnN0IHsgY29tcGxldGVXZWF0aGVyRGF0YSB9ID0gY29tcGxldGVBcGlEYXRhO1xyXG4gICAgY29uc3QgY29tcGxldGVJbWFnZURhdGEgPSBjb21wbGV0ZUFwaURhdGEuY29tcGxldGVpbWFnZURhdGE7XHJcbiAgICBjb25zdCB7IGNvbXBsZXRlTG9jYXRpb25EYXRhIH0gPSBjb21wbGV0ZUFwaURhdGE7XHJcbiAgICAvLyByZXR1cm5pbmcgZGF0YSBJIGFjdGF1bGx5IG5lZWRcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbG9jYXRpb25EYXRhOiB7XHJcbiAgICAgICAgICAgIGNpdHk6IGNvbXBsZXRlTG9jYXRpb25EYXRhLm5hbWUsXHJcbiAgICAgICAgICAgIHN0YXRlOiBjb21wbGV0ZUxvY2F0aW9uRGF0YS5zdGF0ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2VhdGhlckRhdGE6IHtcclxuICAgICAgICAgICAgdGVtcGVyYXR1cmVEZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLm1haW4sXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uRGV0YWlsczogY29tcGxldGVXZWF0aGVyRGF0YS53ZWF0aGVyWzBdLFxyXG4gICAgICAgICAgICB3aW5kRGV0YWlsczogY29tcGxldGVXZWF0aGVyRGF0YS53aW5kXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbWFnZURhdGE6IHtcclxuICAgICAgICAgICAgaW1hZ2VVcmw6IGNvbXBsZXRlSW1hZ2VEYXRhLnVybHMuc21hbGwsXHJcbiAgICAgICAgICAgIGFsdERlc2NyaXB0aW9uOiBjb21wbGV0ZUltYWdlRGF0YS5hbHRfZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIGNyZWF0b3JEZXRhaWxzOiB7XHJcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIuZmlyc3RfbmFtZSxcclxuICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBjb21wbGV0ZUltYWdlRGF0YS51c2VyLmxhc3RfbmFtZSxcclxuICAgICAgICAgICAgICAgIGFjY291bnRMaW5rOiBjb21wbGV0ZUltYWdlRGF0YS51c2VyLmxpbmtzLmh0bWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzU2VhcmNoKGNpdHlOYW1lLCBJc28pIHtcclxuICAgIGNvbnN0IHJlZ2V4ID0gL15cXHMqJC9nO1xyXG4gICAgaWYgKHJlZ2V4LnRlc3QoSXNvIHx8IGNpdHlOYW1lKSkge1xyXG4gICAgICAgIERPTS5kaXNwbGF5U2VhcmNoRXJyb3IoJ211c3QgZW50ZXIgYm90aCB2YWx1ZXMnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVBcGlEYXRhID0gYXdhaXQgZ2V0Q29tcGxldGVBcGlEYXRhKGNpdHlOYW1lLCBJc28pO1xyXG4gICAgICAgIGlmIChjb21wbGV0ZUFwaURhdGEuZGF0YVN0YXR1cykge1xyXG4gICAgICAgICAgICBET00uZGlzcGxheVdlYXRoZXJEYXRhKGZpbHRlckFwaURhdGEoY29tcGxldGVBcGlEYXRhKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NLmRpc3BsYXlTZWFyY2hFcnJvcignbG9jYXRpb24gbm90IGZvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEFQSSBmcm9tICcuL2FwaUZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IGNvbnZlcnRJbXBlcmljYWwgfSBmcm9tICcuL3VuaXRDb252ZXJzaW9uJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5U2VhcmNoRXJyb3IobWVzc2FnZSkge1xyXG4gICAgY29uc3QgZXJyb3JNc2dFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yTXNnJyk7XHJcbiAgICBlcnJvck1zZ0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZXJyb3JNc2dFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XHJcbiAgICB9LCAxNTAwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlXZWF0aGVyRGF0YShhcGlEYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhhcGlEYXRhKTtcclxuICAgIC8vIHNlcGVyYXRpbmcgZGF0YVxyXG4gICAgY29uc3QgbG9jYXRpb25EYXRhID0gYXBpRGF0YS5sb2NhdGlvbkRhdGE7XHJcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhcGlEYXRhLmltYWdlRGF0YTtcclxuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXBpRGF0YS53ZWF0aGVyRGF0YTtcclxuICAgIC8vIGdhdGhlcmluZyBlbGVtZW50cyB0byBzaG93IHRoZSBkYXRhXHJcbiAgICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9Db250YWluZXInKTtcclxuICAgIGNvbnN0IGxvY2F0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb25UaXRsZScpO1xyXG4gICAgY29uc3Qgd2VhdGhlckluZm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlckluZm9Db250YWluZXInKTtcclxuICAgIGNvbnN0IGltYWdlQ3JlYWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2VDcmVkaXRzJyk7XHJcblxyXG4gICAgaW5mb0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtpbWFnZURhdGEuaW1hZ2VVcmx9XCIpYDtcclxuICAgIGxvY2F0aW9uVGl0bGUudGV4dENvbnRlbnQgPSBgJHtsb2NhdGlvbkRhdGEuY2l0eX0sICR7bG9jYXRpb25EYXRhLnN0YXRlfWA7XHJcbiAgICBpbWFnZUNyZWFkaXRzLmlubmVySFRNTCA9IGBcclxuICAgICAgICBpbWFnZSBieSAke2ltYWdlRGF0YS5jcmVhdG9yRGV0YWlscy5maXJzdE5hbWV9ICR7aW1hZ2VEYXRhLmNyZWF0b3JEZXRhaWxzLmxhc3ROYW1lfSBcclxuICAgICAgICBvbiA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHtpbWFnZURhdGEuY3JlYXRvckRldGFpbHMuYWNjb3VudExpbmt9XCI+dW5zcGxhc2g8L2E+IFxyXG4gICAgYDtcclxuICAgIHdlYXRoZXJJbmZvQ29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbkRldGFpbHNDb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGltZyBhbHQ9XCIke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9uRGV0YWlscy5tYWlufVwiIHNyYz1cclxuICAgICAgICAgICAgXCJodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8ke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9uRGV0YWlscy5pY29ufS5wbmdcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZW1wQ29udGFpbmVyXCI+JHtNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlRGV0YWlscy50ZW1wKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWF0aGVyRGVzY3JpcHRpb25cIj4ke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9uRGV0YWlscy5kZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gXHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvdGhlckRldGFpbHNDb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPkZlZWxzIGxpa2U6IDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGVtcENvbnRhaW5lclwiPiR7TWF0aC5yb3VuZChcclxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyRGF0YS50ZW1wZXJhdHVyZURldGFpbHMuZmVlbHNfbGlrZVxyXG4gICAgICAgICAgICAgICAgKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPk1heCB0ZW1wOiA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRlbXBDb250YWluZXJcIj4ke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRhdGEudGVtcGVyYXR1cmVEZXRhaWxzLnRlbXBfbWF4XHJcbiAgICAgICAgICAgICAgICApfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5NaW4gdGVtcDogPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZW1wQ29udGFpbmVyXCI+JHtNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlRGV0YWlscy50ZW1wX21pblxyXG4gICAgICAgICAgICAgICAgKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+V2luZDogPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaXN0YW5jZUNvbnRhaW5lclwiPiAke01hdGgucm91bmQod2VhdGhlckRhdGEud2luZERldGFpbHMuc3BlZWQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICBgO1xyXG5cclxuICAgIGNvbnN0IHVuaXRTd2l0Y2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5pdFN3aXRjaCcpO1xyXG4gICAgY29uc3Qgc3dpdGNoU3RhdGUgPSB1bml0U3dpdGNoLmNoZWNrZWQ7XHJcbiAgICBpZiAoc3dpdGNoU3RhdGUpIHtcclxuICAgICAgICAvLyBpbXBlcmljYWxcclxuICAgICAgICBjb252ZXJ0SW1wZXJpY2FsKCk7XHJcbiAgICB9XHJcbiAgICBkaXNhYmxlTG9hZGVyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlTG9hZGVyKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlckNvbnRhaW5lcicpLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgIH0sIDgwMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVMb2FkZXIoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyQ29udGFpbmVyJykuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgIH0sIDApO1xyXG59XHJcbiIsImZ1bmN0aW9uIGNlbHNpdXNUb0ZhcmVuaGVpdChudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKChudW1iZXIgKiA5KSAvIDUuMCArIDMyLjApO1xyXG59XHJcbmZ1bmN0aW9uIEZhcmVuaGVpdFRvQ2Vsc3VzKG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKChudW1iZXIgLSAzMi4wKSAqIDUuMCkgLyA5LjApO1xyXG59XHJcbmZ1bmN0aW9uIG1pbGVUb0tpbG9tZXRlcihudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKG51bWJlciAvIDEuNik7XHJcbn1cclxuZnVuY3Rpb24ga2lsb21ldGVyVG9NaWxlKG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQobnVtYmVyICogMS42KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRNZXRyaWMoKSB7XHJcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVycyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVtcENvbnRhaW5lcicpXTtcclxuICAgIGNvbnN0IGRpc3RhbmNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc3RhbmNlQ29udGFpbmVyJyk7XHJcbiAgICB0ZW1wQ29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcclxuICAgICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBGYXJlbmhlaXRUb0NlbHN1cyhwYXJzZUludChjb250YWluZXIudGV4dENvbnRlbnQpKTtcclxuICAgIH0pO1xyXG4gICAgZGlzdGFuY2VDb250YWluZXIudGV4dENvbnRlbnQgPSBtaWxlVG9LaWxvbWV0ZXIocGFyc2VJbnQoZGlzdGFuY2VDb250YWluZXIudGV4dENvbnRlbnQpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRJbXBlcmljYWwoKSB7XHJcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVycyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVtcENvbnRhaW5lcicpXTtcclxuICAgIGNvbnN0IGRpc3RhbmNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc3RhbmNlQ29udGFpbmVyJyk7XHJcbiAgICB0ZW1wQ29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcclxuICAgICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBjZWxzaXVzVG9GYXJlbmhlaXQocGFyc2VJbnQoY29udGFpbmVyLnRleHRDb250ZW50KSk7XHJcbiAgICB9KTtcclxuICAgIGRpc3RhbmNlQ29udGFpbmVyLnRleHRDb250ZW50ID0ga2lsb21ldGVyVG9NaWxlKHBhcnNlSW50KGRpc3RhbmNlQ29udGFpbmVyLnRleHRDb250ZW50KSk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBBUEkgZnJvbSAnLi9tb2R1bGVzL2FwaUZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IGNvbnZlcnRJbXBlcmljYWwsIGNvbnZlcnRNZXRyaWMgfSBmcm9tICcuL21vZHVsZXMvdW5pdENvbnZlcnNpb24nO1xyXG5cclxuY29uc3Qgc2VhcmNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYS1zZWFyY2hlbmdpbicpO1xyXG5jb25zdCBjaXR5U2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHlOYW1lJyk7XHJcbmNvbnN0IGlzb1NlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpc29Db2RlJyk7XHJcbmNvbnN0IHVuaXRTd2l0Y2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5pdFN3aXRjaCcpO1xyXG4vLyBzZXR0aW5nIHVwIGV2ZW50IGxpc3RlbmVyc1xyXG5zZWFyY2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eU5hbWUnKS52YWx1ZTtcclxuICAgIGNvbnN0IElzbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpc29Db2RlJykudmFsdWU7XHJcbiAgICBBUEkucHJvY2Vzc1NlYXJjaChjaXR5TmFtZSwgSXNvKTtcclxufSk7XHJcbmNpdHlTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eU5hbWUnKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBJc28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaXNvQ29kZScpLnZhbHVlO1xyXG4gICAgICAgIEFQSS5wcm9jZXNzU2VhcmNoKGNpdHlOYW1lLCBJc28pO1xyXG4gICAgfVxyXG59KTtcclxuaXNvU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHlOYW1lJykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgSXNvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lzb0NvZGUnKS52YWx1ZTtcclxuICAgICAgICBBUEkucHJvY2Vzc1NlYXJjaChjaXR5TmFtZSwgSXNvKTtcclxuICAgIH1cclxufSk7XHJcblxyXG51bml0U3dpdGNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgIGNvbnN0IHN3aXRjaFN0YXRlID0gdW5pdFN3aXRjaC5jaGVja2VkO1xyXG4gICAgaWYgKHN3aXRjaFN0YXRlKSB7XHJcbiAgICAgICAgLy8gaW1wZXJpY2FsXHJcbiAgICAgICAgY29udmVydEltcGVyaWNhbCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBtZXRyaWNcclxuICAgICAgICBjb252ZXJ0TWV0cmljKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gQVBJLnByb2Nlc3NTZWFyY2goJ21lbGJvdXJuZScsICdhdScpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=