import velocity from 'velocity-animate';

import './hero-layout.js';

let headingHeight = document.querySelector('.site-header')
	.getBoundingClientRect().height;

let internalLinks = document.getElementsByClassName('internal-link');
for(let link of internalLinks){
	link.addEventListener('click', function(event){
		event.preventDefault();
		let target = this.getAttribute('href');
		let targetElement = document.querySelector(target);
		velocity(targetElement, 'scroll', { offset: headingHeight * -1 });
	});
}
