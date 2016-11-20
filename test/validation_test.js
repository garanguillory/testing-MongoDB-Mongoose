const assert = require('assert');
const User = require('../src/user');

// call done(); for tests that are asynchronus

describe('Validating records', () => {
	it('requires a user name', () => {
			const user = new User({name: undefined});
			const validationResult = user.validateSync();
			const {message} = validationResult.errors.name;
			assert(message === 'Name is required.');
	});

	it('requires a user\'s name at least 2 characters', () => {
			const user = new User({name: 'T'});
			const validationResult = user.validateSync();
			const {message} = validationResult.errors.name;
			assert(message === 'Name must be at least 2 characters.');
	});

	it('disallows invalid records from being saved', (done) => {
			const user = new User({name: 'T'});
			user.save()
					.catch((validationResult) => {
							const {message} = validationResult.errors.name;
							assert(message === 'Name must be at least 2 characters.');
							done();
					});
	});
});