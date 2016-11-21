/* global google */
import Flickity from 'flickity';
import 'flickity/dist/flickity.css';

import { PRIMARY_COLOR } from './constants.js';

const carousel = document.querySelector('#choose-mke-attractions');

if(carousel){
	const flickity = new Flickity(carousel, {
		wrapAround: true
	});

	window.addEventListener('load', () => {
		flickity.resize();
	});
	
	let slideLinks = Array.from(document.getElementsByClassName('slick-slide-link'));
	for(let slideLink of slideLinks){
		slideLink.addEventListener('click', function(){
			flickity.select(this.dataset.slideIndex);
		});
	}
}

// FIXME: Make this better
window.initMap = () => {
	const painCenter = {
		lat: 43.0422999,
		lng: -88.0502617
	};

	let map = new google.maps.Map(document.getElementById('milwaukee-map'), {
		center: {
			lat: 43.0429319,
			lng: -87.9709897
		},
		zoom: 13,
		styles: [
			{
				'featureType': 'administrative',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'color': '#444444'
					}
				]
			},
			{
				'featureType': 'landscape',
				'elementType': 'all',
				'stylers': [
					{
						'color': '#f2f2f2'
					}
				]
			},
			{
				'featureType': 'poi',
				'elementType': 'all',
				'stylers': [
					{
						'visibility': 'off'
					}
				]
			},
			{
				'featureType': 'road',
				'elementType': 'all',
				'stylers': [
					{
						'saturation': -100
					},
					{
						'lightness': 45
					}
				]
			},
			{
				'featureType': 'road.highway',
				'elementType': 'all',
				'stylers': [
					{
						'visibility': 'simplified'
					}
				]
			},
			{
				'featureType': 'road.arterial',
				'elementType': 'labels.icon',
				'stylers': [
					{
						'visibility': 'off'
					}
				]
			},
			{
				'featureType': 'transit',
				'elementType': 'all',
				'stylers': [
					{
						'visibility': 'off'
					}
				]
			},
			{
				'featureType': 'water',
				'elementType': 'all',
				'stylers': [
					{
						'color': PRIMARY_COLOR
					},
					{
						'visibility': 'on'
					}
				]
			}
		]
	});

	new google.maps.Marker({
		position: painCenter,
		map: map,
		title: 'MCW Pain Management Center'
	});
};
