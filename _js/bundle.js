import velocity from 'velocity-animate';

import './hero-layout.js';
// import './blog.js';
import './choose-mke.js';
import './home.js';
import './people.js';
import './research-map.js';

let headingHeight = document.querySelector('.site-header')
	.getBoundingClientRect().height;

let internalLinks = document.getElementsByClassName('internal-link');
for(let link of internalLinks){
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
