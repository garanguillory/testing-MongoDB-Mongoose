const assert = require('assert');
const User = require('../src/user');

// Model Class = User
// Model Instance = juan
// when you call 'set' , no update is performed
// solely in memory (to persist changes performed with
// 'set' use the save method afterwards)

describe('Deleting a user', () => {
	let juan ;

	beforeEach((done) => {
		juan = new User({name: 'Juan', likes: 0});
		juan.save()
				.then(() => done());
	});

	function assertName(operation, done){
		operation
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alejandro');
				done();
			});
	}

	it('model instance type using set n save', (done) => {
			juan.set('name', 'Alejandro');
			assertName(juan.save(), done);
	});

	it('A model instance can update', (done) => {
			assertName(juan.update({name: 'Alejandro'}), done);
	});

	it('A model class can update', (done) => {
			assertName(
				User.update({name: 'Juan'}, {name: 'Alejandro'}),
				done
			);
	});

	it('A model class can update one record', (done) => {
			assertName(
				User.findOneAndUpdate({name: 'Juan'}, {name: 'Alejandro'}),
				done
			);	
	});

	it('A model class can find a record with an Id and update', (done) => {
			assertName(
				User.findByIdAndUpdate(juan._id, {name: 'Alejandro'}),
				done
			)
	});

	it('A user can have their likes incremented by 1', (done) => {
			User.update({name: 'Juan'}, {$inc: {likes: 1}})
					.then(() => User.findOne({name: 'Juan'}))
					.then((user) => {
						assert(user.likes === 1);
						done();
					})
	});
});




