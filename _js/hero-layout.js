let hero = document.querySelector('.site-hero-header-container');
let header = document.querySelector('header.site-header');
let title = document.querySelector('.site-title');
const collapseMargin = 20;
const expandMargin = 30;

let heroBackgroundColor = window.getComputedStyle(hero)
	.getPropertyValue('background-color');
let heroRgba = heroBackgroundColor.substring(5, heroBackgroundColor.length - 1) // 5 = 'rgba('
	.split(',');
for(let i in heroRgba)
	heroRgba[i] = parseFloat(heroRgba[i]);

let expandedTitleTranslation = window.getComputedStyle(title)
	.getPropertyValue('transform');
expandedTitleTranslation = expandedTitleTranslation
	.substring(10, expandedTitleTranslation.length -1) // 7 = 'matrix('
	.split(',');

for(let i in expandedTitleTranslation)
	expandedTitleTranslation[i] = parseFloat(expandedTitleTranslation[i]);

const heroStartingAlpha = heroRgba[heroRgba.length - 1];

// FIXME: How broken will this be with js disabled?

if(title.classList.contains('expanded')
		&& (hero.getBoundingClientRect().bottom
		< title.getBoundingClientRect().bottom + collapseMargin)){
	title.classList.add('notransition');
	title.classList.remove('expanded');
	header.classList.add('collapsed');
	title.offsetHeight; // Trigger reflow, this is filthy
	title.classList.remove('notransition');
}

function step(){
	let heroRect = hero.getBoundingClientRect();
	let headerHeight = header.getBoundingClientRect().height;

	if(title.classList.contains('expanded')){
		if(heroRect.bottom
				< title.getBoundingClientRect().bottom + collapseMargin){

			title.classList.remove('expanded');
		}
	}
	else {
		if(heroRect.bottom
				> expandedTitleTranslation[expandedTitleTranslation.length - 1]
				+ title.getBoundingClientRect().height + expandMargin){

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

	let newHeroAlpha = ((heroRect.height - (heroRect.bottom - headerHeight)) / heroRect.height);
	newHeroAlpha > 0 ? newHeroAlpha : 0;
	newHeroAlpha = heroStartingAlpha + (Math.pow(newHeroAlpha, 2) * (1 - heroStartingAlpha));
	heroRgba[heroRgba.length - 1] = newHeroAlpha;
	hero.style.backgroundColor = `rgba(${heroRgba.join(',')})`;

	window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
