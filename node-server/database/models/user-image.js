// app/models/user.js
// load the things we need
var mongoose = require('mongoose');


var userImage = mongoose.Schema({
    itemName : String,
    itemGroup : String
});



// create the model for users and expose it to our app
module.exports = mongoose.model(process.env.DATABASE_ID+'user-image', userImage);
