// app/models/user.js
// load the things we need
var mongoose = require('mongoose');


var pageData = mongoose.Schema({
        background: Object,
        includeInNav  : Boolean,
        navName       : String,
        elementSequence : Number,
        elementTmpName : String,
        elementTmpType : String,
        title:Object,
        data     : Object
});


var Page = mongoose.Schema({
    pageName : String,
    navbarElement : Object,
    footer : Object, // title, simple
    pageType : String,
    pageLayout : String,
    pageData : [pageData]
});



Page.methods.nextId = function(obj) {
    //do something to get next one
};

// create the model for users and expose it to our app
module.exports = mongoose.model(process.env.DATABASE_ID+'Page', Page);
