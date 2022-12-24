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
/* harmony export */   "getCompleteApiData": () => (/* binding */ getCompleteApiData)
/* harmony export */ });
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
			getLocationWatherData(
				locationData.latitude,
				locationData.longitude
			),
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
			imageUrl: completeImageData.urls.full,
			altDescription: completeImageData.alt_description,
			creatorDetails: {
				firstName: completeImageData.user.first_name,
				lastName: completeImageData.user.last_name,
				accountLink: completeImageData.user.links.html
			}
		}
	};
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


// API.getCompleteApiData('melbourne', 'au')
//     .then((response) => {
//         if (response.dataStatus) {
//             console.log(response);
//             return API.filterApiData(response);
//         }
//     })
//     .then((response) => {
//         console.log(response);
//     });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsT0FBTyx1QkFBdUIsV0FBVywwQkFBMEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsYUFBYSx5REFBeUQ7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSSxPQUFPLElBQUksU0FBUyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVSxFQUFFLFVBQVUsbUNBQW1DLE9BQU87QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxTQUFTLHNCQUFzQjtBQUMvQjtBQUNBLFNBQVMsdUJBQXVCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2xIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9hcGlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhc3luYyBmdW5jdGlvbiBnZXRMb2NhdGlvbkRhdGEoY2l0eU5hbWUsIGNvdW50cnlOYW1lKSB7XHJcblx0Y29uc3QgZ2VvTG9jYXRpb25VcmwgPSBgaHR0cHM6Ly9hcGkuYXBpLW5pbmphcy5jb20vdjEvZ2VvY29kaW5nP2NpdHk9XHJcbiAgICBcdCR7Y2l0eU5hbWUudG9Mb3dlckNhc2UoKX0mY291bnRyeT0ke2NvdW50cnlOYW1lLnRvTG93ZXJDYXNlKCl9YDtcclxuXHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdG1vZGU6ICdjb3JzJyxcclxuXHRcdGhlYWRlcnM6IHsgJ1gtQXBpLUtleSc6ICdsWWNVY1hrMW1qNVR3RTZuM05tVmpBPT1iZjRrSVl3OXRnRXpGYVpHJyB9LFxyXG5cdFx0Y29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdH07XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBmZXRjaChnZW9Mb2NhdGlvblVybCwgb3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gWy4uLihhd2FpdCBsb2NhdGlvbkRhdGEuanNvbigpKV1bMF07XHJcblx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRpZiAoZXJyLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJzQwNCwgbG9jYXRpb24gd2FzbnQgZm91bmQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRMb2NhdGlvbldhdGhlckRhdGEobGF0LCBsb24pIHtcclxuXHRjb25zdCBhcGlLZXkgPSAnNGJkNTU0OWU4NzZkMDg1YzY2M2ZhYjA4MjgxMTRmNzEnO1xyXG5cdGNvbnN0IG9wZW5XYXRoZXJVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXJcclxuXHRcdD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHthcGlLZXl9YDtcclxuXHJcblx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRtb2RlOiAnY29ycycsXHJcblx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGZldGNoKG9wZW5XYXRoZXJVcmwsIG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIGF3YWl0IGxvY2F0aW9uRGF0YS5qc29uKCk7XHJcblx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRpZiAoZXJyLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJzQwNCwgbG9jYXRpb24gd2FzbnQgZm91bmQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRMb2NhdGlvbkltYWdlRGF0YShjaXR5TmFtZSwgc3RhdGVOYW1lKSB7XHJcblx0Y29uc3QgYXBpS2V5ID0gJ2g2cTFaS2p0cUJLV1RoM3ZMb3M4UDExa2RuRjZ4N1RfQXAwRy1lRW9ZRWcnO1xyXG5cdGNvbnN0IHVuc3BsYXNoVXJsID0gYGh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvcmFuZG9tXHJcblx0XHQ/cXVlcnk9JHtjaXR5TmFtZX0gJHtzdGF0ZU5hbWV9Jm9yaWVudGF0aW9uPWxhbmRzY2FwZSZjbGllbnRfaWQ9JHthcGlLZXl9YDtcclxuXHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdG1vZGU6ICdjb3JzJyxcclxuXHRcdGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9O1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgaW1hZ2VEYXRhID0gYXdhaXQgZmV0Y2godW5zcGxhc2hVcmwsIG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIGF3YWl0IGltYWdlRGF0YS5qc29uKCk7XHJcblx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tcGxldGVBcGlEYXRhKGNpdHlOYW1lLCBjb3VudHJ5KSB7XHJcblx0Y29uc3QgbG9jYXRpb25EYXRhID0gYXdhaXQgZ2V0TG9jYXRpb25EYXRhKGNpdHlOYW1lLCBjb3VudHJ5KTtcclxuXHR0cnkge1xyXG5cdFx0Ly8gdHJ5aW5nIG91dCBjb29sIGRlY29uc3RydWNpdG9uIHN5bnRheFxyXG5cdFx0Y29uc3QgW3dlYXRoZXJEYXRhLCBpbWFnZURhdGFdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG5cdFx0XHRnZXRMb2NhdGlvbldhdGhlckRhdGEoXHJcblx0XHRcdFx0bG9jYXRpb25EYXRhLmxhdGl0dWRlLFxyXG5cdFx0XHRcdGxvY2F0aW9uRGF0YS5sb25naXR1ZGVcclxuXHRcdFx0KSxcclxuXHRcdFx0Z2V0TG9jYXRpb25JbWFnZURhdGEobG9jYXRpb25EYXRhLm5hbWUsIGxvY2F0aW9uRGF0YS5zdGF0ZSlcclxuXHRcdF0pO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGRhdGFTdGF0dXM6IHRydWUsXHJcblx0XHRcdGNvbXBsZXRlTG9jYXRpb25EYXRhOiBsb2NhdGlvbkRhdGEsXHJcblx0XHRcdGNvbXBsZXRlV2VhdGhlckRhdGE6IHdlYXRoZXJEYXRhLFxyXG5cdFx0XHRjb21wbGV0ZWltYWdlRGF0YTogaW1hZ2VEYXRhXHJcblx0XHR9O1xyXG5cdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0Y29uc29sZS5lcnJvcihuZXcgRXJyb3IoJ2xvY2F0aW9uIG5vdCBmb3VuZCcpKTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGRhdGFTdGF0dXM6IGZhbHNlXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckFwaURhdGEoY29tcGxldGVBcGlEYXRhKSB7XHJcblx0Y29uc3QgeyBjb21wbGV0ZVdlYXRoZXJEYXRhIH0gPSBjb21wbGV0ZUFwaURhdGE7XHJcblx0Y29uc3QgY29tcGxldGVJbWFnZURhdGEgPSBjb21wbGV0ZUFwaURhdGEuY29tcGxldGVpbWFnZURhdGE7XHJcblx0Y29uc3QgeyBjb21wbGV0ZUxvY2F0aW9uRGF0YSB9ID0gY29tcGxldGVBcGlEYXRhO1xyXG5cdC8vIHJldHVybmluZyBkYXRhIEkgYWN0YXVsbHkgbmVlZFxyXG5cdHJldHVybiB7XHJcblx0XHRsb2NhdGlvbkRhdGE6IHtcclxuXHRcdFx0Y2l0eTogY29tcGxldGVMb2NhdGlvbkRhdGEubmFtZSxcclxuXHRcdFx0c3RhdGU6IGNvbXBsZXRlTG9jYXRpb25EYXRhLnN0YXRlXHJcblx0XHR9LFxyXG5cdFx0d2VhdGhlckRhdGE6IHtcclxuXHRcdFx0dGVtcGVyYXR1cmVEZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLm1haW4sXHJcblx0XHRcdGRlc2NyaXB0aW9uRGV0YWlsczogY29tcGxldGVXZWF0aGVyRGF0YS53ZWF0aGVyWzBdLFxyXG5cdFx0XHR3aW5kRGV0YWlsczogY29tcGxldGVXZWF0aGVyRGF0YS53aW5kXHJcblx0XHR9LFxyXG5cdFx0aW1hZ2VEYXRhOiB7XHJcblx0XHRcdGltYWdlVXJsOiBjb21wbGV0ZUltYWdlRGF0YS51cmxzLmZ1bGwsXHJcblx0XHRcdGFsdERlc2NyaXB0aW9uOiBjb21wbGV0ZUltYWdlRGF0YS5hbHRfZGVzY3JpcHRpb24sXHJcblx0XHRcdGNyZWF0b3JEZXRhaWxzOiB7XHJcblx0XHRcdFx0Zmlyc3ROYW1lOiBjb21wbGV0ZUltYWdlRGF0YS51c2VyLmZpcnN0X25hbWUsXHJcblx0XHRcdFx0bGFzdE5hbWU6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIubGFzdF9uYW1lLFxyXG5cdFx0XHRcdGFjY291bnRMaW5rOiBjb21wbGV0ZUltYWdlRGF0YS51c2VyLmxpbmtzLmh0bWxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBBUEkgZnJvbSAnLi9tb2R1bGVzL2FwaUZ1bmN0aW9ucyc7XHJcblxyXG4vLyBBUEkuZ2V0Q29tcGxldGVBcGlEYXRhKCdtZWxib3VybmUnLCAnYXUnKVxyXG4vLyAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGFTdGF0dXMpIHtcclxuLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gQVBJLmZpbHRlckFwaURhdGEocmVzcG9uc2UpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pXHJcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbi8vICAgICB9KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9