const assert = require('assert');
const User = require('../src/user');

describe('Subdocument', () => {
	it('can create a subdocument', (done) => {
			const juan = new User({
				name: 'Juan',
				posts: [{title: 'Hello World'}]
			});

			juan.save()
					.then(() => User.findOne({name: 'Juan'}))
					.then((user) => {
						assert(user.posts[0].title === 'Hello World');
						done();
					}); 
	});

	it('Can add subdocuments to an existing record', (done) => {
			const juan = new User({
				name: 'Juan',
				posts: []
			});

			juan.save()
					.then(() => User.findOne({name: 'Juan'}))
					.then((user) => {
						user.posts.push({title: 'New Post'});
						return user.save();
					})
					.then(() => User.findOne({name: 'Juan'}))
					.then((user) => {
						assert(user.posts[0].title === 'New Post');
						done();
					})
	});

	// after a removal of a subdocument, we still have to manually
	// call save() on the parent record (the 'user' in this case)

	it('Can remove an existing subdocument', (done) => {
			const juan = new User({
				name: 'Juan',
				posts: [{title: 'Hello World'}]
			});
			juan.save()
					.then(() => User.findOne({name: 'Juan'}))
					.then((user) => {
						const post = user.posts[0];
						post.remove();
						return user.save();
					})
					.then(() => User.findOne({name: 'Juan'}))
					.then((user) => {
						assert(user.posts.length === 0);
						done();
					});
	});
});

// virtual type (or virtual field) refers to any type of property
// that does not actually get saved to our MongoDB database









