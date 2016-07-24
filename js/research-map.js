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
	
	var _debounce = __webpack_require__(2);
	
	var _debounce2 = _interopRequireDefault(_debounce);
	
	var _research_partners = __webpack_require__(11);
	
	var _research_partners2 = _interopRequireDefault(_research_partners);
	
	var _star = __webpack_require__(10);
	
	var _star2 = _interopRequireDefault(_star);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var map = document.getElementById('us-map');
	var mapContainer = document.getElementById('map-container');
	var starContainer = document.getElementById('star-container');
	
	var mapContainerRect = mapContainer.getBoundingClientRect();
	var partnerStates = [];
	
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;
	
	try {
		for (var _iterator = _research_partners2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var partner = _step.value;
	
			var state = document.getElementById(partner.state);
			state.classList.add('has-partner');
			partnerStates.push(state);
	
			starContainer.insertAdjacentHTML('beforeend', '<a href="' + partner.url + '" class="map-star notransition"\n\t\tdata-partner-name="' + partner.name + '">' + _star2.default + '</a>');
			var _stars = starContainer.querySelectorAll('.map-star');
			var newStar = _stars[_stars.length - 1];
			var starPos = convertStateCoordsToPixels(state, partner.coordinates.x, partner.coordinates.y);
			newStar.style.left = starPos.x - mapContainerRect.left + 'px';
			newStar.style.top = starPos.y - mapContainerRect.top + 'px';
			newStar.offsetHeight; // force reflow
			newStar.classList.remove('notransition');
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
	
	window.addEventListener('resize', (0, _debounce2.default)(adjustPartnerCoordinates, 100));
	
	var stars = document.querySelectorAll('.map-star');
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;
	
	try {
		for (var _iterator2 = stars[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var star = _step2.value;
	
			star.addEventListener('mouseenter', function () {
				var partnerListItem = document.querySelector('.partners-list-item[data-partner-name="' + this.getAttribute('data-partner-name') + '"]');
				var partnerRect = partnerListItem.getBoundingClientRect();
				var starRect = this.getBoundingClientRect();
	
				// TODO: Make sure it's on screen afterward, only do it on big screens
				var translation = {
					x: starRect.left - partnerRect.left - (partnerRect.width / 2 - starRect.width / 2),
					y: starRect.top - partnerRect.top - partnerRect.height
				};
	
				window.requestAnimationFrame(function () {
					partnerListItem.classList.add('active');
					partnerListItem.style.transform = 'translate(' + translation.x + 'px, ' + translation.y + 'px)';
				});
			});
	
			star.addEventListener('mouseout', function () {
				var partnerListItem = document.querySelector('.partners-list-item[data-partner-name="' + this.getAttribute('data-partner-name') + '"]');
	
				window.requestAnimationFrame(function () {
					partnerListItem.classList.remove('active');
					partnerListItem.style.transform = null;
				});
			});
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
	
	function adjustPartnerCoordinates() {
		mapContainerRect = mapContainer.getBoundingClientRect();
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;
	
		try {
			for (var _iterator3 = _research_partners2.default[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var partner = _step3.value;
	
				var state = document.getElementById(partner.state);
				var star = document.querySelector('.map-star[data-partner-name="' + partner.name + '"]');
				var starPos = convertStateCoordsToPixels(state, partner.coordinates.x, partner.coordinates.y);
				star.style.left = starPos.x - mapContainerRect.left + 'px';
				star.style.top = starPos.y - mapContainerRect.top + 'px';
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
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
		var stateCoords = convertPixelsToStateCoords(this, event.clientX, event.clientY);
		console.log(event.clientX, event.clientY);
		console.log(stateCoords);
		console.log(convertStateCoordsToPixels(this, stateCoords.x, stateCoords.y));
	}
	
	function convertPixelsToStateCoords(state, x, y) {
		var clientRect = state.getBoundingClientRect();
		var bbox = state.getBBox();
		var percentageLocation = {
			x: (x - clientRect.left) / clientRect.width,
			y: (y - clientRect.top) / clientRect.height
		};
		var svgLocation = {
			x: percentageLocation.x * bbox.width,
			y: percentageLocation.y * bbox.height
		};
		return svgLocation;
	}
	
	function convertStateCoordsToPixels(state, x, y) {
		var mapRect = map.getBoundingClientRect();
		var stateBox = state.getBBox();
		var convert = makeContext(state, map);
	
		var statePixels = convert(stateBox.x + x, stateBox.y + y);
		return {
			x: mapRect.left + statePixels.x,
			y: mapRect.top + statePixels.y
		};
	}
	
	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;
	
	try {
		for (var _iterator4 = partnerStates[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var _state = _step4.value;
	
			_state.addEventListener('click', getStateCoords);
		}
	} catch (err) {
		_didIteratorError4 = true;
		_iteratorError4 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion4 && _iterator4.return) {
				_iterator4.return();
			}
		} finally {
			if (_didIteratorError4) {
				throw _iteratorError4;
			}
		}
	}

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3),
	    now = __webpack_require__(4),
	    toNumber = __webpack_require__(5);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide an options object to indicate whether `func` should be invoked on
	 * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent calls
	 * to the debounced function return the result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	module.exports = debounce;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	function now() {
	  return Date.now();
	}
	
	module.exports = now;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(6),
	    isObject = __webpack_require__(3),
	    isSymbol = __webpack_require__(7);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(8);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"240\" height=\"240\" viewBox=\"0 0 240 240\">\n\t<path fill=\"#F8D64E\" d=\"m48,234 73-226 73,226-192-140h238z\"/>\n</svg>\n"

/***/ },
/* 11 */
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