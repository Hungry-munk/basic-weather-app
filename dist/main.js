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
/* harmony export */   "getLocationData": () => (/* binding */ getLocationData),
/* harmony export */   "getLocationImageData": () => (/* binding */ getLocationImageData),
/* harmony export */   "getLocationWatherData": () => (/* binding */ getLocationWatherData)
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


_modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getLocationData('melbourne', 'AU')
	.then((response) => {
		console.log(response);
		return Promise.all([
			_modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getLocationWatherData(response.latitude, response.longitude),
			_modules_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getLocationImageData(response.name, response.state)
		]);
	})
	.then((response) => {
		console.log(response);
	});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBLE9BQU8sdUJBQXVCLFdBQVcsMEJBQTBCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBLGFBQWEseURBQXlEO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxTQUFTLElBQUksT0FBTyxJQUFJLFNBQVMsT0FBTztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxXQUFXLFVBQVUsRUFBRSxVQUFVLG1DQUFtQyxPQUFPO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7VUM3REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044QztBQUM5QztBQUNBLGtFQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxHQUFHLHdFQUF5QjtBQUM1QixHQUFHLHVFQUF3QjtBQUMzQjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvYXBpRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uRGF0YShjaXR5TmFtZSwgY291bnRyeU5hbWUpIHtcclxuXHRjb25zdCBnZW9Mb2NhdGlvblVybCA9IGBodHRwczovL2FwaS5hcGktbmluamFzLmNvbS92MS9nZW9jb2Rpbmc/Y2l0eT1cclxuICAgIFx0JHtjaXR5TmFtZS50b0xvd2VyQ2FzZSgpfSZjb3VudHJ5PSR7Y291bnRyeU5hbWUudG9Mb3dlckNhc2UoKX1gO1xyXG5cdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0bW9kZTogJ2NvcnMnLFxyXG5cdFx0aGVhZGVyczogeyAnWC1BcGktS2V5JzogJ2xZY1VjWGsxbWo1VHdFNm4zTm1WakE9PWJmNGtJWXc5dGdFekZhWkcnIH0sXHJcblx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGZldGNoKGdlb0xvY2F0aW9uVXJsLCBvcHRpb25zKTtcclxuXHRcdHJldHVybiBbLi4uKGF3YWl0IGxvY2F0aW9uRGF0YS5qc29uKCkpXVswXTtcclxuXHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdGlmIChlcnIucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignNDA0LCBsb2NhdGlvbiB3YXNudCBmb3VuZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIucmVzcG9uc2Uuc3RhdHVzKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMb2NhdGlvbldhdGhlckRhdGEobGF0LCBsb24pIHtcclxuXHRjb25zdCBhcGlLZXkgPSAnNGJkNTU0OWU4NzZkMDg1YzY2M2ZhYjA4MjgxMTRmNzEnO1xyXG5cdGNvbnN0IG9wZW5XYXRoZXJVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXJcclxuXHRcdD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHthcGlLZXl9YDtcclxuXHJcblx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRtb2RlOiAnY29ycycsXHJcblx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGZldGNoKG9wZW5XYXRoZXJVcmwsIG9wdGlvbnMpO1xyXG5cdFx0cmV0dXJuIGF3YWl0IGxvY2F0aW9uRGF0YS5qc29uKCk7XHJcblx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRpZiAoZXJyLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJzQwNCwgbG9jYXRpb24gd2FzbnQgZm91bmQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyLnJlc3BvbnNlLnN0YXR1cyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25JbWFnZURhdGEoY2l0eU5hbWUsIHN0YXRlTmFtZSkge1xyXG5cdGNvbnN0IGFwaUtleSA9ICdoNnExWktqdHFCS1dUaDN2TG9zOFAxMWtkbkY2eDdUX0FwMEctZUVvWUVnJztcclxuXHRjb25zdCB1bnNwbGFzaFVybCA9IGBodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3JhbmRvbVxyXG5cdFx0P3F1ZXJ5PSR7Y2l0eU5hbWV9ICR7c3RhdGVOYW1lfSZvcmllbnRhdGlvbj1sYW5kc2NhcGUmY2xpZW50X2lkPSR7YXBpS2V5fWA7XHJcblx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRtb2RlOiAnY29ycycsXHJcblx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0fTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGltYWdlRGF0YSA9IGF3YWl0IGZldGNoKHVuc3BsYXNoVXJsLCBvcHRpb25zKTtcclxuXHRcdHJldHVybiBhd2FpdCBpbWFnZURhdGEuanNvbigpO1xyXG5cdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIEFQSSBmcm9tICcuL21vZHVsZXMvYXBpRnVuY3Rpb25zJztcclxuXHJcbkFQSS5nZXRMb2NhdGlvbkRhdGEoJ21lbGJvdXJuZScsICdBVScpXHJcblx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG5cdFx0XHRBUEkuZ2V0TG9jYXRpb25XYXRoZXJEYXRhKHJlc3BvbnNlLmxhdGl0dWRlLCByZXNwb25zZS5sb25naXR1ZGUpLFxyXG5cdFx0XHRBUEkuZ2V0TG9jYXRpb25JbWFnZURhdGEocmVzcG9uc2UubmFtZSwgcmVzcG9uc2Uuc3RhdGUpXHJcblx0XHRdKTtcclxuXHR9KVxyXG5cdC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0Y29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG5cdH0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=