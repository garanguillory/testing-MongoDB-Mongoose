const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');


describe('Middleware', () => {
	let juan, blogPost;

	beforeEach((done) => {
		juan = new User({name: 'Juan'});
		blogPost = new BlogPost({title: 'JS is Great', content: 'Okay'});

		// mongoose recognizes that entire model was pushed 
		// in to the arrays and it retains just the ObjectId
		juan.blogPosts.push(blogPost);

		Promise.all([juan.save(), blogPost.save()])
			.then(() => done());
	});

	it('users clean up dangling blogposts on remove', (done) => {
		juan.remove()
				.then(() => BlogPost.count())
				.then((count) => {
					assert(count === 0);
					done();
				});
	});
});