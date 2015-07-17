// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var methodOverride = require('method-override'); //used to manipulate POST
var cookieParser = require('cookie-parser');
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
var session = require('express-session');
var passport = require('passport');

// var User       = require('./app/models/user'); NOT IN USE til database setup
var config 	   = require('./config');
var path 	   = require('path');
var uuid = require('uuid');
var authUser;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
	genid: function(req) {
		return uuid.v4() // use UUIDs for session IDs
	},
	secret: 'keyboard cat'
}))

// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method
		delete req.body._method
		return method
	}
}))

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

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

var profileRoutes = require('./app/routes/profile')(app, express);
app.use('/profile', profileRoutes);

//var updateRoutes = require('./app/routes/profile/update')(app, express);
//app.use('/profile/update', updateRoutes);

var employerRoutes = require('./app/routes/employers')(app, express);
app.use('/employers', employerRoutes);

//var apiRoutes = require('./app/routes/api')(app, express);
//app.use('/api', apiRoutes);

var apiRoutesAuth = require('./app/routes/authorize')(app, express);
app.use('/authorize', apiRoutesAuth);


//catchall to root path
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.ejs'));
});


app.listen(config.port);
console.log('Lets Code! Port ' + config.port + ' works');