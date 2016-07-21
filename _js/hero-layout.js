let hero = document.querySelector('.site-hero-header-container');
let header = document.querySelector('header.site-header');
let title = document.querySelector('.site-title');
const collapseMargin = 20;
const expandMargin = 30;
const expandedTitleYTranslation = 10;

const headerHeight = 50;

// FIXME: How broken will this be with js disabled?

if(title.classList.contains('expanded')
		&& (hero.getBoundingClientRect().bottom
		< title.getBoundingClientRect().bottom + collapseMargin)){
	title.classList.add('notransition');
	title.classList.remove('expanded');
	title.offsetHeight; // Trigger reflow, this is filthy
	title.classList.remove('notransition');
}

function step(){
	let heroRect = hero.getBoundingClientRect();

	if(title.classList.contains('expanded')){
		if(heroRect.bottom
				< title.getBoundingClientRect().bottom + collapseMargin){

			title.classList.remove('expanded');
		}
	}
	else {
		if(heroRect.bottom
				> (
					(document.documentElement.clientHeight / 100)
					* expandedTitleYTranslation
				) + title.getBoundingClientRect().height + expandMargin){

			title.classList.add('expanded');
		}
	}

	if(header.classList.contains('collapsed')){
		if(heroRect.bottom > headerHeight){
			header.classList.remove('collapsed');
		}
	}
	else {
		if(heroRect.bottom < headerHeight){
			header.classList.add('collapsed');
		}
	}

	window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
