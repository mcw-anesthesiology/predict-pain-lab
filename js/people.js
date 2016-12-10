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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/resources/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 473);
/******/ })
/************************************************************************/
/******/ ({

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

"use strict";
function applyComputations ( state, newState, oldState ) {
	if ( ( 'active' in newState && typeof state.active === 'object' || state.active !== oldState.active ) ) {
		state.activeClassName = newState.activeClassName = template.computed.activeClassName( state.active );
	}
}

var template = (function () {
	return {
		data(){
			return {
				active: false,
				name: '',
				titles: '',
				image: '',
				bio: ''
			}
		},

		computed: {
			activeClassName : active => active ? 'active' : ''
		},

		onrender(){
			this.observe('active', active => {
				const html = document.querySelector('html');
				if(active)
					html.classList.add('locked');
				else
					html.classList.remove('locked');
			}, { defer: true });
		},

		methods: {
			preventCloseModal(event){
				event.preventDefault();
			},
			closeModal(event){
				if(!event.defaultPrevented)
					this.set({ active: false });
			}
		}
	}
}());

function renderMainFragment ( root, component ) {
	var div = document.createElement( 'div' );
	function clickHandler ( event ) {
		component.closeModal(event);
	}
	
	div.addEventListener( 'click', clickHandler, false );
	div.className = "details-container " + ( root.activeClassName );
	
	var div1 = document.createElement( 'div' );
	function clickHandler1 ( event ) {
		component.preventCloseModal(event);
	}
	
	div1.addEventListener( 'click', clickHandler1, false );
	div1.className = "details";
	
	div.appendChild( div1 );
	
	var ifBlock_anchor = document.createComment( "#if active" );
	
	div1.appendChild( ifBlock_anchor );
	
	function getBlock ( root ) {
		if ( root.active ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( div, anchor );
		},

		update: function ( changed, root ) {
			div.className = "details-container " + ( root.activeClassName );
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
		},

		teardown: function ( detach ) {
			div.removeEventListener( 'click', clickHandler, false );
			
			div1.removeEventListener( 'click', clickHandler1, false );
			
			if ( ifBlock ) ifBlock.teardown( false );
			
			if ( detach ) {
				div.parentNode.removeChild( div );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var span = document.createElement( 'span' );
	span.className = "name";
	
	var text = document.createTextNode( root.name );
	
	span.appendChild( text );
	
	span.appendChild( document.createTextNode( "\n\t" ) );
	
	var ifBlock1_anchor = document.createComment( "#if titles" );
	
	span.appendChild( ifBlock1_anchor );
	
	function getBlock1 ( root ) {
		if ( root.titles ) return renderIfBlock1_0;
		return null;
	}
	
	var currentBlock1 = getBlock1( root );
	var ifBlock1 = currentBlock1 && currentBlock1( root, component );
	
	if ( ifBlock1 ) ifBlock1.mount( ifBlock1_anchor.parentNode, ifBlock1_anchor );
	
	var text2 = document.createTextNode( "\n\t\t" );
	
	var img = document.createElement( 'img' );
	img.className = "image";
	img.src = root.image;
	img.alt = '';
	
	var text3 = document.createTextNode( "\n\t\t" );
	
	var div = document.createElement( 'div' );
	div.className = "bio";
	
	var raw_before = document.createElement( 'noscript' );
	
	div.appendChild( raw_before );
	
	var raw_after = document.createElement( 'noscript' );
	
	div.appendChild( raw_after );
	
	raw_before.insertAdjacentHTML( 'afterend', root.bio );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( span, anchor );
			
			target.insertBefore( text2, anchor );
			
			target.insertBefore( img, anchor );
			
			target.insertBefore( text3, anchor );
			
			target.insertBefore( div, anchor );
		},

		update: function ( changed, root ) {
			text.data = root.name;
			
			var _currentBlock1 = currentBlock1;
			currentBlock1 = getBlock1( root );
			if ( _currentBlock1 === currentBlock1 && ifBlock1) {
				ifBlock1.update( changed, root );
			} else {
				if ( ifBlock1 ) ifBlock1.teardown( true );
				ifBlock1 = currentBlock1 && currentBlock1( root, component );
				if ( ifBlock1 ) ifBlock1.mount( ifBlock1_anchor.parentNode, ifBlock1_anchor );
			}
			
			img.src = root.image;
			
			while ( raw_before.nextSibling && raw_before.nextSibling !== raw_after ) {
				raw_before.parentNode.removeChild( raw_before.nextSibling );
			}
			raw_before.insertAdjacentHTML( 'afterend', root.bio );
		},

		teardown: function ( detach ) {
			if ( ifBlock1 ) ifBlock1.teardown( false );
			
			
			
			
			
			if ( detach ) {
				span.parentNode.removeChild( span );
				
				text2.parentNode.removeChild( text2 );
				
				img.parentNode.removeChild( img );
				
				text3.parentNode.removeChild( text3 );
				
				div.parentNode.removeChild( div );
			}
		}
	};
}

function renderIfBlock1_0 ( root, component ) {
	var span = document.createElement( 'span' );
	span.className = "titles";
	
	var text = document.createTextNode( root.titles.join(', ') );
	
	span.appendChild( text );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( span, anchor );
		},

		update: function ( changed, root ) {
			text.data = root.titles.join(', ');
		},

		teardown: function ( detach ) {
			if ( detach ) {
				span.parentNode.removeChild( span );
			}
		}
	};
}

function SvelteComponent ( options ) {
	options = options || {};

	var component = this;
	var state = Object.assign( template.data(), options.data );
applyComputations( state, state, {} );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		applyComputations( state, newState, oldState )
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	}

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	var mainFragment = renderMainFragment( state, this );
	if ( options.target ) this.mount( options.target );
	
	if ( options.root ) {
		options.root.__renderHooks.push({ fn: template.onrender, context: this });
	} else {
		template.onrender.call( this );
	}
}

SvelteComponent.prototype = template.methods;

/* harmony default export */ exports["a"] = SvelteComponent;

/***/ },

/***/ 473:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__svelte_components_PersonDetails_html__ = __webpack_require__(175);


var personDetails = new __WEBPACK_IMPORTED_MODULE_0__svelte_components_PersonDetails_html__["a" /* default */]({
	target: document.querySelector('body'),
	data: {
		active: false
	}
});

var peopleLinks = Array.from(document.querySelectorAll('.person > a'));
peopleLinks.map(function (personLink) {
	personLink.addEventListener('click', function (event) {
		event.preventDefault();
		window.history.pushState({}, '', personLink.href);
		var data = Object.assign({}, personLink.dataset, { active: true });
		data.titles = JSON.parse(data.titles);
		personDetails.set(data);
	});
});

window.personDetails = personDetails;

/***/ }

/******/ });
//# sourceMappingURL=people.js.map