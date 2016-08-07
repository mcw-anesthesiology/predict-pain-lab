let headerHeight = document.querySelector('.site-header').clientHeight;

export function isInView(element, rect = element.getBoundingClientRect()){
	return (rect.bottom > headerHeight && rect.top < window.innerHeight
		&& rect.right > 0 && rect.left < window.innerWidth);
}
