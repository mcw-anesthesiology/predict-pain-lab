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
		window.history.pushState({}, '', personLink.href);
		let data = Object.assign({}, personLink.dataset, {active: true});
		data.titles = JSON.parse(data.titles);
		personDetails.set(data);
	});
});

window.personDetails = personDetails;
