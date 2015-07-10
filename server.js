// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
var passport = require('passport');
// var User       = require('./app/models/user'); NOT IN USE til database setup
var config 	   = require('./config');
var path 	   = require('path');

app.use(passport.initialize());
app.use(passport.session());

// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console 
app.use(morgan('dev'));
mongoose.connect(config.database); 
// // connect to our database (hosted on modulus.io via config.js)


// ROUTES FOR OUR students/employers

var studentRoutes = require('./app/routes/students')(app, express);
app.use('/students', studentRoutes);

var employerRoutes = require('./app/routes/employers')(app, express);
app.use('/employers', employerRoutes);


//catchall to root path
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.listen(config.port);
console.log('Lets Code! Port ' + config.port + ' works');