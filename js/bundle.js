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
	
	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var hero = document.querySelector('.site-hero-header-container');
	var header = document.querySelector('header.site-header');
	var title = document.querySelector('.site-title');
	var collapseMargin = 20;
	var expandMargin = 30;
	
	var heroBackgroundColor = window.getComputedStyle(hero).getPropertyValue('background-color');
	var heroRgba = heroBackgroundColor.substring(5, heroBackgroundColor.length - 1) // 5 = 'rgba('
	.split(',');
	for (var i in heroRgba) {
		heroRgba[i] = parseFloat(heroRgba[i]);
	}var expandedTitleTranslation = window.getComputedStyle(title).getPropertyValue('transform');
	expandedTitleTranslation = expandedTitleTranslation.substring(10, expandedTitleTranslation.length - 1) // 7 = 'matrix('
	.split(',');
	
	for (var _i in expandedTitleTranslation) {
		expandedTitleTranslation[_i] = parseFloat(expandedTitleTranslation[_i]);
	}var heroStartingAlpha = heroRgba[heroRgba.length - 1];
	
	// FIXME: How broken will this be with js disabled?
	
	if (title.classList.contains('expanded') && hero.getBoundingClientRect().bottom < title.getBoundingClientRect().bottom + collapseMargin) {
		title.classList.add('notransition');
		title.classList.remove('expanded');
		header.classList.add('collapsed');
		title.offsetHeight; // Trigger reflow, this is filthy
		title.classList.remove('notransition');
	}
	
	function step() {
		var heroRect = hero.getBoundingClientRect();
		var headerHeight = header.getBoundingClientRect().height;
	
		if (title.classList.contains('expanded')) {
			if (heroRect.bottom < title.getBoundingClientRect().bottom + collapseMargin) {
	
				title.classList.remove('expanded');
			}
		} else {
			if (heroRect.bottom > expandedTitleTranslation[expandedTitleTranslation.length - 1] + title.getBoundingClientRect().height + expandMargin) {
	
				title.classList.add('expanded');
			}
		}
	
		if (header.classList.contains('collapsed')) {
			if (heroRect.bottom > headerHeight) {
				header.classList.remove('collapsed');
			}
		} else {
			if (heroRect.bottom < headerHeight) {
				header.classList.add('collapsed');
			}
		}
	
		var newHeroAlpha = (heroRect.height - (heroRect.bottom - headerHeight)) / heroRect.height;
		newHeroAlpha > 0 ? newHeroAlpha : 0;
		newHeroAlpha = heroStartingAlpha + Math.pow(newHeroAlpha, 2) * (1 - heroStartingAlpha);
		heroRgba[heroRgba.length - 1] = newHeroAlpha;
		hero.style.backgroundColor = 'rgba(' + heroRgba.join(',') + ')';
	
		window.requestAnimationFrame(step);
	}
	
	window.requestAnimationFrame(step);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map