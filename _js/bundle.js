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
	for(let event of ['load', 'resize', 'scroll']){
		window.addEventListener(event, () => {
			window.requestAnimationFrame(() => {
				for(let stickyElement of stickyElements){
					stickSticky(stickyElement);
				}
			});
		});
	}
}

function stickSticky(element){
	const stickyMargin = 10;

	if(element.classList.contains('stuck')){
		element.classList.remove('stuck');
		element.style.top = null;
	}

	let rect = element.getBoundingClientRect();
	let headerRect = header.getBoundingClientRect();

	if(rect.top < headerRect.height + stickyMargin){
		element.classList.add('stuck');
		element.style.top = `${headerRect.height + stickyMargin}px`;
	}
}
