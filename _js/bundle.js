import velocity from 'velocity-animate';
import debounce from 'lodash/debounce';

// Try to make these handlers fire first
import './parallax.js';

import './blog.js';
import './choose-mke.js';
import './element-in-view.js';
import './home.js';
import './people.js';
import './research-map.js';
import './sticky.js';

const header = document.querySelector('.site-header');
const main = document.querySelector('main');
let headerHeight = header.clientHeight;
main.style.setProperty('padding-top', `${headerHeight}px`);

window.addEventListener('resize', debounce(() => {
	headerHeight = header.clientHeight;
	main.style.setProperty('padding-top', `${headerHeight}px`);
}, 100));

if(window.location.hash.length > 1){
	window.requestAnimationFrame(() => {
		window.scrollBy(0, -1 * headerHeight);
	});
}


let internalLinks = document.getElementsByClassName('internal-link');
for(let link of internalLinks){ // FIXME: I don't think this works in IE
	link.addEventListener('click', function(event){
		let target = this.getAttribute('href');
		if(target.charAt(0) === "#"){
			event.preventDefault();
			if(target === '#')
			target = 'body';
			let targetElement = document.querySelector(target);
			velocity(targetElement, 'scroll', { offset: headerHeight * -1 });
		}
	});
}

let expandSectionElements = document.querySelectorAll('.expand-section-element');
for(let element of expandSectionElements){ // FIXME: I don't think this works in IE
	element.addEventListener('click', (event) => {
		event.preventDefault();

		let target = element.dataset.target;
		let targetElement = document.querySelector(target);
		if(targetElement.classList.contains('collapsed')){
			targetElement.classList.remove('collapsed');
			velocity(targetElement, 'slideDown', () => {
				element.textContent = element.textContent
					.replace('Show', 'Hide')
					.replace('show', 'hide');
			});
		}
		else {
			velocity(targetElement, 'slideUp', () => {
				targetElement.classList.add('collapsed');
				element.textContent = element.textContent
					.replace('Hide', 'Show')
					.replace('hide', 'show');
			});
		}
	});
}
