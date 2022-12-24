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
	const completeWeatherData = completeApiData.completeWeatherData;
	const completeImageData = completeApiData.completeimageData;
	const completeLocationData = completeApiData.completeLocationData;
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
// 	.then((response) => {
// 		if (response.dataStatus) {
// 			console.log(response);
// 			return API.filterApiData(response);
// 		}
// 	})
// 	.then((response) => {
// 		console.log(response);
// 	});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsT0FBTyx1QkFBdUIsV0FBVywwQkFBMEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsYUFBYSx5REFBeUQ7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSSxPQUFPLElBQUksU0FBUyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVSxFQUFFLFVBQVUsbUNBQW1DLE9BQU87QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDakhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2FwaUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uRGF0YShjaXR5TmFtZSwgY291bnRyeU5hbWUpIHtcclxuXHRjb25zdCBnZW9Mb2NhdGlvblVybCA9IGBodHRwczovL2FwaS5hcGktbmluamFzLmNvbS92MS9nZW9jb2Rpbmc/Y2l0eT1cclxuICAgIFx0JHtjaXR5TmFtZS50b0xvd2VyQ2FzZSgpfSZjb3VudHJ5PSR7Y291bnRyeU5hbWUudG9Mb3dlckNhc2UoKX1gO1xyXG5cdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0bW9kZTogJ2NvcnMnLFxyXG5cdFx0aGVhZGVyczogeyAnWC1BcGktS2V5JzogJ2xZY1VjWGsxbWo1VHdFNm4zTm1WakE9PWJmNGtJWXc5dGdFekZhWkcnIH0sXHJcblx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGZldGNoKGdlb0xvY2F0aW9uVXJsLCBvcHRpb25zKTtcclxuXHRcdHJldHVybiBbLi4uKGF3YWl0IGxvY2F0aW9uRGF0YS5qc29uKCkpXVswXTtcclxuXHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdGlmIChlcnIucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignNDA0LCBsb2NhdGlvbiB3YXNudCBmb3VuZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uV2F0aGVyRGF0YShsYXQsIGxvbikge1xyXG5cdGNvbnN0IGFwaUtleSA9ICc0YmQ1NTQ5ZTg3NmQwODVjNjYzZmFiMDgyODExNGY3MSc7XHJcblx0Y29uc3Qgb3BlbldhdGhlclVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlclxyXG5cdFx0P2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZhcHBpZD0ke2FwaUtleX1gO1xyXG5cclxuXHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdG1vZGU6ICdjb3JzJyxcclxuXHRcdGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9O1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgbG9jYXRpb25EYXRhID0gYXdhaXQgZmV0Y2gob3BlbldhdGhlclVybCwgb3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gYXdhaXQgbG9jYXRpb25EYXRhLmpzb24oKTtcclxuXHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdGlmIChlcnIucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignNDA0LCBsb2NhdGlvbiB3YXNudCBmb3VuZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uSW1hZ2VEYXRhKGNpdHlOYW1lLCBzdGF0ZU5hbWUpIHtcclxuXHRjb25zdCBhcGlLZXkgPSAnaDZxMVpLanRxQktXVGgzdkxvczhQMTFrZG5GNng3VF9BcDBHLWVFb1lFZyc7XHJcblx0Y29uc3QgdW5zcGxhc2hVcmwgPSBgaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9yYW5kb21cclxuXHRcdD9xdWVyeT0ke2NpdHlOYW1lfSAke3N0YXRlTmFtZX0mb3JpZW50YXRpb249bGFuZHNjYXBlJmNsaWVudF9pZD0ke2FwaUtleX1gO1xyXG5cdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0bW9kZTogJ2NvcnMnLFxyXG5cdFx0Y29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdH07XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBpbWFnZURhdGEgPSBhd2FpdCBmZXRjaCh1bnNwbGFzaFVybCwgb3B0aW9ucyk7XHJcblx0XHRyZXR1cm4gYXdhaXQgaW1hZ2VEYXRhLmpzb24oKTtcclxuXHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb21wbGV0ZUFwaURhdGEoY2l0eU5hbWUsIGNvdW50cnkpIHtcclxuXHRjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBnZXRMb2NhdGlvbkRhdGEoY2l0eU5hbWUsIGNvdW50cnkpO1xyXG5cdHRyeSB7XHJcblx0XHQvLyB0cnlpbmcgb3V0IGNvb2wgZGVjb25zdHJ1Y2l0b24gc3ludGF4XHJcblx0XHRjb25zdCBbd2VhdGhlckRhdGEsIGltYWdlRGF0YV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcblx0XHRcdGdldExvY2F0aW9uV2F0aGVyRGF0YShcclxuXHRcdFx0XHRsb2NhdGlvbkRhdGEubGF0aXR1ZGUsXHJcblx0XHRcdFx0bG9jYXRpb25EYXRhLmxvbmdpdHVkZVxyXG5cdFx0XHQpLFxyXG5cdFx0XHRnZXRMb2NhdGlvbkltYWdlRGF0YShsb2NhdGlvbkRhdGEubmFtZSwgbG9jYXRpb25EYXRhLnN0YXRlKVxyXG5cdFx0XSk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZGF0YVN0YXR1czogdHJ1ZSxcclxuXHRcdFx0Y29tcGxldGVMb2NhdGlvbkRhdGE6IGxvY2F0aW9uRGF0YSxcclxuXHRcdFx0Y29tcGxldGVXZWF0aGVyRGF0YTogd2VhdGhlckRhdGEsXHJcblx0XHRcdGNvbXBsZXRlaW1hZ2VEYXRhOiBpbWFnZURhdGFcclxuXHRcdH07XHJcblx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKG5ldyBFcnJvcignbG9jYXRpb24gbm90IGZvdW5kJykpO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZGF0YVN0YXR1czogZmFsc2VcclxuXHRcdH07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyQXBpRGF0YShjb21wbGV0ZUFwaURhdGEpIHtcclxuXHRjb25zdCBjb21wbGV0ZVdlYXRoZXJEYXRhID0gY29tcGxldGVBcGlEYXRhLmNvbXBsZXRlV2VhdGhlckRhdGE7XHJcblx0Y29uc3QgY29tcGxldGVJbWFnZURhdGEgPSBjb21wbGV0ZUFwaURhdGEuY29tcGxldGVpbWFnZURhdGE7XHJcblx0Y29uc3QgY29tcGxldGVMb2NhdGlvbkRhdGEgPSBjb21wbGV0ZUFwaURhdGEuY29tcGxldGVMb2NhdGlvbkRhdGE7XHJcblx0cmV0dXJuIHtcclxuXHRcdGxvY2F0aW9uRGF0YToge1xyXG5cdFx0XHRjaXR5OiBjb21wbGV0ZUxvY2F0aW9uRGF0YS5uYW1lLFxyXG5cdFx0XHRzdGF0ZTogY29tcGxldGVMb2NhdGlvbkRhdGEuc3RhdGVcclxuXHRcdH0sXHJcblx0XHR3ZWF0aGVyRGF0YToge1xyXG5cdFx0XHR0ZW1wZXJhdHVyZURldGFpbHM6IGNvbXBsZXRlV2VhdGhlckRhdGEubWFpbixcclxuXHRcdFx0ZGVzY3JpcHRpb25EZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLndlYXRoZXJbMF0sXHJcblx0XHRcdHdpbmREZXRhaWxzOiBjb21wbGV0ZVdlYXRoZXJEYXRhLndpbmRcclxuXHRcdH0sXHJcblx0XHRpbWFnZURhdGE6IHtcclxuXHRcdFx0aW1hZ2VVcmw6IGNvbXBsZXRlSW1hZ2VEYXRhLnVybHMuZnVsbCxcclxuXHRcdFx0YWx0RGVzY3JpcHRpb246IGNvbXBsZXRlSW1hZ2VEYXRhLmFsdF9kZXNjcmlwdGlvbixcclxuXHRcdFx0Y3JlYXRvckRldGFpbHM6IHtcclxuXHRcdFx0XHRmaXJzdE5hbWU6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIuZmlyc3RfbmFtZSxcclxuXHRcdFx0XHRsYXN0TmFtZTogY29tcGxldGVJbWFnZURhdGEudXNlci5sYXN0X25hbWUsXHJcblx0XHRcdFx0YWNjb3VudExpbms6IGNvbXBsZXRlSW1hZ2VEYXRhLnVzZXIubGlua3MuaHRtbFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIEFQSSBmcm9tICcuL21vZHVsZXMvYXBpRnVuY3Rpb25zJztcclxuXHJcbi8vIEFQSS5nZXRDb21wbGV0ZUFwaURhdGEoJ21lbGJvdXJuZScsICdhdScpXHJcbi8vIFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbi8vIFx0XHRpZiAocmVzcG9uc2UuZGF0YVN0YXR1cykge1xyXG4vLyBcdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbi8vIFx0XHRcdHJldHVybiBBUEkuZmlsdGVyQXBpRGF0YShyZXNwb25zZSk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fSlcclxuLy8gXHQudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuLy8gXHR9KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9