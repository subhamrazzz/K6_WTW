/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scenarios.js":
/*!**************************!*\
  !*** ./src/scenarios.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   scenarios: () => (/* binding */ scenarios)\n/* harmony export */ });\nconst scenarios = {\r\n  stress_load: {\r\n    executor: \"constant-vus\",\r\n    vus: 4,\r\n    duration: \"20s\",\r\n  },\r\n  ramping_load: {\r\n    executor: \"ramping-vus\",\r\n    startVUs: 1,\r\n    stages: [\r\n      { duration: \"10s\", target: 5 },\r\n      { duration: \"20s\", target: 5 },\r\n      { duration: \"10s\", target: 0 },\r\n    ],\r\n  },\r\n  simple_load: {\r\n    executor: \"per-vu-iterations\",\r\n    vus: 1,\r\n    iterations: 10,\r\n    startTime: \"2s\",\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://k6_wtw/./src/scenarios.js?");

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   options: () => (/* binding */ options),\n/* harmony export */   setup: () => (/* binding */ setup),\n/* harmony export */   teardown: () => (/* binding */ teardown)\n/* harmony export */ });\n/* harmony import */ var k6_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! k6/http */ \"k6/http\");\n/* harmony import */ var k6_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(k6_http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var k6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! k6 */ \"k6\");\n/* harmony import */ var k6__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(k6__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var k6_metrics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! k6/metrics */ \"k6/metrics\");\n/* harmony import */ var k6_metrics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(k6_metrics__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _scenarios_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenarios.js */ \"./src/scenarios.js\");\n\r\n\r\n\r\n\r\n//Custom metric\r\nconst myTrend = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Trend(\"GetApi_ResponsTime\"); // custom metric to track response time\r\nconst successCounter = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Counter(\"GetApi_successes\");\r\nconst GaugeResponseSize = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Gauge(\"ResponseSize\");\r\n // Import scenarios from the scenarios.js file\r\n\r\n// Base URL for the API\r\nconst baseUrl = \"http://jsonplaceholder.typicode.com\";\r\n\r\nconst scenarioName = __ENV.SCENARIO || \"simple_load\"; // Default to 'simple_load' if not specified in command line argument\r\n\r\nlet options = {\r\n  scenarios: {\r\n    [scenarioName]: _scenarios_js__WEBPACK_IMPORTED_MODULE_3__.scenarios[scenarioName],\r\n  },\r\n  thresholds: {\r\n    http_req_failed: [\"rate<0.01\"], // http errors should be less than 1%\r\n    http_req_duration: [\"p(95)<500\"], // 95% of requests should be below 500ms\r\n    ResponseSize: [\"value<28000\"], // Response content size less that bytes\r\n  },\r\n};\r\n\r\nfunction setup() {\r\n  console.log(`Running scenario: ${scenarioName}`);\r\n}\r\n\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\r\n  (0,k6__WEBPACK_IMPORTED_MODULE_1__.group)(\"Get Call\", function () {\r\n    const res = k6_http__WEBPACK_IMPORTED_MODULE_0___default().get(`${baseUrl}/posts`);\r\n\r\n    // Checks on the response\r\n    (0,k6__WEBPACK_IMPORTED_MODULE_1__.check)(res, {\r\n      \"is status 200\": (r) => r.status === 200,\r\n      \"is not status 404\": (r) => r.status !== 404,\r\n      \"verify page text\": (r) => r.body.includes(\"userId\"),\r\n    });\r\n\r\n    const data = res.json();\r\n\r\n    // Filter the data where userId is 1 and extract the titles ( Correlation example)\r\n    const titles = data\r\n      .filter((item) => item.userId === 1)\r\n      .map((item) => item.title);\r\n\r\n    //console.log(\"Titles:\", titles);\r\n    //const FirstTitle = titles[0];\r\n    //console.log(\"FirstTitle:\", FirstTitle);\r\n\r\n    myTrend.add(res.timings.duration); // custom trend metric\r\n    successCounter.add(res.status === 200); //custom counter metric\r\n    GaugeResponseSize.add(res.body.length); // custom guage metric\r\n  });\r\n}\r\n\r\nfunction teardown(data) {\r\n  console.log(\"Tearing down after the test.\");\r\n}\r\n\n\n//# sourceURL=webpack://k6_wtw/./src/test.js?");

/***/ }),

/***/ "k6":
/*!*********************!*\
  !*** external "k6" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("k6");

/***/ }),

/***/ "k6/http":
/*!**************************!*\
  !*** external "k6/http" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("k6/http");

/***/ }),

/***/ "k6/metrics":
/*!*****************************!*\
  !*** external "k6/metrics" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("k6/metrics");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/test.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;