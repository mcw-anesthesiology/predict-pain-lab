import PersonDetails from './svelte-components/PersonDetails.html';

let personDetails = new PersonDetails({
	target: document.querySelector('body'),
	data: {
		active: false
	}
});

const peopleLinks = Array.from(document.querySelectorAll('.person > a'));
peopleLinks.map(personLink => {
	personLink.addEventListener('click', event => {
		event.preventDefault();
		let data = Object.assign({}, getPersonDataset(personLink.dataset), {active: true});
		if(data.titles)
			data.titles = JSON.parse(data.titles);
		window.history.pushState(data, '', personLink.href);
		personDetails.set(data);
	});
});

window.addEventListener('popstate', event => {
	if(event.state)
		personDetails.set(event.state);
	else
		personDetails.set({active: false});
});

window.addEventListener('load', () => {
	if(window.location.search && !personDetails.get('active')){
		let personLink = document.querySelector(`.person > a[href="${window.location.search}"]`);
		if(personLink){
			let data = Object.assign({}, getPersonDataset(personLink.dataset), {active: true});
			if(data.titles)
				data.titles = JSON.parse(data.titles);
			personDetails.set(data);
		}
	}
});

function getPersonDataset(dataset){
	const properties = [
		'bio',
		'image',
		'name',
		'titles'
	];

	let obj = {};
	properties.map(prop => {
		obj[prop] = dataset[prop];
	});

	return obj;
}
