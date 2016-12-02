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
			this.observe('bio', bio => {
				this.refs.bio.innerHTML = bio;
			}, { init: false, defer: true });

			this.observe('active', active => {
				const html = document.querySelector('html');
				if(active)
					html.classList.add('locked');
				else
					html.classList.remove('locked');
			}, { defer: true });
		}
	}
}());

function renderMainFragment ( root, component, target ) {
	var div = document.createElement( 'div' );
	div.className = "details-container " + ( root.activeClassName );
	
	var div1 = document.createElement( 'div' );
	div1.className = "details";
	
	var ifBlock_0_anchor = document.createComment( "#if active" );
	div1.appendChild( ifBlock_0_anchor );
	
	function getBlock_0 ( root ) {
		if ( root.active ) return renderIfBlock_0_0;
		return null;
	}
	
	var currentBlock_0 = getBlock_0( root );
	var ifBlock_0 = currentBlock_0 && currentBlock_0( root, component, div1, ifBlock_0_anchor );
	
	div.appendChild( div1 )
	
	target.appendChild( div )

	return {
		update: function ( changed, root ) {
			div.className = "details-container " + ( root.activeClassName );
			
			var _currentBlock_0 = currentBlock_0;
			currentBlock_0 = getBlock_0( root );
			if ( _currentBlock_0 === currentBlock_0 && ifBlock_0) {
				ifBlock_0.update( changed, root );
			} else {
				if ( ifBlock_0 ) ifBlock_0.teardown( true );
				ifBlock_0 = currentBlock_0 && currentBlock_0( root, component, div1, ifBlock_0_anchor );
			}
		},

		teardown: function ( detach ) {
			if ( detach ) div.parentNode.removeChild( div );
			
			
			
			if ( ifBlock_0 ) ifBlock_0.teardown( detach );
		}
	};
}

function renderIfBlock_0_0 ( root, component, target, anchor ) {
	var span = document.createElement( 'span' );
	span.className = "name";
	
	var text = document.createTextNode( root.name );
	span.appendChild( text );
	
	var text1 = document.createTextNode( "\n\t" );
	span.appendChild( text1 );
	
	var ifBlock_1_anchor = document.createComment( "#if titles" );
	span.appendChild( ifBlock_1_anchor );
	
	function getBlock_1 ( root ) {
		if ( root.titles ) return renderIfBlock_1_0;
		return null;
	}
	
	var currentBlock_1 = getBlock_1( root );
	var ifBlock_1 = currentBlock_1 && currentBlock_1( root, component, span, ifBlock_1_anchor );
	
	anchor.parentNode.insertBefore( span, anchor )
	
	var text2 = document.createTextNode( "\n\t\t" );
	anchor.parentNode.insertBefore( text2, anchor );
	
	var img = document.createElement( 'img' );
	img.className = "image";
	img.src = root.image;
	img.alt = '';
	
	anchor.parentNode.insertBefore( img, anchor )
	
	var text3 = document.createTextNode( "\n\t\t" );
	anchor.parentNode.insertBefore( text3, anchor );
	
	var div = document.createElement( 'div' );
	component.refs.bio = div;
	div.className = "bio";
	
	anchor.parentNode.insertBefore( div, anchor )

	return {
		update: function ( changed, root ) {
			text.data = root.name;
			
			var _currentBlock_1 = currentBlock_1;
			currentBlock_1 = getBlock_1( root );
			if ( _currentBlock_1 === currentBlock_1 && ifBlock_1) {
				ifBlock_1.update( changed, root );
			} else {
				if ( ifBlock_1 ) ifBlock_1.teardown( true );
				ifBlock_1 = currentBlock_1 && currentBlock_1( root, component, span, ifBlock_1_anchor );
			}
			
			img.src = root.image;
		},

		teardown: function ( detach ) {
			if ( detach ) span.parentNode.removeChild( span );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			if ( ifBlock_1 ) ifBlock_1.teardown( detach );
			
			if ( detach ) text2.parentNode.removeChild( text2 );
			
			if ( detach ) img.parentNode.removeChild( img );
			
			if ( detach ) text3.parentNode.removeChild( text3 );
			
			if ( component.refs.bio === div ) component.refs.bio = null;
			if ( detach ) div.parentNode.removeChild( div );
		}
	};
}

function renderIfBlock_1_0 ( root, component, target, anchor ) {
	var span = document.createElement( 'span' );
	span.className = "titles";
	
	var text = document.createTextNode( root.titles.join(', ') );
	span.appendChild( text );
	
	anchor.parentNode.insertBefore( span, anchor )

	return {
		update: function ( changed, root ) {
			text.data = root.titles.join(', ');
		},

		teardown: function ( detach ) {
			if ( detach ) span.parentNode.removeChild( span );
		}
	};
}

function PersonDetails ( options ) {
	var component = this;
this.refs = {}
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

	var mainFragment = renderMainFragment( state, this, options.target );
	
	if ( options.parent ) {
		options.parent.__renderHooks.push({ fn: template.onrender, context: this });
	} else {
		template.onrender.call( this );
	}
}

export default PersonDetails;