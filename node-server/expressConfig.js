var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    path = require('path');

var rootPath = path.normalize(__dirname + '/../');

module.exports = function(app) {
  // app.use(logger('tiny'));
  //app.use(cookieParser());

app.use(bodyParser.json({
    limit: '16mb'
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '16mb'
}));

  app.use(session({
    secret: 'multi vision unicorns', 
    resave:false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(express.static(rootPath));
  app.use(bodyParser({uploadDir:'/path/to/temporary/directory/to/store/uploaded/files'}));
  
  app.use('/events', express.static(rootPath));
}