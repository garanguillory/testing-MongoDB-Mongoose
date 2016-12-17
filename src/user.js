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
	likes: Number,
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
});

// use function instead of fat arrow to preserve 'this'
UserSchema.virtual('postCount').get(function(){
	return this.posts.length;
});

UserSchema.pre('remove', function(next){
	const BlogPost = mongoose.model('blogPost');
	BlogPost.remove({_id: {$in: this.blogPosts} })
					.then(() => next());
	

});

const User = mongoose.model('user', UserSchema);

module.exports = User;


// UserSchema.pre('remove', function(){
// 	const BlogPost = mongoose.model('blogPost');
// 	// this === 'juan' this is a reference to an instance of our user
// 	// this.blogPosts is an array of all the ids of all the blog posts to delete
// 	BlogPost.remove({_id: {$in: this.blogPosts} });	
//					.then(() => next());
// 	// $in: go through all the blog posts in the BlogPost collection and
// 	// look at their ids, if the id is in this.blogPosts, remove that record

// });