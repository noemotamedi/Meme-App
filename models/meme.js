// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var memeSchema = new Schema({
    meme: String,
    user: String
});

// methods ======================
// generating a hash


// create the model for users and expose it to our app
module.exports = mongoose.model('Meme', memeSchema);
