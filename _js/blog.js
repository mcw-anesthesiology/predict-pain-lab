import lunr from 'lunr';
import debounce from 'lodash/debounce';
import find from 'lodash/find';

const search = document.getElementById('search-posts');
const searchResults = document.getElementById('search-posts-results');
const sitePosts = document.getElementById('site-posts');
const index = lunr(function(){
	this.field('title', { boost: 10 });
	this.field('tags', { boost: 5 });
	this.field('content');
});
let posts;

if(sitePosts){
	posts = JSON.parse(sitePosts.textContent)
		.filter((post) => {
			return !post.draft;
		});

	for(let post of posts){
		delete post.output;
		delete post.previous;
		delete post.next;
		index.add(post);
	}
	
	search.addEventListener('input', debounce(searchPosts, 200));
}

function searchPosts(){
	const query = this.value;
	while(searchResults.firstChild)
		searchResults.removeChild(searchResults.firstChild);

	if(query.trim().length > 0){
		let results = index.search(this.value);

		if(results.length > 0){
			for(let result of results){
				let post = find(posts, { id: result.ref });

				let searchResult = `
					<li>
						<h3>${post.title}</h3>
						<p>
							${post.excerpt}
						</p>
					</li>
				`;

				searchResults.insertAdjacentHTML('beforeend', searchResult);
			}
		}
		else {
			searchResults.insertAdjacentHTML('beforeend', '<li>No matching posts found</li>');
		}
	}
}
