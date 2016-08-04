const header = document.querySelector('.site-header');
const separators = document.querySelectorAll('.parallax-container');

for(let event of ['resize', 'scroll']){
	window.addEventListener(event, () => {
		window.requestAnimationFrame(parallaxStep);
	});
}

window.requestAnimationFrame(parallaxStep);

function parallaxStep(){
	const innerHeight = window.innerHeight;
	const headerRect = header.getBoundingClientRect();

	for(let separator of separators){
		const rect = separator.getBoundingClientRect();

		let parallaxRect = {
			top: 0 - rect.height + headerRect.height,
			bottom: innerHeight
		};
		parallaxRect.height = parallaxRect.bottom - parallaxRect.top;

		if(rect.top >= parallaxRect.top && rect.top <= parallaxRect.bottom){
			let scrolledValue = (parallaxRect.bottom - rect.top) / parallaxRect.height;
			let parallaxScrollMultiplier = 500 * 1.25;
			let image = separator.querySelector('.parallax-image');

			image.style.setProperty('transform', `translate3d(-50%, calc(-50% + ${parallaxScrollMultiplier * scrolledValue}px), 0px)`);
		}
	}
}
