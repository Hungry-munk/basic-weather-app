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

            <div>${Math.round(weatherData.temperatureDetails.temp)} ℃</div>
               
            <div class="weatherDescription">${weatherData.descriptionDetails.description}</div>
        </div> 

        <div class="otherDetailsContainer">
            <div>Feels like : ${Math.round(weatherData.temperatureDetails.feels_like)} ℃</div>
            <div>Max temp : ${Math.round(weatherData.temperatureDetails.temp_max)} ℃</div>
            <div>Min temp : ${Math.round(weatherData.temperatureDetails.temp_min)} ℃</div>
            <div>wind: ${weatherData.windDetails.speed} km/h</div>
        </div>
        
    `;
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


const searchIcon = document.querySelector('.fa-searchengin');
const citySearch = document.querySelector('#cityName');
const isoSearch = document.querySelector('#isoCode');
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvYXBpRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRE9NIGZyb20gJy4vZG9tTWFuaXB1bGF0aW9uJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uRGF0YShjaXR5TmFtZSwgY291bnRyeU5hbWUpIHtcclxuICAgIGNvbnN0IGdlb0xvY2F0aW9uVXJsID0gYGh0dHBzOi8vYXBpLmFwaS1uaW5qYXMuY29tL3YxL2dlb2NvZGluZz9jaXR5PVxyXG4gICAgXHQke2NpdHlOYW1lLnRvTG93ZXJDYXNlKCl9JmNvdW50cnk9JHtjb3VudHJ5TmFtZS50b0xvd2VyQ2FzZSgpfWA7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgJ1gtQXBpLUtleSc6ICdsWWNVY1hrMW1qNVR3RTZuM05tVmpBPT1iZjRrSVl3OXRnRXpGYVpHJyB9LFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBmZXRjaChnZW9Mb2NhdGlvblVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIFsuLi4oYXdhaXQgbG9jYXRpb25EYXRhLmpzb24oKSldWzBdO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgaWYgKGVyci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCc0MDQsIGxvY2F0aW9uIHdhc250IGZvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uV2F0aGVyRGF0YShsYXQsIGxvbikge1xyXG4gICAgY29uc3QgYXBpS2V5ID0gJzRiZDU1NDllODc2ZDA4NWM2NjNmYWIwODI4MTE0ZjcxJztcclxuICAgIGNvbnN0IG9wZW5XYXRoZXJVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXJcclxuXHRcdD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHthcGlLZXl9JnVuaXRzPW1ldHJpY2A7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb25EYXRhID0gYXdhaXQgZmV0Y2gob3BlbldhdGhlclVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGxvY2F0aW9uRGF0YS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBpZiAoZXJyLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJzQwNCwgbG9jYXRpb24gd2FzbnQgZm91bmQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25JbWFnZURhdGEoY2l0eU5hbWUsIHN0YXRlTmFtZSkge1xyXG4gICAgY29uc3QgYXBpS2V5ID0gJ2g2cTFaS2p0cUJLV1RoM3ZMb3M4UDExa2RuRjZ4N1RfQXAwRy1lRW9ZRWcnO1xyXG4gICAgY29uc3QgdW5zcGxhc2hVcmwgPSBgaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9yYW5kb21cclxuXHRcdD9xdWVyeT0ke2NpdHlOYW1lfSAke3N0YXRlTmFtZX0mb3JpZW50YXRpb249bGFuZHNjYXBlJmNsaWVudF9pZD0ke2FwaUtleX1gO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gYXdhaXQgZmV0Y2godW5zcGxhc2hVcmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBpbWFnZURhdGEuanNvbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tcGxldGVBcGlEYXRhKGNpdHlOYW1lLCBjb3VudHJ5KSB7XHJcbiAgICBjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBnZXRMb2NhdGlvbkRhdGEoY2l0eU5hbWUsIGNvdW50cnkpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyB0cnlpbmcgb3V0IGNvb2wgZGVjb25zdHJ1Y2l0b24gc3ludGF4XHJcbiAgICAgICAgY29uc3QgW3dlYXRoZXJEYXRhLCBpbWFnZURhdGFdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICBnZXRMb2NhdGlvbldhdGhlckRhdGEobG9jYXRpb25EYXRhLmxhdGl0dWRlLCBsb2NhdGlvbkRhdGEubG9uZ2l0dWRlKSxcclxuICAgICAgICAgICAgZ2V0TG9jYXRpb25JbWFnZURhdGEobG9jYXRpb25EYXRhLm5hbWUsIGxvY2F0aW9uRGF0YS5zdGF0ZSlcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0YVN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgY29tcGxldGVMb2NhdGlvbkRhdGE6IGxvY2F0aW9uRGF0YSxcclxuICAgICAgICAgICAgY29tcGxldGVXZWF0aGVyRGF0YTogd2VhdGhlckRhdGEsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlaW1hZ2VEYXRhOiBpbWFnZURhdGFcclxuICAgICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihuZXcgRXJyb3IoJ2xvY2F0aW9uIG5vdCBmb3VuZCcpKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhU3RhdHVzOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJBcGlEYXRhKGNvbXBsZXRlQXBpRGF0YSkge1xyXG4gICAgY29uc3QgeyBjb21wbGV0ZVdlYXRoZXJEYXRhIH0gPSBjb21wbGV0ZUFwaURhdGE7XHJcbiAgICBjb25zdCBjb21wbGV0ZUltYWdlRGF0YSA9IGNvbXBsZXRlQXBpRGF0YS5jb21wbGV0ZWltYWdlRGF0YTtcclxuICAgIGNvbnN0IHsgY29tcGxldGVMb2NhdGlvbkRhdGEgfSA9IGNvbXBsZXRlQXBpRGF0YTtcclxuICAgIC8vIHJldHVybmluZyBkYXRhIEkgYWN0YXVsbHkgbmVlZFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsb2NhdGlvbkRhdGE6IHtcclxuICAgICAgICAgICAgY2l0eTogY29tcGxldGVMb2NhdGlvbkRhdGEubmFtZSxcclxuICAgICAgICAgICAgc3RhdGU6IGNvbXBsZXRlTG9jYXRpb25EYXRhLnN0YXRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3ZWF0aGVyRGF0YToge1xyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZURldGFpbHM6IGNvbXBsZXRlV2VhdGhlckRhdGEubWFpbixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb25EZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLndlYXRoZXJbMF0sXHJcbiAgICAgICAgICAgIHdpbmREZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLndpbmRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGltYWdlRGF0YToge1xyXG4gICAgICAgICAgICBpbWFnZVVybDogY29tcGxldGVJbWFnZURhdGEudXJscy5zbWFsbCxcclxuICAgICAgICAgICAgYWx0RGVzY3JpcHRpb246IGNvbXBsZXRlSW1hZ2VEYXRhLmFsdF9kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgY3JlYXRvckRldGFpbHM6IHtcclxuICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogY29tcGxldGVJbWFnZURhdGEudXNlci5maXJzdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgbGFzdE5hbWU6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIubGFzdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgYWNjb3VudExpbms6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIubGlua3MuaHRtbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NTZWFyY2goKSB7XHJcbiAgICBjb25zdCBjaXR5TmFtZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHlOYW1lJykudmFsdWU7XHJcbiAgICBjb25zdCBJc29WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpc29Db2RlJykudmFsdWU7XHJcbiAgICBjb25zdCByZWdleCA9IC9eXFxzKiQvZztcclxuICAgIGlmIChyZWdleC50ZXN0KElzb1ZhbHVlIHx8IGNpdHlOYW1lVmFsdWUpKSB7XHJcbiAgICAgICAgRE9NLmRpc3BsYXlTZWFyY2hFcnJvcignbXVzdCBlbnRlciBib3RoIHZhbHVlcycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZUFwaURhdGEgPSBhd2FpdCBnZXRDb21wbGV0ZUFwaURhdGEoY2l0eU5hbWVWYWx1ZSwgSXNvVmFsdWUpO1xyXG4gICAgICAgIGlmIChjb21wbGV0ZUFwaURhdGEuZGF0YVN0YXR1cykge1xyXG4gICAgICAgICAgICBET00uZGlzcGxheVdlYXRoZXJEYXRhKGZpbHRlckFwaURhdGEoY29tcGxldGVBcGlEYXRhKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NLmRpc3BsYXlTZWFyY2hFcnJvcignbG9jYXRpb24gbm90IGZvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEFQSSBmcm9tICcuL2FwaUZ1bmN0aW9ucyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVNlYXJjaEVycm9yKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IGVycm9yTXNnRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvck1zZycpO1xyXG4gICAgZXJyb3JNc2dFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGVycm9yTXNnRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgfSwgMTUwMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5V2VhdGhlckRhdGEoYXBpRGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coYXBpRGF0YSk7XHJcbiAgICAvLyBzZXBlcmF0aW5nIGRhdGFcclxuICAgIGNvbnN0IGxvY2F0aW9uRGF0YSA9IGFwaURhdGEubG9jYXRpb25EYXRhO1xyXG4gICAgY29uc3QgaW1hZ2VEYXRhID0gYXBpRGF0YS5pbWFnZURhdGE7XHJcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGFwaURhdGEud2VhdGhlckRhdGE7XHJcbiAgICAvLyBnYXRoZXJpbmcgZWxlbWVudHMgdG8gc2hvdyB0aGUgZGF0YVxyXG4gICAgY29uc3QgaW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvQ29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBsb2NhdGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uVGl0bGUnKTtcclxuICAgIGNvbnN0IHdlYXRoZXJJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJJbmZvQ29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBpbWFnZUNyZWFkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltYWdlQ3JlZGl0cycpO1xyXG5cclxuICAgIGluZm9Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7aW1hZ2VEYXRhLmltYWdlVXJsfVwiKWA7XHJcbiAgICBsb2NhdGlvblRpdGxlLnRleHRDb250ZW50ID0gYCR7bG9jYXRpb25EYXRhLmNpdHl9LCAke2xvY2F0aW9uRGF0YS5zdGF0ZX1gO1xyXG4gICAgaW1hZ2VDcmVhZGl0cy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgaW1hZ2UgYnkgJHtpbWFnZURhdGEuY3JlYXRvckRldGFpbHMuZmlyc3ROYW1lfSAke2ltYWdlRGF0YS5jcmVhdG9yRGV0YWlscy5sYXN0TmFtZX0gXHJcbiAgICAgICAgb24gPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7aW1hZ2VEYXRhLmNyZWF0b3JEZXRhaWxzLmFjY291bnRMaW5rfVwiPnVuc3BsYXNoPC9hPiBcclxuICAgIGA7XHJcbiAgICB3ZWF0aGVySW5mb0NvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5EZXRhaWxzQ29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxpbWcgYWx0PVwiJHt3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbkRldGFpbHMubWFpbn1cIiBzcmM9XHJcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJHt3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbkRldGFpbHMuaWNvbn0ucG5nXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2PiR7TWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS50ZW1wZXJhdHVyZURldGFpbHMudGVtcCl9IOKEgzwvZGl2PlxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlYXRoZXJEZXNjcmlwdGlvblwiPiR7d2VhdGhlckRhdGEuZGVzY3JpcHRpb25EZXRhaWxzLmRlc2NyaXB0aW9ufTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PiBcclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm90aGVyRGV0YWlsc0NvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2PkZlZWxzIGxpa2UgOiAke01hdGgucm91bmQod2VhdGhlckRhdGEudGVtcGVyYXR1cmVEZXRhaWxzLmZlZWxzX2xpa2UpfSDihIM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5NYXggdGVtcCA6ICR7TWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS50ZW1wZXJhdHVyZURldGFpbHMudGVtcF9tYXgpfSDihIM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5NaW4gdGVtcCA6ICR7TWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS50ZW1wZXJhdHVyZURldGFpbHMudGVtcF9taW4pfSDihIM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj53aW5kOiAke3dlYXRoZXJEYXRhLndpbmREZXRhaWxzLnNwZWVkfSBrbS9oPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICBgO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgQVBJIGZyb20gJy4vbW9kdWxlcy9hcGlGdW5jdGlvbnMnO1xyXG5cclxuY29uc3Qgc2VhcmNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYS1zZWFyY2hlbmdpbicpO1xyXG5jb25zdCBjaXR5U2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHlOYW1lJyk7XHJcbmNvbnN0IGlzb1NlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpc29Db2RlJyk7XHJcbi8vIHNldHRpbmcgdXAgZXZlbnQgbGlzdGVuZXJzXHJcbnNlYXJjaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBBUEkucHJvY2Vzc1NlYXJjaCk7XHJcbmNpdHlTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgQVBJLnByb2Nlc3NTZWFyY2goKTtcclxuICAgIH1cclxufSk7XHJcbmlzb1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XHJcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICBBUEkucHJvY2Vzc1NlYXJjaCgpO1xyXG4gICAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9