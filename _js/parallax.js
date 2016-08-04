const header = document.querySelector('.site-header');
const containers = document.querySelectorAll('.parallax-container');

for(let event of ['resize', 'scroll']){
	window.addEventListener(event, () => {
		window.requestAnimationFrame(parallaxStep);
	});
}

window.requestAnimationFrame(parallaxStep);

function parallaxStep(){
	const innerHeight = window.innerHeight;
	const headerRect = header.getBoundingClientRect();

	for(let container of containers){
		const rect = container.getBoundingClientRect();

		let parallaxRect = {
			top: 0 - rect.height + headerRect.height,
			bottom: innerHeight
		};
		parallaxRect.height = parallaxRect.bottom - parallaxRect.top;

		if(rect.top >= parallaxRect.top && rect.top <= parallaxRect.bottom){
			let scrolledValue = (parallaxRect.bottom - rect.top) / parallaxRect.height;
			let image = container.querySelector('.parallax-image');
			let imageRect = image.getBoundingClientRect();
			let parallaxScrollMultiplier = imageRect.height - rect.height;

			image.style.setProperty('transform', `translate3d(-50%, ${Math.round(parallaxScrollMultiplier * scrolledValue)}px, 0px)`);
		}
	}
}
