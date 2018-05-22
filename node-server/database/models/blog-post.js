// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var blogElement = mongoose.Schema({
        id       : String,
        type     : String,
        style    : String,
        text     : Object,
        img: String
});



var blogPost = mongoose.Schema({
        title        : String,
        description  : String,
        date         : String,
        author       : String,
        blogElements : [blogElement],
        isPosted     : Boolean,
        isDeleted    : Boolean,
        background:Object
});


blogPost.methods.nextId = function(obj) {
    //do something to get next one
};

// create the model for users and expose it to our app
module.exports = mongoose.model(process.env.DATABASE_ID+'BlogCollection', blogPost);
