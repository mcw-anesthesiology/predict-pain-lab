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
/******/ 	__webpack_require__.p = "/resources/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _lunr = __webpack_require__(1);
	
	var _lunr2 = _interopRequireDefault(_lunr);
	
	var _debounce = __webpack_require__(29);
	
	var _debounce2 = _interopRequireDefault(_debounce);
	
	var _find = __webpack_require__(38);
	
	var _find2 = _interopRequireDefault(_find);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var search = document.getElementById('search-posts');
	var searchResults = document.getElementById('search-posts-results');
	var posts = JSON.parse(document.getElementById('site-posts').textContent).filter(function (post) {
		return !post.draft;
	});
	console.log(posts);
	
	var index = (0, _lunr2.default)(function () {
		this.field('title', { boost: 10 });
		this.field('tags', { boost: 5 });
		this.field('content');
	});
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;
	
	try {
		for (var _iterator = posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var post = _step.value;
	
			delete post.output;
			delete post.previous;
			delete post.next;
			index.add(post);
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
	
	search.addEventListener('input', (0, _debounce2.default)(searchPosts, 200));
	
	function searchPosts() {
		var query = this.value;
		while (searchResults.firstChild) {
			searchResults.removeChild(searchResults.firstChild);
		}if (query.trim().length > 0) {
			var results = index.search(this.value);
	
			if (results.length > 0) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = results[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var result = _step2.value;
	
						var post = (0, _find2.default)(posts, { id: result.ref });
	
						var searchResult = '\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<h3>' + post.title + '</h3>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t' + post.excerpt + '\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</li>\n\t\t\t\t';
	
						searchResults.insertAdjacentHTML('beforeend', searchResult);
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
			} else {
				searchResults.insertAdjacentHTML('beforeend', '<li>No matching posts found</li>');
			}
		} else {
			// searchResults.insertAdjacentHTML('beforeend', '<li>Please </li>');
		}
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.7.1
	 * Copyright (C) 2016 Oliver Nightingale
	 * @license MIT
	 */
	
	;(function(){
	
	/**
	 * Convenience function for instantiating a new lunr index and configuring it
	 * with the default pipeline functions and the passed config function.
	 *
	 * When using this convenience function a new index will be created with the
	 * following functions already in the pipeline:
	 *
	 * lunr.StopWordFilter - filters out any stop words before they enter the
	 * index
	 *
	 * lunr.stemmer - stems the tokens before entering the index.
	 *
	 * Example:
	 *
	 *     var idx = lunr(function () {
	 *       this.field('title', 10)
	 *       this.field('tags', 100)
	 *       this.field('body')
	 *       
	 *       this.ref('cid')
	 *       
	 *       this.pipeline.add(function () {
	 *         // some custom pipeline function
	 *       })
	 *       
	 *     })
	 *
	 * @param {Function} config A function that will be called with the new instance
	 * of the lunr.Index as both its context and first parameter. It can be used to
	 * customize the instance of new lunr.Index.
	 * @namespace
	 * @module
	 * @returns {lunr.Index}
	 *
	 */
	var lunr = function (config) {
	  var idx = new lunr.Index
	
	  idx.pipeline.add(
	    lunr.trimmer,
	    lunr.stopWordFilter,
	    lunr.stemmer
	  )
	
	  if (config) config.call(idx, idx)
	
	  return idx
	}
	
	lunr.version = "0.7.1"
	/*!
	 * lunr.utils
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * A namespace containing utils for the rest of the lunr library
	 */
	lunr.utils = {}
	
	/**
	 * Print a warning message to the console.
	 *
	 * @param {String} message The message to be printed.
	 * @memberOf Utils
	 */
	lunr.utils.warn = (function (global) {
	  return function (message) {
	    if (global.console && console.warn) {
	      console.warn(message)
	    }
	  }
	})(this)
	
	/**
	 * Convert an object to a string.
	 *
	 * In the case of `null` and `undefined` the function returns
	 * the empty string, in all other cases the result of calling
	 * `toString` on the passed object is returned.
	 *
	 * @param {Any} obj The object to convert to a string.
	 * @return {String} string representation of the passed object.
	 * @memberOf Utils
	 */
	lunr.utils.asString = function (obj) {
	  if (obj === void 0 || obj === null) {
	    return ""
	  } else {
	    return obj.toString()
	  }
	}
	/*!
	 * lunr.EventEmitter
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
	 *
	 * @constructor
	 */
	lunr.EventEmitter = function () {
	  this.events = {}
	}
	
	/**
	 * Binds a handler function to a specific event(s).
	 *
	 * Can bind a single function to many different events in one call.
	 *
	 * @param {String} [eventName] The name(s) of events to bind this function to.
	 * @param {Function} fn The function to call when an event is fired.
	 * @memberOf EventEmitter
	 */
	lunr.EventEmitter.prototype.addListener = function () {
	  var args = Array.prototype.slice.call(arguments),
	      fn = args.pop(),
	      names = args
	
	  if (typeof fn !== "function") throw new TypeError ("last argument must be a function")
	
	  names.forEach(function (name) {
	    if (!this.hasHandler(name)) this.events[name] = []
	    this.events[name].push(fn)
	  }, this)
	}
	
	/**
	 * Removes a handler function from a specific event.
	 *
	 * @param {String} eventName The name of the event to remove this function from.
	 * @param {Function} fn The function to remove from an event.
	 * @memberOf EventEmitter
	 */
	lunr.EventEmitter.prototype.removeListener = function (name, fn) {
	  if (!this.hasHandler(name)) return
	
	  var fnIndex = this.events[name].indexOf(fn)
	  this.events[name].splice(fnIndex, 1)
	
	  if (!this.events[name].length) delete this.events[name]
	}
	
	/**
	 * Calls all functions bound to the given event.
	 *
	 * Additional data can be passed to the event handler as arguments to `emit`
	 * after the event name.
	 *
	 * @param {String} eventName The name of the event to emit.
	 * @memberOf EventEmitter
	 */
	lunr.EventEmitter.prototype.emit = function (name) {
	  if (!this.hasHandler(name)) return
	
	  var args = Array.prototype.slice.call(arguments, 1)
	
	  this.events[name].forEach(function (fn) {
	    fn.apply(undefined, args)
	  })
	}
	
	/**
	 * Checks whether a handler has ever been stored against an event.
	 *
	 * @param {String} eventName The name of the event to check.
	 * @private
	 * @memberOf EventEmitter
	 */
	lunr.EventEmitter.prototype.hasHandler = function (name) {
	  return name in this.events
	}
	
	/*!
	 * lunr.tokenizer
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * A function for splitting a string into tokens ready to be inserted into
	 * the search index. Uses `lunr.tokenizer.seperator` to split strings, change
	 * the value of this property to change how strings are split into tokens.
	 *
	 * @module
	 * @param {String} obj The string to convert into tokens
	 * @see lunr.tokenizer.seperator
	 * @returns {Array}
	 */
	lunr.tokenizer = function (obj) {
	  if (!arguments.length || obj == null || obj == undefined) return []
	  if (Array.isArray(obj)) return obj.map(function (t) { return lunr.utils.asString(t).toLowerCase() })
	
	  return obj.toString().trim().toLowerCase().split(lunr.tokenizer.seperator)
	}
	
	/**
	 * The sperator used to split a string into tokens. Override this property to change the behaviour of
	 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
	 *
	 * @static
	 * @see lunr.tokenizer
	 */
	lunr.tokenizer.seperator = /[\s\-]+/
	
	/**
	 * Loads a previously serialised tokenizer.
	 *
	 * A tokenizer function to be loaded must already be registered with lunr.tokenizer.
	 * If the serialised tokenizer has not been registered then an error will be thrown.
	 *
	 * @param {String} label The label of the serialised tokenizer.
	 * @returns {Function}
	 * @memberOf tokenizer
	 */
	lunr.tokenizer.load = function (label) {
	  var fn = this.registeredFunctions[label]
	
	  if (!fn) {
	    throw new Error('Cannot load un-registered function: ' + label)
	  }
	
	  return fn
	}
	
	lunr.tokenizer.label = 'default'
	
	lunr.tokenizer.registeredFunctions = {
	  'default': lunr.tokenizer
	}
	
	/**
	 * Register a tokenizer function.
	 *
	 * Functions that are used as tokenizers should be registered if they are to be used with a serialised index.
	 *
	 * Registering a function does not add it to an index, functions must still be associated with a specific index for them to be used when indexing and searching documents.
	 *
	 * @param {Function} fn The function to register.
	 * @param {String} label The label to register this function with
	 * @memberOf tokenizer
	 */
	lunr.tokenizer.registerFunction = function (fn, label) {
	  if (label in this.registeredFunctions) {
	    lunr.utils.warn('Overwriting existing tokenizer: ' + label)
	  }
	
	  fn.label = label
	  this.registeredFunctions[label] = fn
	}
	/*!
	 * lunr.Pipeline
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * lunr.Pipelines maintain an ordered list of functions to be applied to all
	 * tokens in documents entering the search index and queries being ran against
	 * the index.
	 *
	 * An instance of lunr.Index created with the lunr shortcut will contain a
	 * pipeline with a stop word filter and an English language stemmer. Extra
	 * functions can be added before or after either of these functions or these
	 * default functions can be removed.
	 *
	 * When run the pipeline will call each function in turn, passing a token, the
	 * index of that token in the original list of all tokens and finally a list of
	 * all the original tokens.
	 *
	 * The output of functions in the pipeline will be passed to the next function
	 * in the pipeline. To exclude a token from entering the index the function
	 * should return undefined, the rest of the pipeline will not be called with
	 * this token.
	 *
	 * For serialisation of pipelines to work, all functions used in an instance of
	 * a pipeline should be registered with lunr.Pipeline. Registered functions can
	 * then be loaded. If trying to load a serialised pipeline that uses functions
	 * that are not registered an error will be thrown.
	 *
	 * If not planning on serialising the pipeline then registering pipeline functions
	 * is not necessary.
	 *
	 * @constructor
	 */
	lunr.Pipeline = function () {
	  this._stack = []
	}
	
	lunr.Pipeline.registeredFunctions = {}
	
	/**
	 * Register a function with the pipeline.
	 *
	 * Functions that are used in the pipeline should be registered if the pipeline
	 * needs to be serialised, or a serialised pipeline needs to be loaded.
	 *
	 * Registering a function does not add it to a pipeline, functions must still be
	 * added to instances of the pipeline for them to be used when running a pipeline.
	 *
	 * @param {Function} fn The function to check for.
	 * @param {String} label The label to register this function with
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.registerFunction = function (fn, label) {
	  if (label in this.registeredFunctions) {
	    lunr.utils.warn('Overwriting existing registered function: ' + label)
	  }
	
	  fn.label = label
	  lunr.Pipeline.registeredFunctions[fn.label] = fn
	}
	
	/**
	 * Warns if the function is not registered as a Pipeline function.
	 *
	 * @param {Function} fn The function to check for.
	 * @private
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
	  var isRegistered = fn.label && (fn.label in this.registeredFunctions)
	
	  if (!isRegistered) {
	    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
	  }
	}
	
	/**
	 * Loads a previously serialised pipeline.
	 *
	 * All functions to be loaded must already be registered with lunr.Pipeline.
	 * If any function from the serialised data has not been registered then an
	 * error will be thrown.
	 *
	 * @param {Object} serialised The serialised pipeline to load.
	 * @returns {lunr.Pipeline}
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.load = function (serialised) {
	  var pipeline = new lunr.Pipeline
	
	  serialised.forEach(function (fnName) {
	    var fn = lunr.Pipeline.registeredFunctions[fnName]
	
	    if (fn) {
	      pipeline.add(fn)
	    } else {
	      throw new Error('Cannot load un-registered function: ' + fnName)
	    }
	  })
	
	  return pipeline
	}
	
	/**
	 * Adds new functions to the end of the pipeline.
	 *
	 * Logs a warning if the function has not been registered.
	 *
	 * @param {Function} functions Any number of functions to add to the pipeline.
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.add = function () {
	  var fns = Array.prototype.slice.call(arguments)
	
	  fns.forEach(function (fn) {
	    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
	    this._stack.push(fn)
	  }, this)
	}
	
	/**
	 * Adds a single function after a function that already exists in the
	 * pipeline.
	 *
	 * Logs a warning if the function has not been registered.
	 *
	 * @param {Function} existingFn A function that already exists in the pipeline.
	 * @param {Function} newFn The new function to add to the pipeline.
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.after = function (existingFn, newFn) {
	  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)
	
	  var pos = this._stack.indexOf(existingFn)
	  if (pos == -1) {
	    throw new Error('Cannot find existingFn')
	  }
	
	  pos = pos + 1
	  this._stack.splice(pos, 0, newFn)
	}
	
	/**
	 * Adds a single function before a function that already exists in the
	 * pipeline.
	 *
	 * Logs a warning if the function has not been registered.
	 *
	 * @param {Function} existingFn A function that already exists in the pipeline.
	 * @param {Function} newFn The new function to add to the pipeline.
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.before = function (existingFn, newFn) {
	  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)
	
	  var pos = this._stack.indexOf(existingFn)
	  if (pos == -1) {
	    throw new Error('Cannot find existingFn')
	  }
	
	  this._stack.splice(pos, 0, newFn)
	}
	
	/**
	 * Removes a function from the pipeline.
	 *
	 * @param {Function} fn The function to remove from the pipeline.
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.remove = function (fn) {
	  var pos = this._stack.indexOf(fn)
	  if (pos == -1) {
	    return
	  }
	
	  this._stack.splice(pos, 1)
	}
	
	/**
	 * Runs the current list of functions that make up the pipeline against the
	 * passed tokens.
	 *
	 * @param {Array} tokens The tokens to run through the pipeline.
	 * @returns {Array}
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.run = function (tokens) {
	  var out = [],
	      tokenLength = tokens.length,
	      stackLength = this._stack.length
	
	  for (var i = 0; i < tokenLength; i++) {
	    var token = tokens[i]
	
	    for (var j = 0; j < stackLength; j++) {
	      token = this._stack[j](token, i, tokens)
	      if (token === void 0 || token === '') break
	    };
	
	    if (token !== void 0 && token !== '') out.push(token)
	  };
	
	  return out
	}
	
	/**
	 * Resets the pipeline by removing any existing processors.
	 *
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.reset = function () {
	  this._stack = []
	}
	
	/**
	 * Returns a representation of the pipeline ready for serialisation.
	 *
	 * Logs a warning if the function has not been registered.
	 *
	 * @returns {Array}
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.toJSON = function () {
	  return this._stack.map(function (fn) {
	    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
	
	    return fn.label
	  })
	}
	/*!
	 * lunr.Vector
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * lunr.Vectors implement vector related operations for
	 * a series of elements.
	 *
	 * @constructor
	 */
	lunr.Vector = function () {
	  this._magnitude = null
	  this.list = undefined
	  this.length = 0
	}
	
	/**
	 * lunr.Vector.Node is a simple struct for each node
	 * in a lunr.Vector.
	 *
	 * @private
	 * @param {Number} The index of the node in the vector.
	 * @param {Object} The data at this node in the vector.
	 * @param {lunr.Vector.Node} The node directly after this node in the vector.
	 * @constructor
	 * @memberOf Vector
	 */
	lunr.Vector.Node = function (idx, val, next) {
	  this.idx = idx
	  this.val = val
	  this.next = next
	}
	
	/**
	 * Inserts a new value at a position in a vector.
	 *
	 * @param {Number} The index at which to insert a value.
	 * @param {Object} The object to insert in the vector.
	 * @memberOf Vector.
	 */
	lunr.Vector.prototype.insert = function (idx, val) {
	  this._magnitude = undefined;
	  var list = this.list
	
	  if (!list) {
	    this.list = new lunr.Vector.Node (idx, val, list)
	    return this.length++
	  }
	
	  if (idx < list.idx) {
	    this.list = new lunr.Vector.Node (idx, val, list)
	    return this.length++
	  }
	
	  var prev = list,
	      next = list.next
	
	  while (next != undefined) {
	    if (idx < next.idx) {
	      prev.next = new lunr.Vector.Node (idx, val, next)
	      return this.length++
	    }
	
	    prev = next, next = next.next
	  }
	
	  prev.next = new lunr.Vector.Node (idx, val, next)
	  return this.length++
	}
	
	/**
	 * Calculates the magnitude of this vector.
	 *
	 * @returns {Number}
	 * @memberOf Vector
	 */
	lunr.Vector.prototype.magnitude = function () {
	  if (this._magnitude) return this._magnitude
	  var node = this.list,
	      sumOfSquares = 0,
	      val
	
	  while (node) {
	    val = node.val
	    sumOfSquares += val * val
	    node = node.next
	  }
	
	  return this._magnitude = Math.sqrt(sumOfSquares)
	}
	
	/**
	 * Calculates the dot product of this vector and another vector.
	 *
	 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
	 * @returns {Number}
	 * @memberOf Vector
	 */
	lunr.Vector.prototype.dot = function (otherVector) {
	  var node = this.list,
	      otherNode = otherVector.list,
	      dotProduct = 0
	
	  while (node && otherNode) {
	    if (node.idx < otherNode.idx) {
	      node = node.next
	    } else if (node.idx > otherNode.idx) {
	      otherNode = otherNode.next
	    } else {
	      dotProduct += node.val * otherNode.val
	      node = node.next
	      otherNode = otherNode.next
	    }
	  }
	
	  return dotProduct
	}
	
	/**
	 * Calculates the cosine similarity between this vector and another
	 * vector.
	 *
	 * @param {lunr.Vector} otherVector The other vector to calculate the
	 * similarity with.
	 * @returns {Number}
	 * @memberOf Vector
	 */
	lunr.Vector.prototype.similarity = function (otherVector) {
	  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
	}
	/*!
	 * lunr.SortedSet
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
	 * order.
	 *
	 * @constructor
	 */
	lunr.SortedSet = function () {
	  this.length = 0
	  this.elements = []
	}
	
	/**
	 * Loads a previously serialised sorted set.
	 *
	 * @param {Array} serialisedData The serialised set to load.
	 * @returns {lunr.SortedSet}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.load = function (serialisedData) {
	  var set = new this
	
	  set.elements = serialisedData
	  set.length = serialisedData.length
	
	  return set
	}
	
	/**
	 * Inserts new items into the set in the correct position to maintain the
	 * order.
	 *
	 * @param {Object} The objects to add to this set.
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.add = function () {
	  var i, element
	
	  for (i = 0; i < arguments.length; i++) {
	    element = arguments[i]
	    if (~this.indexOf(element)) continue
	    this.elements.splice(this.locationFor(element), 0, element)
	  }
	
	  this.length = this.elements.length
	}
	
	/**
	 * Converts this sorted set into an array.
	 *
	 * @returns {Array}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.toArray = function () {
	  return this.elements.slice()
	}
	
	/**
	 * Creates a new array with the results of calling a provided function on every
	 * element in this sorted set.
	 *
	 * Delegates to Array.prototype.map and has the same signature.
	 *
	 * @param {Function} fn The function that is called on each element of the
	 * set.
	 * @param {Object} ctx An optional object that can be used as the context
	 * for the function fn.
	 * @returns {Array}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.map = function (fn, ctx) {
	  return this.elements.map(fn, ctx)
	}
	
	/**
	 * Executes a provided function once per sorted set element.
	 *
	 * Delegates to Array.prototype.forEach and has the same signature.
	 *
	 * @param {Function} fn The function that is called on each element of the
	 * set.
	 * @param {Object} ctx An optional object that can be used as the context
	 * @memberOf SortedSet
	 * for the function fn.
	 */
	lunr.SortedSet.prototype.forEach = function (fn, ctx) {
	  return this.elements.forEach(fn, ctx)
	}
	
	/**
	 * Returns the index at which a given element can be found in the
	 * sorted set, or -1 if it is not present.
	 *
	 * @param {Object} elem The object to locate in the sorted set.
	 * @returns {Number}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.indexOf = function (elem) {
	  var start = 0,
	      end = this.elements.length,
	      sectionLength = end - start,
	      pivot = start + Math.floor(sectionLength / 2),
	      pivotElem = this.elements[pivot]
	
	  while (sectionLength > 1) {
	    if (pivotElem === elem) return pivot
	
	    if (pivotElem < elem) start = pivot
	    if (pivotElem > elem) end = pivot
	
	    sectionLength = end - start
	    pivot = start + Math.floor(sectionLength / 2)
	    pivotElem = this.elements[pivot]
	  }
	
	  if (pivotElem === elem) return pivot
	
	  return -1
	}
	
	/**
	 * Returns the position within the sorted set that an element should be
	 * inserted at to maintain the current order of the set.
	 *
	 * This function assumes that the element to search for does not already exist
	 * in the sorted set.
	 *
	 * @param {Object} elem The elem to find the position for in the set
	 * @returns {Number}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.locationFor = function (elem) {
	  var start = 0,
	      end = this.elements.length,
	      sectionLength = end - start,
	      pivot = start + Math.floor(sectionLength / 2),
	      pivotElem = this.elements[pivot]
	
	  while (sectionLength > 1) {
	    if (pivotElem < elem) start = pivot
	    if (pivotElem > elem) end = pivot
	
	    sectionLength = end - start
	    pivot = start + Math.floor(sectionLength / 2)
	    pivotElem = this.elements[pivot]
	  }
	
	  if (pivotElem > elem) return pivot
	  if (pivotElem < elem) return pivot + 1
	}
	
	/**
	 * Creates a new lunr.SortedSet that contains the elements in the intersection
	 * of this set and the passed set.
	 *
	 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
	 * @returns {lunr.SortedSet}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.intersect = function (otherSet) {
	  var intersectSet = new lunr.SortedSet,
	      i = 0, j = 0,
	      a_len = this.length, b_len = otherSet.length,
	      a = this.elements, b = otherSet.elements
	
	  while (true) {
	    if (i > a_len - 1 || j > b_len - 1) break
	
	    if (a[i] === b[j]) {
	      intersectSet.add(a[i])
	      i++, j++
	      continue
	    }
	
	    if (a[i] < b[j]) {
	      i++
	      continue
	    }
	
	    if (a[i] > b[j]) {
	      j++
	      continue
	    }
	  };
	
	  return intersectSet
	}
	
	/**
	 * Makes a copy of this set
	 *
	 * @returns {lunr.SortedSet}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.clone = function () {
	  var clone = new lunr.SortedSet
	
	  clone.elements = this.toArray()
	  clone.length = clone.elements.length
	
	  return clone
	}
	
	/**
	 * Creates a new lunr.SortedSet that contains the elements in the union
	 * of this set and the passed set.
	 *
	 * @param {lunr.SortedSet} otherSet The set to union with this set.
	 * @returns {lunr.SortedSet}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.union = function (otherSet) {
	  var longSet, shortSet, unionSet
	
	  if (this.length >= otherSet.length) {
	    longSet = this, shortSet = otherSet
	  } else {
	    longSet = otherSet, shortSet = this
	  }
	
	  unionSet = longSet.clone()
	
	  for(var i = 0, shortSetElements = shortSet.toArray(); i < shortSetElements.length; i++){
	    unionSet.add(shortSetElements[i])
	  }
	
	  return unionSet
	}
	
	/**
	 * Returns a representation of the sorted set ready for serialisation.
	 *
	 * @returns {Array}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.toJSON = function () {
	  return this.toArray()
	}
	/*!
	 * lunr.Index
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * lunr.Index is object that manages a search index.  It contains the indexes
	 * and stores all the tokens and document lookups.  It also provides the main
	 * user facing API for the library.
	 *
	 * @constructor
	 */
	lunr.Index = function () {
	  this._fields = []
	  this._ref = 'id'
	  this.pipeline = new lunr.Pipeline
	  this.documentStore = new lunr.Store
	  this.tokenStore = new lunr.TokenStore
	  this.corpusTokens = new lunr.SortedSet
	  this.eventEmitter =  new lunr.EventEmitter
	  this.tokenizerFn = lunr.tokenizer
	
	  this._idfCache = {}
	
	  this.on('add', 'remove', 'update', (function () {
	    this._idfCache = {}
	  }).bind(this))
	}
	
	/**
	 * Bind a handler to events being emitted by the index.
	 *
	 * The handler can be bound to many events at the same time.
	 *
	 * @param {String} [eventName] The name(s) of events to bind the function to.
	 * @param {Function} fn The serialised set to load.
	 * @memberOf Index
	 */
	lunr.Index.prototype.on = function () {
	  var args = Array.prototype.slice.call(arguments)
	  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
	}
	
	/**
	 * Removes a handler from an event being emitted by the index.
	 *
	 * @param {String} eventName The name of events to remove the function from.
	 * @param {Function} fn The serialised set to load.
	 * @memberOf Index
	 */
	lunr.Index.prototype.off = function (name, fn) {
	  return this.eventEmitter.removeListener(name, fn)
	}
	
	/**
	 * Loads a previously serialised index.
	 *
	 * Issues a warning if the index being imported was serialised
	 * by a different version of lunr.
	 *
	 * @param {Object} serialisedData The serialised set to load.
	 * @returns {lunr.Index}
	 * @memberOf Index
	 */
	lunr.Index.load = function (serialisedData) {
	  if (serialisedData.version !== lunr.version) {
	    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
	  }
	
	  var idx = new this
	
	  idx._fields = serialisedData.fields
	  idx._ref = serialisedData.ref
	
	  idx.tokenizer = lunr.tokenizer.load(serialisedData.tokenizer)
	  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
	  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
	  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
	  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)
	
	  return idx
	}
	
	/**
	 * Adds a field to the list of fields that will be searchable within documents
	 * in the index.
	 *
	 * An optional boost param can be passed to affect how much tokens in this field
	 * rank in search results, by default the boost value is 1.
	 *
	 * Fields should be added before any documents are added to the index, fields
	 * that are added after documents are added to the index will only apply to new
	 * documents added to the index.
	 *
	 * @param {String} fieldName The name of the field within the document that
	 * should be indexed
	 * @param {Number} boost An optional boost that can be applied to terms in this
	 * field.
	 * @returns {lunr.Index}
	 * @memberOf Index
	 */
	lunr.Index.prototype.field = function (fieldName, opts) {
	  var opts = opts || {},
	      field = { name: fieldName, boost: opts.boost || 1 }
	
	  this._fields.push(field)
	  return this
	}
	
	/**
	 * Sets the property used to uniquely identify documents added to the index,
	 * by default this property is 'id'.
	 *
	 * This should only be changed before adding documents to the index, changing
	 * the ref property without resetting the index can lead to unexpected results.
	 *
	 * The value of ref can be of any type but it _must_ be stably comparable and
	 * orderable.
	 *
	 * @param {String} refName The property to use to uniquely identify the
	 * documents in the index.
	 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
	 * @returns {lunr.Index}
	 * @memberOf Index
	 */
	lunr.Index.prototype.ref = function (refName) {
	  this._ref = refName
	  return this
	}
	
	/**
	 * Sets the tokenizer used for this index.
	 *
	 * By default the index will use the default tokenizer, lunr.tokenizer. The tokenizer
	 * should only be changed before adding documents to the index. Changing the tokenizer
	 * without re-building the index can lead to unexpected results.
	 *
	 * @param {Function} fn The function to use as a tokenizer.
	 * @returns {lunr.Index}
	 * @memberOf Index
	 */
	lunr.Index.prototype.tokenizer = function (fn) {
	  var isRegistered = fn.label && (fn.label in lunr.tokenizer.registeredFunctions)
	
	  if (!isRegistered) {
	    lunr.utils.warn('Function is not a registered tokenizer. This may cause problems when serialising the index')
	  }
	
	  this.tokenizerFn = fn
	  return this
	}
	
	/**
	 * Add a document to the index.
	 *
	 * This is the way new documents enter the index, this function will run the
	 * fields from the document through the index's pipeline and then add it to
	 * the index, it will then show up in search results.
	 *
	 * An 'add' event is emitted with the document that has been added and the index
	 * the document has been added to. This event can be silenced by passing false
	 * as the second argument to add.
	 *
	 * @param {Object} doc The document to add to the index.
	 * @param {Boolean} emitEvent Whether or not to emit events, default true.
	 * @memberOf Index
	 */
	lunr.Index.prototype.add = function (doc, emitEvent) {
	  var docTokens = {},
	      allDocumentTokens = new lunr.SortedSet,
	      docRef = doc[this._ref],
	      emitEvent = emitEvent === undefined ? true : emitEvent
	
	  this._fields.forEach(function (field) {
	    var fieldTokens = this.pipeline.run(this.tokenizerFn(doc[field.name]))
	
	    docTokens[field.name] = fieldTokens
	
	    for (var i = 0; i < fieldTokens.length; i++) {
	      var token = fieldTokens[i]
	      allDocumentTokens.add(token)
	      this.corpusTokens.add(token)
	    }
	  }, this)
	
	  this.documentStore.set(docRef, allDocumentTokens)
	
	  for (var i = 0; i < allDocumentTokens.length; i++) {
	    var token = allDocumentTokens.elements[i]
	    var tf = 0;
	
	    for (var j = 0; j < this._fields.length; j++){
	      var field = this._fields[j]
	      var fieldTokens = docTokens[field.name]
	      var fieldLength = fieldTokens.length
	
	      if (!fieldLength) continue
	
	      var tokenCount = 0
	      for (var k = 0; k < fieldLength; k++){
	        if (fieldTokens[k] === token){
	          tokenCount++
	        }
	      }
	
	      tf += (tokenCount / fieldLength * field.boost)
	    }
	
	    this.tokenStore.add(token, { ref: docRef, tf: tf })
	  };
	
	  if (emitEvent) this.eventEmitter.emit('add', doc, this)
	}
	
	/**
	 * Removes a document from the index.
	 *
	 * To make sure documents no longer show up in search results they can be
	 * removed from the index using this method.
	 *
	 * The document passed only needs to have the same ref property value as the
	 * document that was added to the index, they could be completely different
	 * objects.
	 *
	 * A 'remove' event is emitted with the document that has been removed and the index
	 * the document has been removed from. This event can be silenced by passing false
	 * as the second argument to remove.
	 *
	 * @param {Object} doc The document to remove from the index.
	 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
	 * @memberOf Index
	 */
	lunr.Index.prototype.remove = function (doc, emitEvent) {
	  var docRef = doc[this._ref],
	      emitEvent = emitEvent === undefined ? true : emitEvent
	
	  if (!this.documentStore.has(docRef)) return
	
	  var docTokens = this.documentStore.get(docRef)
	
	  this.documentStore.remove(docRef)
	
	  docTokens.forEach(function (token) {
	    this.tokenStore.remove(token, docRef)
	  }, this)
	
	  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
	}
	
	/**
	 * Updates a document in the index.
	 *
	 * When a document contained within the index gets updated, fields changed,
	 * added or removed, to make sure it correctly matched against search queries,
	 * it should be updated in the index.
	 *
	 * This method is just a wrapper around `remove` and `add`
	 *
	 * An 'update' event is emitted with the document that has been updated and the index.
	 * This event can be silenced by passing false as the second argument to update. Only
	 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
	 * are silenced.
	 *
	 * @param {Object} doc The document to update in the index.
	 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
	 * @see Index.prototype.remove
	 * @see Index.prototype.add
	 * @memberOf Index
	 */
	lunr.Index.prototype.update = function (doc, emitEvent) {
	  var emitEvent = emitEvent === undefined ? true : emitEvent
	
	  this.remove(doc, false)
	  this.add(doc, false)
	
	  if (emitEvent) this.eventEmitter.emit('update', doc, this)
	}
	
	/**
	 * Calculates the inverse document frequency for a token within the index.
	 *
	 * @param {String} token The token to calculate the idf of.
	 * @see Index.prototype.idf
	 * @private
	 * @memberOf Index
	 */
	lunr.Index.prototype.idf = function (term) {
	  var cacheKey = "@" + term
	  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]
	
	  var documentFrequency = this.tokenStore.count(term),
	      idf = 1
	
	  if (documentFrequency > 0) {
	    idf = 1 + Math.log(this.documentStore.length / documentFrequency)
	  }
	
	  return this._idfCache[cacheKey] = idf
	}
	
	/**
	 * Searches the index using the passed query.
	 *
	 * Queries should be a string, multiple words are allowed and will lead to an
	 * AND based query, e.g. `idx.search('foo bar')` will run a search for
	 * documents containing both 'foo' and 'bar'.
	 *
	 * All query tokens are passed through the same pipeline that document tokens
	 * are passed through, so any language processing involved will be run on every
	 * query term.
	 *
	 * Each query term is expanded, so that the term 'he' might be expanded to
	 * 'hello' and 'help' if those terms were already included in the index.
	 *
	 * Matching documents are returned as an array of objects, each object contains
	 * the matching document ref, as set for this index, and the similarity score
	 * for this document against the query.
	 *
	 * @param {String} query The query to search the index with.
	 * @returns {Object}
	 * @see Index.prototype.idf
	 * @see Index.prototype.documentVector
	 * @memberOf Index
	 */
	lunr.Index.prototype.search = function (query) {
	  var queryTokens = this.pipeline.run(this.tokenizerFn(query)),
	      queryVector = new lunr.Vector,
	      documentSets = [],
	      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)
	
	  var hasSomeToken = queryTokens.some(function (token) {
	    return this.tokenStore.has(token)
	  }, this)
	
	  if (!hasSomeToken) return []
	
	  queryTokens
	    .forEach(function (token, i, tokens) {
	      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
	          self = this
	
	      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
	        var pos = self.corpusTokens.indexOf(key),
	            idf = self.idf(key),
	            similarityBoost = 1,
	            set = new lunr.SortedSet
	
	        // if the expanded key is not an exact match to the token then
	        // penalise the score for this key by how different the key is
	        // to the token.
	        if (key !== token) {
	          var diff = Math.max(3, key.length - token.length)
	          similarityBoost = 1 / Math.log(diff)
	        }
	
	        // calculate the query tf-idf score for this token
	        // applying an similarityBoost to ensure exact matches
	        // these rank higher than expanded terms
	        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)
	
	        // add all the documents that have this key into a set
	        // ensuring that the type of key is preserved
	        var matchingDocuments = self.tokenStore.get(key),
	            refs = Object.keys(matchingDocuments),
	            refsLen = refs.length
	
	        for (var i = 0; i < refsLen; i++) {
	          set.add(matchingDocuments[refs[i]].ref)
	        }
	
	        return memo.union(set)
	      }, new lunr.SortedSet)
	
	      documentSets.push(set)
	    }, this)
	
	  var documentSet = documentSets.reduce(function (memo, set) {
	    return memo.intersect(set)
	  })
	
	  return documentSet
	    .map(function (ref) {
	      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
	    }, this)
	    .sort(function (a, b) {
	      return b.score - a.score
	    })
	}
	
	/**
	 * Generates a vector containing all the tokens in the document matching the
	 * passed documentRef.
	 *
	 * The vector contains the tf-idf score for each token contained in the
	 * document with the passed documentRef.  The vector will contain an element
	 * for every token in the indexes corpus, if the document does not contain that
	 * token the element will be 0.
	 *
	 * @param {Object} documentRef The ref to find the document with.
	 * @returns {lunr.Vector}
	 * @private
	 * @memberOf Index
	 */
	lunr.Index.prototype.documentVector = function (documentRef) {
	  var documentTokens = this.documentStore.get(documentRef),
	      documentTokensLength = documentTokens.length,
	      documentVector = new lunr.Vector
	
	  for (var i = 0; i < documentTokensLength; i++) {
	    var token = documentTokens.elements[i],
	        tf = this.tokenStore.get(token)[documentRef].tf,
	        idf = this.idf(token)
	
	    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
	  };
	
	  return documentVector
	}
	
	/**
	 * Returns a representation of the index ready for serialisation.
	 *
	 * @returns {Object}
	 * @memberOf Index
	 */
	lunr.Index.prototype.toJSON = function () {
	  return {
	    version: lunr.version,
	    fields: this._fields,
	    ref: this._ref,
	    tokenizer: this.tokenizerFn.label,
	    documentStore: this.documentStore.toJSON(),
	    tokenStore: this.tokenStore.toJSON(),
	    corpusTokens: this.corpusTokens.toJSON(),
	    pipeline: this.pipeline.toJSON()
	  }
	}
	
	/**
	 * Applies a plugin to the current index.
	 *
	 * A plugin is a function that is called with the index as its context.
	 * Plugins can be used to customise or extend the behaviour the index
	 * in some way. A plugin is just a function, that encapsulated the custom
	 * behaviour that should be applied to the index.
	 *
	 * The plugin function will be called with the index as its argument, additional
	 * arguments can also be passed when calling use. The function will be called
	 * with the index as its context.
	 *
	 * Example:
	 *
	 *     var myPlugin = function (idx, arg1, arg2) {
	 *       // `this` is the index to be extended
	 *       // apply any extensions etc here.
	 *     }
	 *
	 *     var idx = lunr(function () {
	 *       this.use(myPlugin, 'arg1', 'arg2')
	 *     })
	 *
	 * @param {Function} plugin The plugin to apply.
	 * @memberOf Index
	 */
	lunr.Index.prototype.use = function (plugin) {
	  var args = Array.prototype.slice.call(arguments, 1)
	  args.unshift(this)
	  plugin.apply(this, args)
	}
	/*!
	 * lunr.Store
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * lunr.Store is a simple key-value store used for storing sets of tokens for
	 * documents stored in index.
	 *
	 * @constructor
	 * @module
	 */
	lunr.Store = function () {
	  this.store = {}
	  this.length = 0
	}
	
	/**
	 * Loads a previously serialised store
	 *
	 * @param {Object} serialisedData The serialised store to load.
	 * @returns {lunr.Store}
	 * @memberOf Store
	 */
	lunr.Store.load = function (serialisedData) {
	  var store = new this
	
	  store.length = serialisedData.length
	  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
	    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
	    return memo
	  }, {})
	
	  return store
	}
	
	/**
	 * Stores the given tokens in the store against the given id.
	 *
	 * @param {Object} id The key used to store the tokens against.
	 * @param {Object} tokens The tokens to store against the key.
	 * @memberOf Store
	 */
	lunr.Store.prototype.set = function (id, tokens) {
	  if (!this.has(id)) this.length++
	  this.store[id] = tokens
	}
	
	/**
	 * Retrieves the tokens from the store for a given key.
	 *
	 * @param {Object} id The key to lookup and retrieve from the store.
	 * @returns {Object}
	 * @memberOf Store
	 */
	lunr.Store.prototype.get = function (id) {
	  return this.store[id]
	}
	
	/**
	 * Checks whether the store contains a key.
	 *
	 * @param {Object} id The id to look up in the store.
	 * @returns {Boolean}
	 * @memberOf Store
	 */
	lunr.Store.prototype.has = function (id) {
	  return id in this.store
	}
	
	/**
	 * Removes the value for a key in the store.
	 *
	 * @param {Object} id The id to remove from the store.
	 * @memberOf Store
	 */
	lunr.Store.prototype.remove = function (id) {
	  if (!this.has(id)) return
	
	  delete this.store[id]
	  this.length--
	}
	
	/**
	 * Returns a representation of the store ready for serialisation.
	 *
	 * @returns {Object}
	 * @memberOf Store
	 */
	lunr.Store.prototype.toJSON = function () {
	  return {
	    store: this.store,
	    length: this.length
	  }
	}
	
	/*!
	 * lunr.stemmer
	 * Copyright (C) 2016 Oliver Nightingale
	 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
	 */
	
	/**
	 * lunr.stemmer is an english language stemmer, this is a JavaScript
	 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
	 *
	 * @module
	 * @param {String} str The string to stem
	 * @returns {String}
	 * @see lunr.Pipeline
	 */
	lunr.stemmer = (function(){
	  var step2list = {
	      "ational" : "ate",
	      "tional" : "tion",
	      "enci" : "ence",
	      "anci" : "ance",
	      "izer" : "ize",
	      "bli" : "ble",
	      "alli" : "al",
	      "entli" : "ent",
	      "eli" : "e",
	      "ousli" : "ous",
	      "ization" : "ize",
	      "ation" : "ate",
	      "ator" : "ate",
	      "alism" : "al",
	      "iveness" : "ive",
	      "fulness" : "ful",
	      "ousness" : "ous",
	      "aliti" : "al",
	      "iviti" : "ive",
	      "biliti" : "ble",
	      "logi" : "log"
	    },
	
	    step3list = {
	      "icate" : "ic",
	      "ative" : "",
	      "alize" : "al",
	      "iciti" : "ic",
	      "ical" : "ic",
	      "ful" : "",
	      "ness" : ""
	    },
	
	    c = "[^aeiou]",          // consonant
	    v = "[aeiouy]",          // vowel
	    C = c + "[^aeiouy]*",    // consonant sequence
	    V = v + "[aeiou]*",      // vowel sequence
	
	    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
	    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
	    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
	    s_v = "^(" + C + ")?" + v;                   // vowel in stem
	
	  var re_mgr0 = new RegExp(mgr0);
	  var re_mgr1 = new RegExp(mgr1);
	  var re_meq1 = new RegExp(meq1);
	  var re_s_v = new RegExp(s_v);
	
	  var re_1a = /^(.+?)(ss|i)es$/;
	  var re2_1a = /^(.+?)([^s])s$/;
	  var re_1b = /^(.+?)eed$/;
	  var re2_1b = /^(.+?)(ed|ing)$/;
	  var re_1b_2 = /.$/;
	  var re2_1b_2 = /(at|bl|iz)$/;
	  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
	  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");
	
	  var re_1c = /^(.+?[^aeiou])y$/;
	  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
	
	  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
	
	  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
	  var re2_4 = /^(.+?)(s|t)(ion)$/;
	
	  var re_5 = /^(.+?)e$/;
	  var re_5_1 = /ll$/;
	  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");
	
	  var porterStemmer = function porterStemmer(w) {
	    var   stem,
	      suffix,
	      firstch,
	      re,
	      re2,
	      re3,
	      re4;
	
	    if (w.length < 3) { return w; }
	
	    firstch = w.substr(0,1);
	    if (firstch == "y") {
	      w = firstch.toUpperCase() + w.substr(1);
	    }
	
	    // Step 1a
	    re = re_1a
	    re2 = re2_1a;
	
	    if (re.test(w)) { w = w.replace(re,"$1$2"); }
	    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }
	
	    // Step 1b
	    re = re_1b;
	    re2 = re2_1b;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      re = re_mgr0;
	      if (re.test(fp[1])) {
	        re = re_1b_2;
	        w = w.replace(re,"");
	      }
	    } else if (re2.test(w)) {
	      var fp = re2.exec(w);
	      stem = fp[1];
	      re2 = re_s_v;
	      if (re2.test(stem)) {
	        w = stem;
	        re2 = re2_1b_2;
	        re3 = re3_1b_2;
	        re4 = re4_1b_2;
	        if (re2.test(w)) {  w = w + "e"; }
	        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
	        else if (re4.test(w)) { w = w + "e"; }
	      }
	    }
	
	    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
	    re = re_1c;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      w = stem + "i";
	    }
	
	    // Step 2
	    re = re_2;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      suffix = fp[2];
	      re = re_mgr0;
	      if (re.test(stem)) {
	        w = stem + step2list[suffix];
	      }
	    }
	
	    // Step 3
	    re = re_3;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      suffix = fp[2];
	      re = re_mgr0;
	      if (re.test(stem)) {
	        w = stem + step3list[suffix];
	      }
	    }
	
	    // Step 4
	    re = re_4;
	    re2 = re2_4;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      re = re_mgr1;
	      if (re.test(stem)) {
	        w = stem;
	      }
	    } else if (re2.test(w)) {
	      var fp = re2.exec(w);
	      stem = fp[1] + fp[2];
	      re2 = re_mgr1;
	      if (re2.test(stem)) {
	        w = stem;
	      }
	    }
	
	    // Step 5
	    re = re_5;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      re = re_mgr1;
	      re2 = re_meq1;
	      re3 = re3_5;
	      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
	        w = stem;
	      }
	    }
	
	    re = re_5_1;
	    re2 = re_mgr1;
	    if (re.test(w) && re2.test(w)) {
	      re = re_1b_2;
	      w = w.replace(re,"");
	    }
	
	    // and turn initial Y back to y
	
	    if (firstch == "y") {
	      w = firstch.toLowerCase() + w.substr(1);
	    }
	
	    return w;
	  };
	
	  return porterStemmer;
	})();
	
	lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
	/*!
	 * lunr.stopWordFilter
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
	 * list of stop words.
	 *
	 * The built in lunr.stopWordFilter is built using this generator and can be used
	 * to generate custom stopWordFilters for applications or non English languages.
	 *
	 * @module
	 * @param {Array} token The token to pass through the filter
	 * @returns {Function}
	 * @see lunr.Pipeline
	 * @see lunr.stopWordFilter
	 */
	lunr.generateStopWordFilter = function (stopWords) {
	  var words = stopWords.reduce(function (memo, stopWord) {
	    memo[stopWord] = stopWord
	    return memo
	  }, {})
	
	  return function (token) {
	    if (token && words[token] !== token) return token
	  }
	}
	
	/**
	 * lunr.stopWordFilter is an English language stop word list filter, any words
	 * contained in the list will not be passed through the filter.
	 *
	 * This is intended to be used in the Pipeline. If the token does not pass the
	 * filter then undefined will be returned.
	 *
	 * @module
	 * @param {String} token The token to pass through the filter
	 * @returns {String}
	 * @see lunr.Pipeline
	 */
	lunr.stopWordFilter = lunr.generateStopWordFilter([
	  'a',
	  'able',
	  'about',
	  'across',
	  'after',
	  'all',
	  'almost',
	  'also',
	  'am',
	  'among',
	  'an',
	  'and',
	  'any',
	  'are',
	  'as',
	  'at',
	  'be',
	  'because',
	  'been',
	  'but',
	  'by',
	  'can',
	  'cannot',
	  'could',
	  'dear',
	  'did',
	  'do',
	  'does',
	  'either',
	  'else',
	  'ever',
	  'every',
	  'for',
	  'from',
	  'get',
	  'got',
	  'had',
	  'has',
	  'have',
	  'he',
	  'her',
	  'hers',
	  'him',
	  'his',
	  'how',
	  'however',
	  'i',
	  'if',
	  'in',
	  'into',
	  'is',
	  'it',
	  'its',
	  'just',
	  'least',
	  'let',
	  'like',
	  'likely',
	  'may',
	  'me',
	  'might',
	  'most',
	  'must',
	  'my',
	  'neither',
	  'no',
	  'nor',
	  'not',
	  'of',
	  'off',
	  'often',
	  'on',
	  'only',
	  'or',
	  'other',
	  'our',
	  'own',
	  'rather',
	  'said',
	  'say',
	  'says',
	  'she',
	  'should',
	  'since',
	  'so',
	  'some',
	  'than',
	  'that',
	  'the',
	  'their',
	  'them',
	  'then',
	  'there',
	  'these',
	  'they',
	  'this',
	  'tis',
	  'to',
	  'too',
	  'twas',
	  'us',
	  'wants',
	  'was',
	  'we',
	  'were',
	  'what',
	  'when',
	  'where',
	  'which',
	  'while',
	  'who',
	  'whom',
	  'why',
	  'will',
	  'with',
	  'would',
	  'yet',
	  'you',
	  'your'
	])
	
	lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
	/*!
	 * lunr.trimmer
	 * Copyright (C) 2016 Oliver Nightingale
	 */
	
	/**
	 * lunr.trimmer is a pipeline function for trimming non word
	 * characters from the begining and end of tokens before they
	 * enter the index.
	 *
	 * This implementation may not work correctly for non latin
	 * characters and should either be removed or adapted for use
	 * with languages with non-latin characters.
	 *
	 * @module
	 * @param {String} token The token to pass through the filter
	 * @returns {String}
	 * @see lunr.Pipeline
	 */
	lunr.trimmer = function (token) {
	  return token.replace(/^\W+/, '').replace(/\W+$/, '')
	}
	
	lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
	/*!
	 * lunr.stemmer
	 * Copyright (C) 2016 Oliver Nightingale
	 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
	 */
	
	/**
	 * lunr.TokenStore is used for efficient storing and lookup of the reverse
	 * index of token to document ref.
	 *
	 * @constructor
	 */
	lunr.TokenStore = function () {
	  this.root = { docs: {} }
	  this.length = 0
	}
	
	/**
	 * Loads a previously serialised token store
	 *
	 * @param {Object} serialisedData The serialised token store to load.
	 * @returns {lunr.TokenStore}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.load = function (serialisedData) {
	  var store = new this
	
	  store.root = serialisedData.root
	  store.length = serialisedData.length
	
	  return store
	}
	
	/**
	 * Adds a new token doc pair to the store.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to store the doc under
	 * @param {Object} doc The doc to store against the token
	 * @param {Object} root An optional node at which to start looking for the
	 * correct place to enter the doc, by default the root of this lunr.TokenStore
	 * is used.
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.add = function (token, doc, root) {
	  var root = root || this.root,
	      key = token.charAt(0),
	      rest = token.slice(1)
	
	  if (!(key in root)) root[key] = {docs: {}}
	
	  if (rest.length === 0) {
	    root[key].docs[doc.ref] = doc
	    this.length += 1
	    return
	  } else {
	    return this.add(rest, doc, root[key])
	  }
	}
	
	/**
	 * Checks whether this key is contained within this lunr.TokenStore.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to check for
	 * @param {Object} root An optional node at which to start
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.has = function (token) {
	  if (!token) return false
	
	  var node = this.root
	
	  for (var i = 0; i < token.length; i++) {
	    if (!node[token.charAt(i)]) return false
	
	    node = node[token.charAt(i)]
	  }
	
	  return true
	}
	
	/**
	 * Retrieve a node from the token store for a given token.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to get the node for.
	 * @param {Object} root An optional node at which to start.
	 * @returns {Object}
	 * @see TokenStore.prototype.get
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.getNode = function (token) {
	  if (!token) return {}
	
	  var node = this.root
	
	  for (var i = 0; i < token.length; i++) {
	    if (!node[token.charAt(i)]) return {}
	
	    node = node[token.charAt(i)]
	  }
	
	  return node
	}
	
	/**
	 * Retrieve the documents for a node for the given token.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to get the documents for.
	 * @param {Object} root An optional node at which to start.
	 * @returns {Object}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.get = function (token, root) {
	  return this.getNode(token, root).docs || {}
	}
	
	lunr.TokenStore.prototype.count = function (token, root) {
	  return Object.keys(this.get(token, root)).length
	}
	
	/**
	 * Remove the document identified by ref from the token in the store.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to get the documents for.
	 * @param {String} ref The ref of the document to remove from this token.
	 * @param {Object} root An optional node at which to start.
	 * @returns {Object}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.remove = function (token, ref) {
	  if (!token) return
	  var node = this.root
	
	  for (var i = 0; i < token.length; i++) {
	    if (!(token.charAt(i) in node)) return
	    node = node[token.charAt(i)]
	  }
	
	  delete node.docs[ref]
	}
	
	/**
	 * Find all the possible suffixes of the passed token using tokens
	 * currently in the store.
	 *
	 * @param {String} token The token to expand.
	 * @returns {Array}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.expand = function (token, memo) {
	  var root = this.getNode(token),
	      docs = root.docs || {},
	      memo = memo || []
	
	  if (Object.keys(docs).length) memo.push(token)
	
	  Object.keys(root)
	    .forEach(function (key) {
	      if (key === 'docs') return
	
	      memo.concat(this.expand(token + key, memo))
	    }, this)
	
	  return memo
	}
	
	/**
	 * Returns a representation of the token store ready for serialisation.
	 *
	 * @returns {Object}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.toJSON = function () {
	  return {
	    root: this.root,
	    length: this.length
	  }
	}
	
	  /**
	   * export the module via AMD, CommonJS or as a browser global
	   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
	   */
	  ;(function (root, factory) {
	    if (true) {
	      // AMD. Register as an anonymous module.
	      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	    } else if (typeof exports === 'object') {
	      /**
	       * Node. Does not work with strict CommonJS, but
	       * only CommonJS-like enviroments that support module.exports,
	       * like Node.
	       */
	      module.exports = factory()
	    } else {
	      // Browser globals (root is window)
	      root.lunr = factory()
	    }
	  }(this, function () {
	    /**
	     * Just return a value to define the module export.
	     * This example returns an object, but the module
	     * can return a function as the exported value.
	     */
	    return lunr
	  }))
	})();


/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30),
	    now = __webpack_require__(31),
	    toNumber = __webpack_require__(32);
	
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
/* 30 */
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
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(33),
	    isObject = __webpack_require__(30),
	    isSymbol = __webpack_require__(34);
	
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30);
	
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(35);
	
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
/* 35 */
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
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var createFind = __webpack_require__(39),
	    findIndex = __webpack_require__(136);
	
	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	var find = createFind(findIndex);
	
	module.exports = find;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(40),
	    isArrayLike = __webpack_require__(103),
	    keys = __webpack_require__(97);
	
	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function(collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    predicate = baseIteratee(predicate, 3);
	    if (!isArrayLike(collection)) {
	      var props = keys(collection);
	    }
	    var index = findIndexFunc(props || collection, function(value, key) {
	      if (props) {
	        key = value;
	        value = iterable[key];
	      }
	      return predicate(value, key, iterable);
	    }, fromIndex);
	    return index > -1 ? collection[props ? props[index] : index] : undefined;
	  };
	}
	
	module.exports = createFind;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(41),
	    baseMatchesProperty = __webpack_require__(120),
	    identity = __webpack_require__(133),
	    isArray = __webpack_require__(107),
	    property = __webpack_require__(134);
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.exports = baseIteratee;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(42),
	    getMatchData = __webpack_require__(117),
	    matchesStrictComparable = __webpack_require__(119);
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(43),
	    baseIsEqual = __webpack_require__(82);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(44),
	    stackClear = __webpack_require__(52),
	    stackDelete = __webpack_require__(53),
	    stackGet = __webpack_require__(54),
	    stackHas = __webpack_require__(55),
	    stackSet = __webpack_require__(56);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(45),
	    listCacheDelete = __webpack_require__(46),
	    listCacheGet = __webpack_require__(49),
	    listCacheHas = __webpack_require__(50),
	    listCacheSet = __webpack_require__(51);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	module.exports = listCacheClear;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(47);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(48);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(47);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(47);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(47);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(44);
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}
	
	module.exports = stackClear;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}
	
	module.exports = stackDelete;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	module.exports = stackGet;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	module.exports = stackHas;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(44),
	    MapCache = __webpack_require__(57);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
	    cache = this.__data__ = new MapCache(cache.__data__);
	  }
	  cache.set(key, value);
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(58),
	    mapCacheDelete = __webpack_require__(76),
	    mapCacheGet = __webpack_require__(79),
	    mapCacheHas = __webpack_require__(80),
	    mapCacheSet = __webpack_require__(81);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	module.exports = MapCache;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(59),
	    ListCache = __webpack_require__(44),
	    Map = __webpack_require__(75);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(60),
	    hashDelete = __webpack_require__(71),
	    hashGet = __webpack_require__(72),
	    hashHas = __webpack_require__(73),
	    hashSet = __webpack_require__(74);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	module.exports = Hash;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(61);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	
	module.exports = hashClear;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(62);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(63),
	    getValue = __webpack_require__(70);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(33),
	    isHostObject = __webpack_require__(64),
	    isMasked = __webpack_require__(65),
	    isObject = __webpack_require__(30),
	    toSource = __webpack_require__(69);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(66);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(67);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(68);
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(typeof self == 'object' && self);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(typeof this == 'object' && this);
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	module.exports = checkGlobal;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 70 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	
	module.exports = hashDelete;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(61);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(61);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(61);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(62),
	    root = __webpack_require__(67);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(77);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	
	module.exports = mapCacheDelete;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(78);
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	module.exports = getMapData;


/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	module.exports = isKeyable;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(77);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	module.exports = mapCacheGet;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(77);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	module.exports = mapCacheHas;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(77);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(83),
	    isObject = __webpack_require__(30),
	    isObjectLike = __webpack_require__(35);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(43),
	    equalArrays = __webpack_require__(84),
	    equalByTag = __webpack_require__(89),
	    equalObjects = __webpack_require__(94),
	    getTag = __webpack_require__(111),
	    isArray = __webpack_require__(107),
	    isHostObject = __webpack_require__(64),
	    isTypedArray = __webpack_require__(116);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(85),
	    arraySome = __webpack_require__(88);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(57),
	    setCacheAdd = __webpack_require__(86),
	    setCacheHas = __webpack_require__(87);
	
	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	module.exports = setCacheAdd;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	module.exports = setCacheHas;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(90),
	    Uint8Array = __webpack_require__(91),
	    equalArrays = __webpack_require__(84),
	    mapToArray = __webpack_require__(92),
	    setToArray = __webpack_require__(93);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);
	
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(67);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(67);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 92 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(95),
	    keys = __webpack_require__(97);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(96);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return object != null &&
	    (hasOwnProperty.call(object, key) ||
	      (typeof object == 'object' && key in object && getPrototype(object) === null));
	}
	
	module.exports = baseHas;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	module.exports = getPrototype;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(95),
	    baseKeys = __webpack_require__(98),
	    indexKeys = __webpack_require__(99),
	    isArrayLike = __webpack_require__(103),
	    isIndex = __webpack_require__(109),
	    isPrototype = __webpack_require__(110);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 98 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.exports = baseKeys;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(100),
	    isArguments = __webpack_require__(101),
	    isArray = __webpack_require__(107),
	    isLength = __webpack_require__(106),
	    isString = __webpack_require__(108);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(102);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
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
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(103),
	    isObjectLike = __webpack_require__(35);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(104),
	    isFunction = __webpack_require__(33),
	    isLength = __webpack_require__(106);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(105);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 105 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 106 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(107),
	    isObjectLike = __webpack_require__(35);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 110 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(112),
	    Map = __webpack_require__(75),
	    Promise = __webpack_require__(113),
	    Set = __webpack_require__(114),
	    WeakMap = __webpack_require__(115),
	    toSource = __webpack_require__(69);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(62),
	    root = __webpack_require__(67);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(62),
	    root = __webpack_require__(67);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(62),
	    root = __webpack_require__(67);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(62),
	    root = __webpack_require__(67);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(106),
	    isObjectLike = __webpack_require__(35);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(118),
	    keys = __webpack_require__(97);
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;
	
	  while (length--) {
	    var key = result[length],
	        value = object[key];
	
	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}
	
	module.exports = matchesStrictComparable;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(82),
	    get = __webpack_require__(121),
	    hasIn = __webpack_require__(130),
	    isKey = __webpack_require__(128),
	    isStrictComparable = __webpack_require__(118),
	    matchesStrictComparable = __webpack_require__(119),
	    toKey = __webpack_require__(129);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(122);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(123),
	    isKey = __webpack_require__(128),
	    toKey = __webpack_require__(129);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(107),
	    stringToPath = __webpack_require__(124);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.exports = castPath;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(125),
	    toString = __webpack_require__(126);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(57);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}
	
	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;
	
	module.exports = memoize;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(127);
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	module.exports = toString;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(90),
	    isSymbol = __webpack_require__(34);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = baseToString;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(107),
	    isSymbol = __webpack_require__(34);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(34);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toKey;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(131),
	    hasPath = __webpack_require__(132);
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}
	
	module.exports = hasIn;


/***/ },
/* 131 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}
	
	module.exports = baseHasIn;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(123),
	    isArguments = __webpack_require__(101),
	    isArray = __webpack_require__(107),
	    isIndex = __webpack_require__(109),
	    isKey = __webpack_require__(128),
	    isLength = __webpack_require__(106),
	    isString = __webpack_require__(108),
	    toKey = __webpack_require__(129);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var result,
	      index = -1,
	      length = path.length;
	
	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isString(object) || isArguments(object));
	}
	
	module.exports = hasPath;


/***/ },
/* 133 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(105),
	    basePropertyDeep = __webpack_require__(135),
	    isKey = __webpack_require__(128),
	    toKey = __webpack_require__(129);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(122);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(137),
	    baseIteratee = __webpack_require__(40),
	    toInteger = __webpack_require__(138);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}
	
	module.exports = findIndex;


/***/ },
/* 137 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseFindIndex;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(139);
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;
	
	  return result === result ? (remainder ? result - remainder : result) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(32);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}
	
	module.exports = toFinite;


/***/ }
/******/ ]);
//# sourceMappingURL=blog.js.map