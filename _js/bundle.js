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

const header = document.querySelector('.site-header');

let stickyElements = document.querySelectorAll('.sticky');
if(stickyElements.length > 0){
	window.addEventListener('DOMContentLoaded load resize scroll',
		window.requestAnimationFrame(() => {			
			for(let stickyElement of stickyElements){
				stickSticky.bind(stickyElement)();
			}
		}));
}

function stickSticky(){
	let rect = this.getBoundingClientRect();
	let headerRect = header.getBoundingClientRect();
	if(this.classList.contains('stuck')){
		this.classList.remove('stuck');
		let unstuckRect = this.getBoundingClientRect();
		if(rect.top > unstuckRect.top)
			this.classList.add('stuck');
	}
	else {
		if(rect.top < headerRect.height){
			this.classList.add('stuck');
		}
	}
}
