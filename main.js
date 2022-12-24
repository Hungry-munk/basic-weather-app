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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsT0FBTyx1QkFBdUIsV0FBVywwQkFBMEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsYUFBYSx5REFBeUQ7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSSxPQUFPLElBQUksU0FBUyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVSxFQUFFLFVBQVUsbUNBQW1DLE9BQU87QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNsSEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvYXBpRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25EYXRhKGNpdHlOYW1lLCBjb3VudHJ5TmFtZSkge1xyXG5cdGNvbnN0IGdlb0xvY2F0aW9uVXJsID0gYGh0dHBzOi8vYXBpLmFwaS1uaW5qYXMuY29tL3YxL2dlb2NvZGluZz9jaXR5PVxyXG4gICAgXHQke2NpdHlOYW1lLnRvTG93ZXJDYXNlKCl9JmNvdW50cnk9JHtjb3VudHJ5TmFtZS50b0xvd2VyQ2FzZSgpfWA7XHJcblx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRtb2RlOiAnY29ycycsXHJcblx0XHRoZWFkZXJzOiB7ICdYLUFwaS1LZXknOiAnbFljVWNYazFtajVUd0U2bjNObVZqQT09YmY0a0lZdzl0Z0V6RmFaRycgfSxcclxuXHRcdGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbidcclxuXHR9O1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgbG9jYXRpb25EYXRhID0gYXdhaXQgZmV0Y2goZ2VvTG9jYXRpb25VcmwsIG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIFsuLi4oYXdhaXQgbG9jYXRpb25EYXRhLmpzb24oKSldWzBdO1xyXG5cdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0aWYgKGVyci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCc0MDQsIGxvY2F0aW9uIHdhc250IGZvdW5kJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25XYXRoZXJEYXRhKGxhdCwgbG9uKSB7XHJcblx0Y29uc3QgYXBpS2V5ID0gJzRiZDU1NDllODc2ZDA4NWM2NjNmYWIwODI4MTE0ZjcxJztcclxuXHRjb25zdCBvcGVuV2F0aGVyVXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyXHJcblx0XHQ/bGF0PSR7bGF0fSZsb249JHtsb259JmFwcGlkPSR7YXBpS2V5fWA7XHJcblxyXG5cdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0bW9kZTogJ2NvcnMnLFxyXG5cdFx0Y29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdH07XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBmZXRjaChvcGVuV2F0aGVyVXJsLCBvcHRpb25zKTtcclxuXHRcdHJldHVybiBhd2FpdCBsb2NhdGlvbkRhdGEuanNvbigpO1xyXG5cdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0aWYgKGVyci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCc0MDQsIGxvY2F0aW9uIHdhc250IGZvdW5kJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVyci5yZXNwb25zZS5zdGF0dXMpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25JbWFnZURhdGEoY2l0eU5hbWUsIHN0YXRlTmFtZSkge1xyXG5cdGNvbnN0IGFwaUtleSA9ICdoNnExWktqdHFCS1dUaDN2TG9zOFAxMWtkbkY2eDdUX0FwMEctZUVvWUVnJztcclxuXHRjb25zdCB1bnNwbGFzaFVybCA9IGBodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3JhbmRvbVxyXG5cdFx0P3F1ZXJ5PSR7Y2l0eU5hbWV9ICR7c3RhdGVOYW1lfSZvcmllbnRhdGlvbj1sYW5kc2NhcGUmY2xpZW50X2lkPSR7YXBpS2V5fWA7XHJcblx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRtb2RlOiAnY29ycycsXHJcblx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGltYWdlRGF0YSA9IGF3YWl0IGZldGNoKHVuc3BsYXNoVXJsLCBvcHRpb25zKTtcclxuXHRcdHJldHVybiBhd2FpdCBpbWFnZURhdGEuanNvbigpO1xyXG5cdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbXBsZXRlQXBpRGF0YShjaXR5TmFtZSwgY291bnRyeSkge1xyXG5cdGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGdldExvY2F0aW9uRGF0YShjaXR5TmFtZSwgY291bnRyeSk7XHJcblx0dHJ5IHtcclxuXHRcdC8vIHRyeWluZyBvdXQgY29vbCBkZWNvbnN0cnVjaXRvbiBzeW50YXhcclxuXHRcdGNvbnN0IFt3ZWF0aGVyRGF0YSwgaW1hZ2VEYXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuXHRcdFx0Z2V0TG9jYXRpb25XYXRoZXJEYXRhKFxyXG5cdFx0XHRcdGxvY2F0aW9uRGF0YS5sYXRpdHVkZSxcclxuXHRcdFx0XHRsb2NhdGlvbkRhdGEubG9uZ2l0dWRlXHJcblx0XHRcdCksXHJcblx0XHRcdGdldExvY2F0aW9uSW1hZ2VEYXRhKGxvY2F0aW9uRGF0YS5uYW1lLCBsb2NhdGlvbkRhdGEuc3RhdGUpXHJcblx0XHRdKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkYXRhU3RhdHVzOiB0cnVlLFxyXG5cdFx0XHRjb21wbGV0ZUxvY2F0aW9uRGF0YTogbG9jYXRpb25EYXRhLFxyXG5cdFx0XHRjb21wbGV0ZVdlYXRoZXJEYXRhOiB3ZWF0aGVyRGF0YSxcclxuXHRcdFx0Y29tcGxldGVpbWFnZURhdGE6IGltYWdlRGF0YVxyXG5cdFx0fTtcclxuXHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKCdsb2NhdGlvbiBub3QgZm91bmQnKSk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRkYXRhU3RhdHVzOiBmYWxzZVxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJBcGlEYXRhKGNvbXBsZXRlQXBpRGF0YSkge1xyXG5cdGNvbnN0IGNvbXBsZXRlV2VhdGhlckRhdGEgPSBjb21wbGV0ZUFwaURhdGEuY29tcGxldGVXZWF0aGVyRGF0YTtcclxuXHRjb25zdCBjb21wbGV0ZUltYWdlRGF0YSA9IGNvbXBsZXRlQXBpRGF0YS5jb21wbGV0ZWltYWdlRGF0YTtcclxuXHRjb25zdCBjb21wbGV0ZUxvY2F0aW9uRGF0YSA9IGNvbXBsZXRlQXBpRGF0YS5jb21wbGV0ZUxvY2F0aW9uRGF0YTtcclxuXHQvLyByZXR1cm5pbmcgZGF0YSBJIGFjdGF1bGx5IG5lZWRcclxuXHRyZXR1cm4ge1xyXG5cdFx0bG9jYXRpb25EYXRhOiB7XHJcblx0XHRcdGNpdHk6IGNvbXBsZXRlTG9jYXRpb25EYXRhLm5hbWUsXHJcblx0XHRcdHN0YXRlOiBjb21wbGV0ZUxvY2F0aW9uRGF0YS5zdGF0ZVxyXG5cdFx0fSxcclxuXHRcdHdlYXRoZXJEYXRhOiB7XHJcblx0XHRcdHRlbXBlcmF0dXJlRGV0YWlsczogY29tcGxldGVXZWF0aGVyRGF0YS5tYWluLFxyXG5cdFx0XHRkZXNjcmlwdGlvbkRldGFpbHM6IGNvbXBsZXRlV2VhdGhlckRhdGEud2VhdGhlclswXSxcclxuXHRcdFx0d2luZERldGFpbHM6IGNvbXBsZXRlV2VhdGhlckRhdGEud2luZFxyXG5cdFx0fSxcclxuXHRcdGltYWdlRGF0YToge1xyXG5cdFx0XHRpbWFnZVVybDogY29tcGxldGVJbWFnZURhdGEudXJscy5mdWxsLFxyXG5cdFx0XHRhbHREZXNjcmlwdGlvbjogY29tcGxldGVJbWFnZURhdGEuYWx0X2Rlc2NyaXB0aW9uLFxyXG5cdFx0XHRjcmVhdG9yRGV0YWlsczoge1xyXG5cdFx0XHRcdGZpcnN0TmFtZTogY29tcGxldGVJbWFnZURhdGEudXNlci5maXJzdF9uYW1lLFxyXG5cdFx0XHRcdGxhc3ROYW1lOiBjb21wbGV0ZUltYWdlRGF0YS51c2VyLmxhc3RfbmFtZSxcclxuXHRcdFx0XHRhY2NvdW50TGluazogY29tcGxldGVJbWFnZURhdGEudXNlci5saW5rcy5odG1sXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgQVBJIGZyb20gJy4vbW9kdWxlcy9hcGlGdW5jdGlvbnMnO1xyXG5cclxuLy8gQVBJLmdldENvbXBsZXRlQXBpRGF0YSgnbWVsYm91cm5lJywgJ2F1JylcclxuLy8gXHQudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gXHRcdGlmIChyZXNwb25zZS5kYXRhU3RhdHVzKSB7XHJcbi8vIFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuLy8gXHRcdFx0cmV0dXJuIEFQSS5maWx0ZXJBcGlEYXRhKHJlc3BvbnNlKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KVxyXG4vLyBcdC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4vLyBcdFx0Y29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4vLyBcdH0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=