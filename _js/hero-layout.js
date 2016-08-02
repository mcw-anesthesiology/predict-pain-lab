import Color from 'color';

let hero = document.querySelector('.site-hero-header-container');
let heroImageContainer = document.querySelector('.site-hero-image-container');
let header = document.querySelector('header.site-header');
let title = document.querySelector('.site-title');
let logo = document.querySelector('.site-logo');
const collapseMargin = 20;
// const expandMargin = 30;
const defaultHeroImageBackgroundPositionY = parseFloat(window.getComputedStyle(heroImageContainer).getPropertyValue('background-position-y'));
const heroParallaxScrollMultiplier = 8;

let initialHeroBackgroundColor = hero.style.backgroundColor;
hero.style.backgroundColor = null;
let heroBackgroundColor = new Color(window.getComputedStyle(hero)
	.getPropertyValue('background-color'));
if(initialHeroBackgroundColor)
	hero.style.backgroundColor = initialHeroBackgroundColor;

let isCollapsed = header.classList.contains('collapsed');
if(!isCollapsed)
	header.classList.add('collapsed');
let headerBackgroundColor = new Color(window.getComputedStyle(header)
	.getPropertyValue('background-color'));
if(!isCollapsed)
	header.classList.remove('collapsed');

let expandedTitleTranslation = window.getComputedStyle(title)
	.getPropertyValue('transform');
expandedTitleTranslation = expandedTitleTranslation
	.substring(10, expandedTitleTranslation.length -1) // 7 = 'matrix('
	.split(',');

for(let i in expandedTitleTranslation)
	expandedTitleTranslation[i] = parseFloat(expandedTitleTranslation[i]);

// FIXME: How broken will this be with js disabled?

window.requestAnimationFrame(() => {
	if(title.classList.contains('expanded')
			&& (hero.getBoundingClientRect().bottom
			< title.getBoundingClientRect().bottom + collapseMargin)){
		title.classList.add('notransition');
		title.classList.remove('expanded');
		title.offsetHeight; // Trigger reflow, this is filthy
		logo.classList.add('notransition');
		logo.classList.remove('expanded');
		logo.offsetHeight;
		header.classList.add('collapsed');
		title.classList.remove('notransition');
		logo.classList.remove('notransition');
	}
});

for(let event of ['resize', 'scroll']){
	window.addEventListener(event, () => {
		window.requestAnimationFrame(step);
	});
}

function step(){
	let heroRect = hero.getBoundingClientRect();
	let headerHeight = header.getBoundingClientRect().height;
	let newHeroColor = heroBackgroundColor.clone();

	// if(title.classList.contains('expanded')){
	// 	if(heroRect.bottom
	// 			< title.getBoundingClientRect().bottom + collapseMargin){
	//
	// 		title.classList.remove('expanded');
	// 		logo.classList.remove('expanded');
	// 	}
	// }
	// else {
	// 	if(heroRect.bottom
	// 			> expandedTitleTranslation[expandedTitleTranslation.length - 1]
	// 			+ title.getBoundingClientRect().height + expandMargin){
	//
	// 		title.classList.add('expanded');
	// 		logo.classList.add('expanded');
	// 	}
	// }

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

	let scrolledValue = (heroRect.height - heroRect.bottom) / (heroRect.height - headerHeight);
	scrolledValue = scrolledValue > 0 ? scrolledValue : 0;
	scrolledValue = scrolledValue < 1 ? scrolledValue : 1;

	newHeroColor.red(heroBackgroundColor.red() + (getColorMultiplier(scrolledValue) * (headerBackgroundColor.red() - heroBackgroundColor.red())));
	newHeroColor.green(heroBackgroundColor.green() + (getColorMultiplier(scrolledValue) * (headerBackgroundColor.green() - heroBackgroundColor.green())));
	newHeroColor.blue(heroBackgroundColor.blue() + (getColorMultiplier(scrolledValue) * (headerBackgroundColor.blue() - heroBackgroundColor.blue())));
	newHeroColor.alpha(heroBackgroundColor.alpha() + (getColorMultiplier(scrolledValue) * (headerBackgroundColor.alpha() - heroBackgroundColor.alpha())));

	hero.style.backgroundColor = newHeroColor.rgbString();

	heroImageContainer.style.setProperty('background-position-y', `${defaultHeroImageBackgroundPositionY + (scrolledValue * heroParallaxScrollMultiplier)}%`);
}

function getColorMultiplier(scrolledValue){
	if(scrolledValue < 0.75)
		return 0;

	return Math.pow((scrolledValue - 0.75) * 4, 2);
}
