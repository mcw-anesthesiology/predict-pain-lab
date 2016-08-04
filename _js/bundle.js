import velocity from 'velocity-animate';

import './blog.js';
import './choose-mke.js';
import './element-in-view.js';
import './home.js';
import './people.js';
import './parallax.js';
import './research-map.js';
import './sticky.js';

let headingHeight = document.querySelector('.site-header')
	.getBoundingClientRect().height;

let internalLinks = document.getElementsByClassName('internal-link');
for(let link of internalLinks){ // FIXME: I don't think this works in IE
	link.addEventListener('click', function(event){
		let target = this.getAttribute('href');
		if(target.charAt(0) === "#"){
			event.preventDefault();
			if(target === '#')
			target = 'body';
			let targetElement = document.querySelector(target);
			velocity(targetElement, 'scroll', { offset: headingHeight * -1 });
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
			velocity(targetElement, 'slideDown', () => {
				targetElement.classList.remove('collapsed');
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
