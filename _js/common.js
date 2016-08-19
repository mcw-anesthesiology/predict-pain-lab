import velocity from 'velocity-animate';
import debounce from 'lodash/debounce';

const header = document.querySelector('.site-header');
const main = document.querySelector('main');
const hero = document.querySelector('.hero-container');
const scrollIntoView = document.querySelector('.scroll-into-view');
let headerHeight = header.clientHeight;

fixHeader();
if(window.location.hash.length > 1){
	let target = document.querySelector(window.location.hash);
	window.requestAnimationFrame(() => {
		window.scroll(0, target.offsetTop - headerHeight);
	});
}
else if(scrollIntoView){
	window.requestAnimationFrame(() => {
		if(scrollIntoView.clientHeight < window.innerHeight - headerHeight)
			window.scroll(0, scrollIntoView.offsetTop - (window.innerHeight - scrollIntoView.clientHeight));
		else
			window.scroll(0, scrollIntoView.offsetTop - headerHeight);
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
