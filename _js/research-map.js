import PARTNERS from '../_data/research-partners.yaml';

const map = document.getElementById('us-map');

let partnerStates = [];

for(let partner of PARTNERS){
	let state = document.getElementById(partner.state);
	state.classList.add('has-partner');
	partnerStates.push(state);
	// let convert = makeContext(state, map);

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
	let clientRect = this.getBoundingClientRect();
	let bbox = this.getBBox();
	let percentageLocation = {
		x: (event.clientX - clientRect.left) / clientRect.width,
		y: (event.clientY - clientRect.top) / clientRect.height
	};
	let svgLocation = {
		x: (percentageLocation.x * bbox.width),
		y: (percentageLocation.y * bbox.height)
	};
	console.log(svgLocation);
}

function convertStateCoordsToPixels(state, x, y){
	let mapRect = map.getBoundingClientRect();
	let convert = makeContext(state, map);

	return convert(x + mapRect.left, y + mapRect.top);
}

for(let state of partnerStates){
	state.addEventListener('click', getStateCoords);
}
