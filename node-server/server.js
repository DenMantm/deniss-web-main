var express = require('express');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var  port = process.env.PORT || 80

var app = express();

//database connection

var mongoose = require('mongoose');
var configDB = 'mongodb://deniss-web-user:diamond1987@ds217138.mlab.com:17138/deniss-web'
mongoose.connect(configDB); // connect to our database


require('./expressConfig')(app);

require('./passport')();

require('./routes')(app);

app.listen(port);
console.log('Listening on port ' + port + '...');