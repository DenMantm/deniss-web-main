// app/models/user.js
// load the things we need
var mongoose = require('mongoose');


var templateItemList = mongoose.Schema({
    itemName : String,
    itemType : String, // title, simple
    itemGroup : String,
    description : String,
    image : String,
    sequence : Number,
    tempData : Object
});


templateItemList.methods.nextId = function(obj) {
    //do something to get next one
};

// create the model for users and expose it to our app
module.exports = mongoose.model('templateItemList', templateItemList);
