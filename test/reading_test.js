const assert = require('assert');
const User = require('../src/user');

describe('Reading users from the database', (done) => {
	let juan ;

	beforeEach((done) => {
		juan = new User({name: 'Juan'});
		juan.save()
				.then(() => done());
	});

	it('finds all users with a name of juan', (done) => {
			User.find({name: 'Juan'})
					.then((users) => {
						assert(users[0]._id.toString() === juan._id.toString());
						done();
					});
	});

	it('finds a users with a particular id', (done) => {
			User.findOne({_id: juan._id})
					.then((user) => {
						assert(user.name === 'Juan');
						done();
					});
	});
});