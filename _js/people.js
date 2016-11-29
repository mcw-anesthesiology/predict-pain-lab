import { h, render } from 'preact';
import PersonDetails from './components/PersonDetails.js';

const peopleLinks = Array.from(document.querySelectorAll('.person > a'));
peopleLinks.map(personLink => {
	personLink.addEventListener('click', event => {
		event.preventDefault();
		window.history.pushState({}, '', personLink.href);
		const details = personLink.dataset.details;
		render(<PersonDetails {...details} />, document.querySelector('#person-details'));
	});
});
