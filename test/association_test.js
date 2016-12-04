const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');





describe('Associations', () => {
	let juan, blogPost, comment;

	beforeEach((done) => {
		juan = new User({name: 'Juan'});
		blogPost = new BlogPost({title: 'JS is Great', content: 'Okay'});
		comment = new Comment({content: 'Great read.'});

		// mongoose recognizes that entire model was pushed 
		// in to the arrays and it retains just the ObjectId
		juan.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = juan;	 // mongoose magically has a reference assigned to 'juan'

		Promise.all([juan.save(), blogPost.save(), comment.save()])
			.then(() => done());
	});

	it('saves a relation between a user and a blogpost', (done) => {
		User.findOne({name: 'Juan'})
				.populate('blogPosts')
				.then((user) => {
					// console.log(user.blogPosts[0]);
					assert(user.blogPosts[0].title === 'JS is Great');
					done();
				});
	});

	it('saves a full relation graph', (done) => {
		User.findOne({name: 'Juan'})
				.populate({
					path: 'blogPosts',
					populate: {
						path: 'comments',
						model: 'comment',
						populate: {
							path: 'user',
							model: 'user'
						}
					}
				})
				.then((user) => {
					// console.log(user.blogPosts[0].comments[0]);
					assert(user.name === 'Juan');
					assert(user.blogPosts[0].title === 'JS is Great');
					assert(user.blogPosts[0].comments[0].content === 'Great read.');
					assert(user.blogPosts[0].comments[0].user.name === 'Juan');
					done();
				});
	});

});
















