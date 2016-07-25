import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

$('#choose-mke-attractions').slick();

let slideLinks = document.getElementsByClassName('slick-slide-link');
for(let slideLink of slideLinks){
	slideLink.addEventListener('click', function(){
		$("#choose-mke-attractions")
			.slick('slickGoTo', this.dataset.slideIndex);
	});
}
