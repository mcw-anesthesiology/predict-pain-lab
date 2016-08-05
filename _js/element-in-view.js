let currentElement = document.querySelector('.in-view');
let watchedElements = document.querySelectorAll('.watch-in-view'); // TODO this name sucks
let headerHeight = document.querySelector('.site-header').clientHeight;

if(watchedElements.length > 0){
	for(let event of ['resize', 'scroll']){
		window.addEventListener(event, () => {
			window.requestAnimationFrame(viewStep);
		});
	}

	window.requestAnimationFrame(viewStep);
}


function viewStep(){
	headerHeight = document.querySelector('.site-header').clientHeight;
	let elementsInView = [];
	for(let i = 0; i < watchedElements.length; i++){
		let element = watchedElements[i];
		if(isInView(element))
			elementsInView.push(element);
	}

	if(elementsInView.length === 0)
		return;

	let newElement;
	let mostInView = -1;
	for(let element of elementsInView){
		let amountInView = getAmountInView(element);
		if(amountInView > mostInView){
			mostInView = amountInView;
			newElement = element;
		}
	}

	if(newElement !== currentElement){
		if(currentElement){
			currentElement.classList.remove('in-view');
			let id = currentElement.dataset.id;
			if(id === '#')
				id = '';
			let link = document.querySelector(`a.page-link[href="#${id}"]`);
			if(link)
				link.classList.remove('active');
		}

		newElement.classList.add('in-view');
		let id = newElement.dataset.id;
		if(id === '#')
			id = '';
		let link = document.querySelector(`a.page-link[href="#${id}"]`);
		if(link){
			link.classList.add('active');
			let href = id ? `#${id}` : window.location.pathname + window.location.search;
			window.history.replaceState({}, '', href);
		}

		currentElement = newElement;
	}
}

export function isInView(element){
	let rect = element.getBoundingClientRect();
	return (rect.bottom > headerHeight && rect.top < window.innerHeight
		&& rect.right > 0 && rect.left < window.innerWidth);
}

function getAmountInView(element){
	let rect = element.getBoundingClientRect();
	let windowHeight = window.innerHeight;
	let inViewRect = {
		top: Math.max(rect.top, headerHeight),
		bottom: Math.min(rect.bottom, windowHeight)
	};
	return inViewRect.bottom - inViewRect.top;
}
