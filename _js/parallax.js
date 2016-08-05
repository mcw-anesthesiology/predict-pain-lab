import debounce from 'lodash/debounce';
import { isInView } from './element-in-view.js';

const header = document.querySelector('.site-header');
const containers = Array.from(document.querySelectorAll('.parallax-container'));
let headerHeight = header.clientHeight;
let innerHeight = window.innerHeight;
let previousScroll = window.scrollY;

const parallaxes = containers.map((container) => {
	let containerRect = container.getBoundingClientRect();
	let image = container.querySelector('.parallax-image');
	let imageRect = image.getBoundingClientRect();
	return {
		container: container,
		containerRect: {
			top: containerRect.top,
			bottom: containerRect.bottom,
			height: containerRect.height,
			left: containerRect.left,
			right: containerRect.right,
			width: containerRect.width
		},
		image: image,
		imageRect: {
			top: imageRect.top,
			bottom: imageRect.bottom,
			height: imageRect.height,
			left: imageRect.left,
			right: imageRect.right,
			width: imageRect.width
		},
		translateY: 0,
		scrollMultiplier: imageRect.height - containerRect.height,
		inView: false
	};
});

window.addEventListener('resize', debounce(() => {
	headerHeight = header.clientHeight;
	innerHeight = window.innerHeight;
}, 100));

// window.addEventListener('scroll', () => {
// 	window.requestAnimationFrame(updateParallaxes);
// });

window.requestAnimationFrame(updateParallaxes);

function updateParallaxes(){
	let scrollDelta = window.scrollY - previousScroll;
	if(scrollDelta === 0){
		window.requestAnimationFrame(updateParallaxes);
		return;
	}

	previousScroll = window.scrollY;

	for(let parallax of parallaxes){
		parallax.containerRect.top -= scrollDelta;
		parallax.containerRect.bottom -= scrollDelta;
		parallax.imageRect.top -= scrollDelta;
		parallax.imageRect.bottom -= scrollDelta;

		parallax.inView = isInView(parallax.container, parallax.containerRect);
		if(parallax.inView){
			let parallaxRect = {
				top: 0 - parallax.containerRect.height + headerHeight,
				bottom: innerHeight
			};
			parallaxRect.height = parallaxRect.bottom - parallaxRect.top;

			if(parallax.containerRect.top >= parallaxRect.top && parallax.containerRect.top <= parallaxRect.bottom){
				let scrolledValue = (parallaxRect.bottom - parallax.containerRect.top) / parallaxRect.height;
				parallax.translateY = Math.round(scrolledValue * parallax.scrollMultiplier);
				parallax.image.style.setProperty('transform',
					`translate3d(-50%, ${parallax.translateY}px, 0px)`);
			}
		}
	}

	window.requestAnimationFrame(updateParallaxes);
}
