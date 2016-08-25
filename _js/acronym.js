import { isInView } from './utils.js';

const letters = [
	'p',
	'r',
	'e',
	'd',
	'i',
	'c',
	't'
];
const acronym = document.querySelector('.predict-acronym');
const transitionDurationSeconds = 0.2;
const delayOffsetSeconds = 0.4;
const smallTransitionDurationSeconds = 1;
let letterElements = {};

if(acronym && isInView(acronym)){
	moveTermLetters();

	window.addEventListener('load', () => {
		window.requestAnimationFrame(moveTermLettersBack);
	});
}

function moveTermLetters(){
	for(let letter of letters){
		const termLetter = acronym.querySelector(`h1 .${letter}`);
		const definitionLetter = acronym.querySelector(`figcaption .${letter}`);

		// FIXME: Why is this necessary?
		let offset = {
			x: 0,
			y: -2
		};

		let termStyle = window.getComputedStyle(termLetter);
		let definitionStyle = window.getComputedStyle(definitionLetter);
		let scale = (parseInt(definitionStyle.getPropertyValue('font-size'), 10) / parseInt(termStyle.getPropertyValue('font-size'), 10));
		let definitionLetterString = definitionLetter.textContent.charAt(0);
		if(definitionLetterString === definitionLetterString.toLowerCase()){
			scale = scale * 0.7;
			offset.y = -6;
		}
		termLetter.style.display = 'inline-block';
		termLetter.style.transform = `scale(${scale})`;

		let termRect = termLetter.getBoundingClientRect();
		let definitionRect = definitionLetter.getBoundingClientRect();
		let translate = {
			x: definitionRect.left - termRect.left,
			y: (definitionRect.bottom - termRect.bottom) + offset.y
		};

		termLetter.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`;
		definitionLetter.style.opacity = 0;

		letterElements[letter] = {
			termLetter,
			definitionLetter
		};
	}

	let small = acronym.querySelector('h1 small');
	small.style.opacity = 0;
}

function moveTermLettersBack(){
	let delaySeconds = 1;

	for(let letter of letters){
		let termLetter = letterElements[letter].termLetter;
		let definitionLetter = letterElements[letter].definitionLetter;

		termLetter.style.transition = 'translate scale opacity';
		termLetter.style.transitionDuration = `${transitionDurationSeconds}s`;
		termLetter.style.transitionDelay = `${delaySeconds}s`;
		definitionLetter.style.transition = 'opacity';
		definitionLetter.style.transitionDuration = '0';
		definitionLetter.style.transitionDelay = `${delaySeconds}s`;

		termLetter.style.transform = null;
		termLetter.style.opacity = null;
		definitionLetter.style.opacity = null;

		window.setTimeout(() => {
			termLetter.style.display = null;
		}, (delaySeconds + transitionDurationSeconds) * 1000);

		delaySeconds += delayOffsetSeconds;
	}

	let small = acronym.querySelector('h1 small');
	small.style.transition = 'opacity';
	small.style.transitionDuration = `${smallTransitionDurationSeconds}s`;
	small.style.transitionDelay = `${delaySeconds}s`;
	small.style.transitionTimingFunction = 'ease-in';
	small.style.opacity = null;
}
