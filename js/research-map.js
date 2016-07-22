/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _researchPartners = __webpack_require__(2);
	
	var _researchPartners2 = _interopRequireDefault(_researchPartners);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var map = document.getElementById('us-map');
	
	var partnerStates = [];
	
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;
	
	try {
		for (var _iterator = _researchPartners2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var partner = _step.value;
	
			var state = document.getElementById(partner.state);
			state.classList.add('has-partner');
			partnerStates.push(state);
			// let convert = makeContext(state, map);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
	
	function makeContext(element, svgDocument) {
		var absolute = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
		return function (x, y) {
			var offset = svgDocument.getBoundingClientRect();
			var matrix = absolute ? element.getScreenCTM() : element.getCTM();
			return {
				x: matrix.a * x + matrix.c * y + matrix.e - offset.left,
				y: matrix.b * x + matrix.d * y + matrix.f - offset.top
			};
		};
	}
	
	function getStateCoords(event) {
		var clientRect = this.getBoundingClientRect();
		var bbox = this.getBBox();
		var percentageLocation = {
			x: (event.clientX - clientRect.left) / clientRect.width,
			y: (event.clientY - clientRect.top) / clientRect.height
		};
		var svgLocation = {
			x: percentageLocation.x * bbox.width,
			y: percentageLocation.y * bbox.height
		};
		console.log(svgLocation);
	}
	
	function convertStateCoordsToPixels(state, x, y) {
		var mapRect = map.getBoundingClientRect();
		var convert = makeContext(state, map);
	
		return convert(x + mapRect.left, y + mapRect.top);
	}
	
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;
	
	try {
		for (var _iterator2 = partnerStates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var _state = _step2.value;
	
			_state.addEventListener('click', getStateCoords);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = [
		{
			"name": "Indiana University",
			"url": "http://iuhealth.org/pain-management/",
			"state": "US-IN",
			"coordinates": {
				"x": 32,
				"y": 66
			}
		},
		{
			"name": "University of Iowa",
			"url": "https://www.uihealthcare.org/pain/",
			"state": "US-IA",
			"coordinates": {
				"x": 96,
				"y": 48
			}
		},
		{
			"name": "University of Kansas",
			"url": "http://www.kumed.com/medical-services/pain-management",
			"state": "US-KS",
			"coordinates": {
				"x": 129,
				"y": 29
			}
		},
		{
			"name": "University of Minnesota",
			"url": "https://www.anesthesiology.umn.edu/our-pain-management-program",
			"state": "US-MN",
			"coordinates": {
				"x": 77,
				"y": 118
			}
		},
		{
			"name": "University of Nebraska",
			"url": "http://www.nebraskamed.com/neuro/pain-management/pain-management-program",
			"state": "US-NE",
			"coordinates": {
				"x": 154,
				"y": 45
			}
		},
		{
			"name": "Johns Hopkins University",
			"url": "http://www.hopkinsmedicine.org/pain/blaustein_pain_center/",
			"state": "US-MD",
			"coordinates": {
				"x": 59,
				"y": 8
			}
		},
		{
			"name": "University of Florida",
			"url": "http://anest.ufl.edu/clinical-divisions/pain-medicine/",
			"state": "US-FL",
			"coordinates": {
				"x": 100,
				"y": 30
			}
		},
		{
			"name": "Stanford University",
			"url": "https://stanfordhealthcare.org/medical-clinics/pain-management.html",
			"state": "US-CA",
			"coordinates": {
				"x": 41,
				"y": 112
			}
		},
		{
			"name": "Walter Reed National Medical Center",
			"url": "http://www.wrnmmc.capmed.mil/SitePages/home.aspx",
			"state": "US-MD",
			"coordinates": {
				"x": 45,
				"y": 17
			}
		},
		{
			"name": "University of Michigan",
			"url": "http://www.uofmhealth.org/conditions-treatments/cmc/pain-management",
			"state": "US-MI",
			"coordinates": {
				"x": 130,
				"y": 160
			}
		},
		{
			"name": "Vanderbilt University",
			"url": "http://www.vanderbilthealth.com/painmedicine/",
			"state": "US-TN",
			"coordinates": {
				"x": 68,
				"y": 13
			}
		},
		{
			"name": "University of Pittsburgh",
			"url": "http://www.vanderbilthealth.com/painmedicine/",
			"state": "US-PA",
			"coordinates": {
				"x": 9,
				"y": 48
			}
		},
		{
			"name": "University of Missouri",
			"url": "http://www.muhealth.org/services/pmandr/pain/",
			"state": "US-MO",
			"coordinates": {
				"x": 60,
				"y": 38
			}
		},
		{
			"name": "University of Wisconsin-Madison",
			"url": "http://www.uwhealth.org/chronic-pain/pain-management/10285",
			"state": "US-WI",
			"coordinates": {
				"x": 67,
				"y": 106
			}
		},
		{
			"name": "Marshfield Clinic",
			"url": "https://www.marshfieldclinic.org/specialties/pain-management",
			"state": "US-WI",
			"coordinates": {
				"x": 50,
				"y": 60
			}
		},
		{
			"name": "University of Texas Health Science Center at Houston",
			"url": "https://www.uth.edu",
			"state": "US-TX",
			"coordinates": {
				"x": 214,
				"y": 156
			}
		},
		{
			"name": "University of Texas Health Sciences Center at San Antonio",
			"url": "http://www.utswmedicine.org/conditions-specialties/pain/",
			"state": "US-TX",
			"coordinates": {
				"x": 157,
				"y": 163
			}
		},
		{
			"name": "University of Texas Southwestern Medical Center",
			"url": "http://anesthesia.uthscsa.edu/PainMedicineFellowship",
			"state": "US-TX",
			"coordinates": {
				"x": 175,
				"y": 81
			}
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=research-map.js.map