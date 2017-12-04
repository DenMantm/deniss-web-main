// app/models/user.js
// load the things we need
var mongoose = require('mongoose');


var templateItemPage = mongoose.Schema({
    itemPage : String,
    itemName : String,
    itemType : String, // title, simple
    sequence : Number,
    data : []
});

templateItemPage.methods.nextId = function(obj) {
    //do something to get next one
};

// create the model for users and expose it to our app
module.exports = mongoose.model(process.env.DATABASE_ID+'templateItemPage', templateItemPage);
