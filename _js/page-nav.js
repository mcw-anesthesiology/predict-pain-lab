import { getPageData } from './utils.js';

const page = getPageData();

if(page.create_page_nav){
	let pageNav = document.querySelector(".page-nav");
	let headings = Array.from(document.querySelectorAll(".page-content h2"));
	for(let h of headings){
		let li = document.createElement("li");
		let a = document.createElement("a");
		a.href = "#" + h.id;
		a.textContent = h.textContent;
		a.classList.add('internal-link');
		li.appendChild(a);
		pageNav.appendChild(li);
	}
}
