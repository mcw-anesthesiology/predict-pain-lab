import './page-nav.js';

import debounce from 'lodash/debounce';
import velocity from 'velocity-animate';

const header = document.querySelector('.site-header');
const main = document.querySelector('main');
const hero = document.querySelector('.hero-container');
let headerHeight = header.clientHeight;

fixHeader();
if(window.location.hash.length > 1){
	let target = document.querySelector(window.location.hash);
	window.requestAnimationFrame(() => {
		window.scroll(0, target.offsetTop - headerHeight);
	});
}

window.addEventListener('resize', debounce(fixHeader, 100));

function fixHeader(){
	headerHeight = header.clientHeight;
	main.style.setProperty('padding-top', `${headerHeight}px`);
	if(hero){
		hero.style.setProperty('height', `calc(100vh - ${headerHeight}px)`);
	}
}

const scrollToContent = document.querySelector('.scroll-to-content');
if(scrollToContent){
	scrollToContent.addEventListener('click', () => {
		velocity(hero, 'scroll', { offset: hero.clientHeight - headerHeight });
	});
}

let internalLinks = Array.from(document.getElementsByClassName('internal-link'));
for(let link of internalLinks){
	link.addEventListener('click', function(event){
		let target = this.getAttribute('href');
		if(target.charAt(0) === "#"){
			event.preventDefault();
			if(target === '#')
				target = 'body';
			let targetElement = document.querySelector(target);
			velocity(targetElement, 'scroll', { offset: headerHeight * -1, complete: function(){
				if(window.history.replaceState && target.charAt(0) === '#'){
					window.history.replaceState({}, '', target);
				}
			}});
		}
	});
}

let expandSectionElements = Array.from(document.querySelectorAll('.expand-section-element'));
for(let element of expandSectionElements){
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

let ignoredAnchors = Array.from(document.querySelectorAll('.ignore-click'));
for(let anchor of ignoredAnchors){
	anchor.addEventListener('click', event => {
		event.preventDefault();
	});
}
