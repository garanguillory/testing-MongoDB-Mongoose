const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
	it('saves a user', (done) => {
		const juan = new User({name: 'Juan'});
		juan.save()
				.then(() => {
					// Has juan been succesfully saved?
					assert(!juan.isNew);
					done();
				});
	});
});