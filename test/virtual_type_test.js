const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
	it('postCount returns number of posts', (done) => {
			const miguel = new User({
				name: 'Miguel',
				posts: [{title: 'Hello World'}]
			});

			miguel.save()
						.then(User.findOne({name: 'Miguel'}))
						.then((user) => {
							assert(miguel.postCount === 1);
							done();
						})
	});
});