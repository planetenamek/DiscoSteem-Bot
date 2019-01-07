var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    id: Number,
	author: String,
	permlink: String,
	created: Date,
	saved_the: Date,
	curator : String,
	reputation: Number,
	msg_id    : String,
	upvote_value: Number,
	upvote_weigth: Number,
	upvoted : Boolean
});


exports.ArticleSchema = ArticleSchema