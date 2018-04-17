// app/models/user.js
// load the things we need
var mongoose = require('mongoose');


var addedPage = mongoose.Schema({
    title : String,
    name : String, // title, simple
    modulePath : String,
    moduleName : String,
});



// create the model for users and expose it to our app
module.exports = mongoose.model(process.env.DATABASE_ID + 'addedPage', addedPage);
