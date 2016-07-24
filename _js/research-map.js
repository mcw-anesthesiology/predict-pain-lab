import debounce from 'lodash/debounce';

import PARTNERS from '../_data/research_partners.yaml';
import STAR from '../_includes/svgs/star.svg';

const map = document.getElementById('us-map');
const mapContainer = document.getElementById('map-container');
const starContainer = document.getElementById('star-container');

let mapContainerRect  = mapContainer.getBoundingClientRect();
let partnerStates = [];

for(let partner of PARTNERS){
	let state = document.getElementById(partner.state);
	state.classList.add('has-partner');
	partnerStates.push(state);

	starContainer.insertAdjacentHTML('beforeend',
		`<a href="${partner.url}" class="map-star notransition"
		data-partner-name="${partner.name}">${STAR}</a>`);
	let stars = starContainer.querySelectorAll('.map-star');
	let newStar = stars[stars.length - 1];
	let starPos = convertStateCoordsToPixels(state, partner.coordinates.x, partner.coordinates.y);
	newStar.style.left = `${starPos.x - mapContainerRect.left}px`;
	newStar.style.top = `${starPos.y - mapContainerRect.top}px`;
	newStar.offsetHeight; // force reflow
	newStar.classList.remove('notransition');
}

window.addEventListener('resize', debounce(adjustPartnerCoordinates, 100));

let stars = document.querySelectorAll('.map-star');
for(let star of stars){
	star.addEventListener('mouseenter', function(){
		let partnerListItem = document.querySelector(`.partners-list-item[data-partner-name="${this.getAttribute('data-partner-name')}"]`);
		let partnerRect = partnerListItem.getBoundingClientRect();
		let starRect = this.getBoundingClientRect();

		// TODO: Make sure it's on screen afterward, only do it on big screens
		let translation = {
			x: (starRect.left - partnerRect.left) - (partnerRect.width / 2 - starRect.width / 2),
			y: (starRect.top - partnerRect.top) - partnerRect.height
		};

		window.requestAnimationFrame(() => {
			partnerListItem.classList.add('active');
			partnerListItem.style.transform = `translate(${translation.x}px, ${translation.y}px)`;
		});
	});

	star.addEventListener('mouseout', function(){
		let partnerListItem = document.querySelector(`.partners-list-item[data-partner-name="${this.getAttribute('data-partner-name')}"]`);

		window.requestAnimationFrame(() => {
			partnerListItem.classList.remove('active');
			partnerListItem.style.transform = null;
		});
	});
}

function adjustPartnerCoordinates(){
	mapContainerRect  = mapContainer.getBoundingClientRect();
	for(let partner of PARTNERS){
		let state = document.getElementById(partner.state);
		let star = document.querySelector(`.map-star[data-partner-name="${partner.name}"]`);
		let starPos = convertStateCoordsToPixels(state, partner.coordinates.x, partner.coordinates.y);
		star.style.left = `${starPos.x - mapContainerRect.left}px`;
		star.style.top = `${starPos.y - mapContainerRect.top}px`;
	}
}


function makeContext(element, svgDocument, absolute = true){
	return function(x, y){
		const offset = svgDocument.getBoundingClientRect();
		const matrix = absolute ? element.getScreenCTM() : element.getCTM();
		return {
			x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
			y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
		};
	};
}

function getStateCoords(event){
	let stateCoords = convertPixelsToStateCoords(this, event.clientX, event.clientY);
	console.log(event.clientX, event.clientY);
	console.log(stateCoords);
	console.log(convertStateCoordsToPixels(this, stateCoords.x, stateCoords.y));
}

function convertPixelsToStateCoords(state, x, y){
	let clientRect = state.getBoundingClientRect();
	let bbox = state.getBBox();
	let percentageLocation = {
		x: (x - clientRect.left) / clientRect.width,
		y: (y - clientRect.top) / clientRect.height
	};
	let svgLocation = {
		x: (percentageLocation.x * bbox.width),
		y: (percentageLocation.y * bbox.height)
	};
	return svgLocation;
}

function convertStateCoordsToPixels(state, x, y){
	let mapRect = map.getBoundingClientRect();
	let stateBox = state.getBBox();
	let convert = makeContext(state, map);

	let statePixels = convert(stateBox.x + x, stateBox.y + y);
	return {
		x: mapRect.left + statePixels.x,
		y: mapRect.top + statePixels.y
	};
}

for(let state of partnerStates){
	state.addEventListener('click', getStateCoords);
}
