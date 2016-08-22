import { getPageData } from './utils.js';

const page = getPageData();

if(page.create_page_nav){
	let pageNav = document.querySelector(".page-nav");
	let headings = document.getElementsByTagName("h2");
	for(let i = 0; i < headings.length; i++){
		let h = headings[i];
		let li = document.createElement("li");
		let a = document.createElement("a");
		a.href = "#" + h.id;
		a.textContent = h.textContent;
		a.classList.add('internal-link');
		li.appendChild(a);
		pageNav.appendChild(li);
	}
}
