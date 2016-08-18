import velocity from 'velocity-animate';
import debounce from 'lodash/debounce';

const header = document.querySelector('.site-header');
const main = document.querySelector('main');
const hero = document.querySelector('.hero-container');
let headerHeight = header.clientHeight;

// FIXME: Why does this suck
window.addEventListener('load', () => {
	fixHeader();
	if(window.location.hash.length > 1){
		console.log(window.scrollY);
		window.scrollBy(0, -1 * headerHeight);
		console.log(window.scrollY);
	}
});

window.addEventListener('resize', debounce(fixHeader, 100));

function fixHeader(){
	headerHeight = header.clientHeight;
	main.style.setProperty('padding-top', `${headerHeight}px`);
	if(hero){
		hero.style.setProperty('height', `calc(100vh - ${headerHeight}px)`);
	}
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
