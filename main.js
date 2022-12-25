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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDNkI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBaUI7QUFDckIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnRUFBaUI7QUFDekI7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdFQUFpQjtBQUN6QjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5RUFBZ0I7QUFDeEIsTUFBTTtBQUNOO0FBQ0EsUUFBUSxzRUFBYTtBQUNyQjtBQUNBLENBQUM7QUFDRDtBQUNBLGdFQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvYXBpRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvdW5pdENvbnZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBET00gZnJvbSAnLi9kb21NYW5pcHVsYXRpb24nO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25EYXRhKGNpdHlOYW1lLCBjb3VudHJ5TmFtZSkge1xyXG4gICAgY29uc3QgZ2VvTG9jYXRpb25VcmwgPSBgaHR0cHM6Ly9hcGkuYXBpLW5pbmphcy5jb20vdjEvZ2VvY29kaW5nP2NpdHk9XHJcbiAgICBcdCR7Y2l0eU5hbWUudG9Mb3dlckNhc2UoKX0mY291bnRyeT0ke2NvdW50cnlOYW1lLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBtb2RlOiAnY29ycycsXHJcbiAgICAgICAgaGVhZGVyczogeyAnWC1BcGktS2V5JzogJ2xZY1VjWGsxbWo1VHdFNm4zTm1WakE9PWJmNGtJWXc5dGdFekZhWkcnIH0sXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGZldGNoKGdlb0xvY2F0aW9uVXJsLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gWy4uLihhd2FpdCBsb2NhdGlvbkRhdGEuanNvbigpKV1bMF07XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBpZiAoZXJyLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJzQwNCwgbG9jYXRpb24gd2FzbnQgZm91bmQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25XYXRoZXJEYXRhKGxhdCwgbG9uKSB7XHJcbiAgICBjb25zdCBhcGlLZXkgPSAnNGJkNTU0OWU4NzZkMDg1YzY2M2ZhYjA4MjgxMTRmNzEnO1xyXG4gICAgY29uc3Qgb3BlbldhdGhlclVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlclxyXG5cdFx0P2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZhcHBpZD0ke2FwaUtleX0mdW5pdHM9bWV0cmljYDtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBmZXRjaChvcGVuV2F0aGVyVXJsLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgbG9jYXRpb25EYXRhLmpzb24oKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGlmIChlcnIucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignNDA0LCBsb2NhdGlvbiB3YXNudCBmb3VuZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRMb2NhdGlvbkltYWdlRGF0YShjaXR5TmFtZSwgc3RhdGVOYW1lKSB7XHJcbiAgICBjb25zdCBhcGlLZXkgPSAnaDZxMVpLanRxQktXVGgzdkxvczhQMTFrZG5GNng3VF9BcDBHLWVFb1lFZyc7XHJcbiAgICBjb25zdCB1bnNwbGFzaFVybCA9IGBodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3JhbmRvbVxyXG5cdFx0P3F1ZXJ5PSR7Y2l0eU5hbWV9ICR7c3RhdGVOYW1lfSZvcmllbnRhdGlvbj1sYW5kc2NhcGUmY2xpZW50X2lkPSR7YXBpS2V5fWA7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBhd2FpdCBmZXRjaCh1bnNwbGFzaFVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGltYWdlRGF0YS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb21wbGV0ZUFwaURhdGEoY2l0eU5hbWUsIGNvdW50cnkpIHtcclxuICAgIGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGdldExvY2F0aW9uRGF0YShjaXR5TmFtZSwgY291bnRyeSk7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIHRyeWluZyBvdXQgY29vbCBkZWNvbnN0cnVjaXRvbiBzeW50YXhcclxuICAgICAgICBjb25zdCBbd2VhdGhlckRhdGEsIGltYWdlRGF0YV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIGdldExvY2F0aW9uV2F0aGVyRGF0YShsb2NhdGlvbkRhdGEubGF0aXR1ZGUsIGxvY2F0aW9uRGF0YS5sb25naXR1ZGUpLFxyXG4gICAgICAgICAgICBnZXRMb2NhdGlvbkltYWdlRGF0YShsb2NhdGlvbkRhdGEubmFtZSwgbG9jYXRpb25EYXRhLnN0YXRlKVxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhU3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjb21wbGV0ZUxvY2F0aW9uRGF0YTogbG9jYXRpb25EYXRhLFxyXG4gICAgICAgICAgICBjb21wbGV0ZVdlYXRoZXJEYXRhOiB3ZWF0aGVyRGF0YSxcclxuICAgICAgICAgICAgY29tcGxldGVpbWFnZURhdGE6IGltYWdlRGF0YVxyXG4gICAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKG5ldyBFcnJvcignbG9jYXRpb24gbm90IGZvdW5kJykpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGFTdGF0dXM6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckFwaURhdGEoY29tcGxldGVBcGlEYXRhKSB7XHJcbiAgICBjb25zdCB7IGNvbXBsZXRlV2VhdGhlckRhdGEgfSA9IGNvbXBsZXRlQXBpRGF0YTtcclxuICAgIGNvbnN0IGNvbXBsZXRlSW1hZ2VEYXRhID0gY29tcGxldGVBcGlEYXRhLmNvbXBsZXRlaW1hZ2VEYXRhO1xyXG4gICAgY29uc3QgeyBjb21wbGV0ZUxvY2F0aW9uRGF0YSB9ID0gY29tcGxldGVBcGlEYXRhO1xyXG4gICAgLy8gcmV0dXJuaW5nIGRhdGEgSSBhY3RhdWxseSBuZWVkXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvY2F0aW9uRGF0YToge1xyXG4gICAgICAgICAgICBjaXR5OiBjb21wbGV0ZUxvY2F0aW9uRGF0YS5uYW1lLFxyXG4gICAgICAgICAgICBzdGF0ZTogY29tcGxldGVMb2NhdGlvbkRhdGEuc3RhdGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdlYXRoZXJEYXRhOiB7XHJcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlRGV0YWlsczogY29tcGxldGVXZWF0aGVyRGF0YS5tYWluLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbkRldGFpbHM6IGNvbXBsZXRlV2VhdGhlckRhdGEud2VhdGhlclswXSxcclxuICAgICAgICAgICAgd2luZERldGFpbHM6IGNvbXBsZXRlV2VhdGhlckRhdGEud2luZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW1hZ2VEYXRhOiB7XHJcbiAgICAgICAgICAgIGltYWdlVXJsOiBjb21wbGV0ZUltYWdlRGF0YS51cmxzLnNtYWxsLFxyXG4gICAgICAgICAgICBhbHREZXNjcmlwdGlvbjogY29tcGxldGVJbWFnZURhdGEuYWx0X2Rlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBjcmVhdG9yRGV0YWlsczoge1xyXG4gICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBjb21wbGV0ZUltYWdlRGF0YS51c2VyLmZpcnN0X25hbWUsXHJcbiAgICAgICAgICAgICAgICBsYXN0TmFtZTogY29tcGxldGVJbWFnZURhdGEudXNlci5sYXN0X25hbWUsXHJcbiAgICAgICAgICAgICAgICBhY2NvdW50TGluazogY29tcGxldGVJbWFnZURhdGEudXNlci5saW5rcy5odG1sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1NlYXJjaChjaXR5TmFtZSwgSXNvKSB7XHJcbiAgICBjb25zdCByZWdleCA9IC9eXFxzKiQvZztcclxuICAgIGlmIChyZWdleC50ZXN0KElzbyB8fCBjaXR5TmFtZSkpIHtcclxuICAgICAgICBET00uZGlzcGxheVNlYXJjaEVycm9yKCdtdXN0IGVudGVyIGJvdGggdmFsdWVzJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlQXBpRGF0YSA9IGF3YWl0IGdldENvbXBsZXRlQXBpRGF0YShjaXR5TmFtZSwgSXNvKTtcclxuICAgICAgICBpZiAoY29tcGxldGVBcGlEYXRhLmRhdGFTdGF0dXMpIHtcclxuICAgICAgICAgICAgRE9NLmRpc3BsYXlXZWF0aGVyRGF0YShmaWx0ZXJBcGlEYXRhKGNvbXBsZXRlQXBpRGF0YSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIERPTS5kaXNwbGF5U2VhcmNoRXJyb3IoJ2xvY2F0aW9uIG5vdCBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBBUEkgZnJvbSAnLi9hcGlGdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyBjb252ZXJ0SW1wZXJpY2FsIH0gZnJvbSAnLi91bml0Q29udmVyc2lvbic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVNlYXJjaEVycm9yKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IGVycm9yTXNnRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvck1zZycpO1xyXG4gICAgZXJyb3JNc2dFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGVycm9yTXNnRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgfSwgMTUwMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5V2VhdGhlckRhdGEoYXBpRGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coYXBpRGF0YSk7XHJcbiAgICAvLyBzZXBlcmF0aW5nIGRhdGFcclxuICAgIGNvbnN0IGxvY2F0aW9uRGF0YSA9IGFwaURhdGEubG9jYXRpb25EYXRhO1xyXG4gICAgY29uc3QgaW1hZ2VEYXRhID0gYXBpRGF0YS5pbWFnZURhdGE7XHJcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGFwaURhdGEud2VhdGhlckRhdGE7XHJcbiAgICAvLyBnYXRoZXJpbmcgZWxlbWVudHMgdG8gc2hvdyB0aGUgZGF0YVxyXG4gICAgY29uc3QgaW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvQ29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBsb2NhdGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uVGl0bGUnKTtcclxuICAgIGNvbnN0IHdlYXRoZXJJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJJbmZvQ29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBpbWFnZUNyZWFkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltYWdlQ3JlZGl0cycpO1xyXG5cclxuICAgIGluZm9Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7aW1hZ2VEYXRhLmltYWdlVXJsfVwiKWA7XHJcbiAgICBsb2NhdGlvblRpdGxlLnRleHRDb250ZW50ID0gYCR7bG9jYXRpb25EYXRhLmNpdHl9LCAke2xvY2F0aW9uRGF0YS5zdGF0ZX1gO1xyXG4gICAgaW1hZ2VDcmVhZGl0cy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgaW1hZ2UgYnkgJHtpbWFnZURhdGEuY3JlYXRvckRldGFpbHMuZmlyc3ROYW1lfSAke2ltYWdlRGF0YS5jcmVhdG9yRGV0YWlscy5sYXN0TmFtZX0gXHJcbiAgICAgICAgb24gPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7aW1hZ2VEYXRhLmNyZWF0b3JEZXRhaWxzLmFjY291bnRMaW5rfVwiPnVuc3BsYXNoPC9hPiBcclxuICAgIGA7XHJcbiAgICB3ZWF0aGVySW5mb0NvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5EZXRhaWxzQ29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxpbWcgYWx0PVwiJHt3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbkRldGFpbHMubWFpbn1cIiBzcmM9XHJcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJHt3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbkRldGFpbHMuaWNvbn0ucG5nXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVtcENvbnRhaW5lclwiPiR7TWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS50ZW1wZXJhdHVyZURldGFpbHMudGVtcCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VhdGhlckRlc2NyaXB0aW9uXCI+JHt3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbkRldGFpbHMuZGVzY3JpcHRpb259PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+IFxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3RoZXJEZXRhaWxzQ29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5GZWVscyBsaWtlOiA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRlbXBDb250YWluZXJcIj4ke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRhdGEudGVtcGVyYXR1cmVEZXRhaWxzLmZlZWxzX2xpa2VcclxuICAgICAgICAgICAgICAgICl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5NYXggdGVtcDogPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZW1wQ29udGFpbmVyXCI+JHtNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEYXRhLnRlbXBlcmF0dXJlRGV0YWlscy50ZW1wX21heFxyXG4gICAgICAgICAgICAgICAgKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+TWluIHRlbXA6IDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGVtcENvbnRhaW5lclwiPiR7TWF0aC5yb3VuZChcclxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyRGF0YS50ZW1wZXJhdHVyZURldGFpbHMudGVtcF9taW5cclxuICAgICAgICAgICAgICAgICl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPldpbmQ6IDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGlzdGFuY2VDb250YWluZXJcIj4gJHtNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLndpbmREZXRhaWxzLnNwZWVkKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIFxyXG4gICAgYDtcclxuXHJcbiAgICBjb25zdCB1bml0U3dpdGNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVuaXRTd2l0Y2gnKTtcclxuICAgIGNvbnN0IHN3aXRjaFN0YXRlID0gdW5pdFN3aXRjaC5jaGVja2VkO1xyXG4gICAgaWYgKHN3aXRjaFN0YXRlKSB7XHJcbiAgICAgICAgLy8gaW1wZXJpY2FsXHJcbiAgICAgICAgY29udmVydEltcGVyaWNhbCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImZ1bmN0aW9uIGNlbHNpdXNUb0ZhcmVuaGVpdChudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKChudW1iZXIgKiA5KSAvIDUuMCArIDMyLjApO1xyXG59XHJcbmZ1bmN0aW9uIEZhcmVuaGVpdFRvQ2Vsc3VzKG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKChudW1iZXIgLSAzMi4wKSAqIDUuMCkgLyA5LjApO1xyXG59XHJcbmZ1bmN0aW9uIG1pbGVUb0tpbG9tZXRlcihudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKG51bWJlciAvIDEuNik7XHJcbn1cclxuZnVuY3Rpb24ga2lsb21ldGVyVG9NaWxlKG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQobnVtYmVyICogMS42KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRNZXRyaWMoKSB7XHJcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVycyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVtcENvbnRhaW5lcicpXTtcclxuICAgIGNvbnN0IGRpc3RhbmNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc3RhbmNlQ29udGFpbmVyJyk7XHJcbiAgICB0ZW1wQ29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcclxuICAgICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBGYXJlbmhlaXRUb0NlbHN1cyhwYXJzZUludChjb250YWluZXIudGV4dENvbnRlbnQpKTtcclxuICAgIH0pO1xyXG4gICAgZGlzdGFuY2VDb250YWluZXIudGV4dENvbnRlbnQgPSBtaWxlVG9LaWxvbWV0ZXIocGFyc2VJbnQoZGlzdGFuY2VDb250YWluZXIudGV4dENvbnRlbnQpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRJbXBlcmljYWwoKSB7XHJcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVycyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVtcENvbnRhaW5lcicpXTtcclxuICAgIGNvbnN0IGRpc3RhbmNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc3RhbmNlQ29udGFpbmVyJyk7XHJcbiAgICB0ZW1wQ29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcclxuICAgICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBjZWxzaXVzVG9GYXJlbmhlaXQocGFyc2VJbnQoY29udGFpbmVyLnRleHRDb250ZW50KSk7XHJcbiAgICB9KTtcclxuICAgIGRpc3RhbmNlQ29udGFpbmVyLnRleHRDb250ZW50ID0ga2lsb21ldGVyVG9NaWxlKHBhcnNlSW50KGRpc3RhbmNlQ29udGFpbmVyLnRleHRDb250ZW50KSk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBBUEkgZnJvbSAnLi9tb2R1bGVzL2FwaUZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IGNvbnZlcnRJbXBlcmljYWwsIGNvbnZlcnRNZXRyaWMgfSBmcm9tICcuL21vZHVsZXMvdW5pdENvbnZlcnNpb24nO1xyXG5cclxuY29uc3Qgc2VhcmNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYS1zZWFyY2hlbmdpbicpO1xyXG5jb25zdCBjaXR5U2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHlOYW1lJyk7XHJcbmNvbnN0IGlzb1NlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpc29Db2RlJyk7XHJcbmNvbnN0IHVuaXRTd2l0Y2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5pdFN3aXRjaCcpO1xyXG4vLyBzZXR0aW5nIHVwIGV2ZW50IGxpc3RlbmVyc1xyXG5zZWFyY2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eU5hbWUnKS52YWx1ZTtcclxuICAgIGNvbnN0IElzbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpc29Db2RlJykudmFsdWU7XHJcbiAgICBBUEkucHJvY2Vzc1NlYXJjaChjaXR5TmFtZSwgSXNvKTtcclxufSk7XHJcbmNpdHlTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eU5hbWUnKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBJc28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaXNvQ29kZScpLnZhbHVlO1xyXG4gICAgICAgIEFQSS5wcm9jZXNzU2VhcmNoKGNpdHlOYW1lLCBJc28pO1xyXG4gICAgfVxyXG59KTtcclxuaXNvU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHlOYW1lJykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgSXNvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lzb0NvZGUnKS52YWx1ZTtcclxuICAgICAgICBBUEkucHJvY2Vzc1NlYXJjaChjaXR5TmFtZSwgSXNvKTtcclxuICAgIH1cclxufSk7XHJcblxyXG51bml0U3dpdGNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgIGNvbnN0IHN3aXRjaFN0YXRlID0gdW5pdFN3aXRjaC5jaGVja2VkO1xyXG4gICAgaWYgKHN3aXRjaFN0YXRlKSB7XHJcbiAgICAgICAgLy8gaW1wZXJpY2FsXHJcbiAgICAgICAgY29udmVydEltcGVyaWNhbCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBtZXRyaWNcclxuICAgICAgICBjb252ZXJ0TWV0cmljKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuQVBJLnByb2Nlc3NTZWFyY2goJ21lbGJvdXJuZScsICdhdScpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=