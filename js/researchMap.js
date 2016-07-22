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
	
	console.log(_researchPartners2.default);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = [
		{
			"name": "Indiana University",
			"url": "http://iuhealth.org/pain-management/",
			"state": "US-IN"
		},
		{
			"name": "University of Iowa",
			"url": "https://www.uihealthcare.org/pain/",
			"state": "US-IA"
		},
		{
			"name": "University of Kansas",
			"url": "http://www.kumed.com/medical-services/pain-management",
			"state": "US-KS"
		},
		{
			"name": "University of Minnesota",
			"url": "https://www.anesthesiology.umn.edu/our-pain-management-program",
			"state": "US-MN"
		},
		{
			"name": "University of Nebraska",
			"url": "http://www.nebraskamed.com/neuro/pain-management/pain-management-program",
			"state": "US-NE"
		},
		{
			"name": "Johns Hopkins University",
			"url": "http://www.hopkinsmedicine.org/pain/blaustein_pain_center/",
			"state": "US-MD"
		},
		{
			"name": "University of Florida",
			"url": "http://anest.ufl.edu/clinical-divisions/pain-medicine/",
			"state": "US-FL"
		},
		{
			"name": "Stanford University",
			"url": "https://stanfordhealthcare.org/medical-clinics/pain-management.html",
			"state": "US-CA"
		},
		{
			"name": "Walter Reed National Medical Center",
			"url": "http://www.wrnmmc.capmed.mil/SitePages/home.aspx",
			"state": "US-MD"
		},
		{
			"name": "University of Texas Health Science Center at Houston",
			"url": "https://www.uth.edu",
			"state": "US-TX"
		},
		{
			"name": "University of Michigan",
			"url": "http://www.uofmhealth.org/conditions-treatments/cmc/pain-management",
			"state": "US-MI"
		},
		{
			"name": "Vanderbilt University",
			"url": "http://www.vanderbilthealth.com/painmedicine/",
			"state": "US-TN"
		},
		{
			"name": "University of Pittsburg",
			"url": "http://www.vanderbilthealth.com/painmedicine/",
			"state": "US-PA"
		},
		{
			"name": "University of Missouri",
			"url": "http://www.muhealth.org/services/pmandr/pain/",
			"state": "US-MO"
		},
		{
			"name": "University of Wisconsin-Madison",
			"url": "http://www.uwhealth.org/chronic-pain/pain-management/10285",
			"state": "US-WI"
		},
		{
			"name": "Marshfield Clinic",
			"url": "https://www.marshfieldclinic.org/specialties/pain-management",
			"state": "US-WI"
		},
		{
			"name": "University of Texas Health Sciences Center at San Antonio",
			"url": "http://www.utswmedicine.org/conditions-specialties/pain/",
			"state": "US-TX"
		},
		{
			"name": "University of Texas Southwestern Medical Center",
			"url": "http://anesthesia.uthscsa.edu/PainMedicineFellowship",
			"state": "US-TX"
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=researchMap.js.map