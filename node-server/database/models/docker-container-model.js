// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model

var dockerContainer = mongoose.Schema({
        containerName: String,
        containerStatus : Boolean,
        containerId  : String,
        shortId      : String,
        description  : String,
        domainName   : String,
        date         : Date,
        belongsToUser: String,
        isSelected:Boolean,
        identificationId:String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('DockerContainerCollection', dockerContainer);
