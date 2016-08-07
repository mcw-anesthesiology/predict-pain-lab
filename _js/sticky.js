import debounce from 'lodash/debounce';
import { isInView } from './utils.js';

const header = document.querySelector('.site-header');
let headerRect = header.getBoundingClientRect();

window.addEventListener('resize', debounce(() => {
	headerRect = header.getBoundingClientRect();
}, 100));

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
	let parent = element.parentElement;
	if(!isInView(parent))
		return;

	if(element.classList.contains('stuck')){
		element.classList.remove('stuck');
		element.style.top = null;
	}

	if(element.classList.contains('stuck-bottom')){
		element.classList.remove('stuck-bottom');
		element.style.bottom = null;
	}

	let rect = element.getBoundingClientRect();
	let parentRect = parent.getBoundingClientRect();

	if(rect.top < headerRect.height + stickyMargin){
		if(parentRect.bottom >= rect.height + headerRect.height + stickyMargin){
			element.classList.add('stuck');
			element.style.top = `${headerRect.height + stickyMargin}px`;
			element.style.bottom = null;
		}
		else {
			element.classList.add('stuck-bottom');
			parent.style.position = 'relative';
			element.style.top = null;
			element.style.bottom = `${stickyMargin}px`;
		}
	}

}
