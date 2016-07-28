let people = document.querySelectorAll('.person');
for(let person of people){
	person.addEventListener('mouseenter', function(){
		window.requestAnimationFrame(() => {
			this.classList.add('active');
		});
	});

	person.addEventListener('mouseleave', function(){
		window.requestAnimationFrame(() => {
			this.classList.remove('active');
		});
	});
}
