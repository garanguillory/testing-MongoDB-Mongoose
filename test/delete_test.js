const assert = require('assert');
const User = require('../src/user');

// Model Class = User
// Model Instance = juan

describe('Deleting a user', () => {
	let juan ;

	beforeEach((done) => {
		juan = new User({name: 'Juan'});
		juan.save()
				.then(() => done());
	});

	function assertName(operation, done){
		operation
			.then(() => User.findOne({name: 'Juan'}))
			.then((user) => {
				assert(user === null);
				done();
			});
	}

	it('model instance remove', (done) => {
			assertName(juan.remove(), done);
	});

	it('class method remove', (done) => {
			assertName(User.remove({name: 'Juan'}), done);
	});

	it('class method findOneAndRemove', (done) => {
			assertName(User.findOneAndRemove({name: 'Juan'}), done);
	});

	it('class method findByIdAndRemove', (done) => {
			assertName(User.findByIdAndRemove(juan._id), done);
	});
});




