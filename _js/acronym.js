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
const delayOffsetSeconds = 0.125;
let termLetters = [];

if(acronym){

	window.addEventListener('load', () => {
		moveTermLetters();

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

		console.log(letter, `translate(${translate.x}px, ${translate.y}px) scale(${scale})`);
		termLetter.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`;

		termLetters.push(termLetter);
	}
}

function moveTermLettersBack(){
	let delaySeconds = 0;
	for(let termLetter of termLetters){
		termLetter.style.transition = 'translate scale';
		termLetter.style.transitionDuration = `${transitionDurationSeconds}s`;
		termLetter.style.transitionDelay = `${delaySeconds}s`;
		termLetter.style.transform = null;

		delaySeconds += delayOffsetSeconds;
	}
}
