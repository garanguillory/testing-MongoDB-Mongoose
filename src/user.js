const mongoose = require('mongoose');
const PostSchema = require('./post_schema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length >= 2 ,
			message: 'Name must be at least 2 characters.'
		},
		required: [true, 'Name is required.']
	},
	posts: [PostSchema],
	likes: Number
});

// use function instead of fat arrow to preserve 'this'
UserSchema.virtual('postCount').get(function(){
	return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;