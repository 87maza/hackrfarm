// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
// var User       = require('./app/models/user'); NOT IN USE til database setup
var config 	   = require('./config');
var path 	   = require('path');

// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
// // connect to our database (hosted on modulus.io)
// mongoose.connect('mongodb://john:john@apollo.modulusmongo.net:27017/ubU8texe'); 



// ROUTES FOR OUR API
// ======================================

var studentRoutes = require('./app/routes/students')(app, express);
app.use('/students', studentRoutes);

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// on routes that end in /users
// // ----------------------------------------------------
// studentRouter.route('/students')

// 	// create a student (accessed at POST http://localhost:8080/users)
// 	.post(function(req, res) {
		
// 		var john = new Student();		// create a new instance of the User model
// 		user.name = req.body.name;  // set the users name (comes from the request)
// 		user.username = req.body.username;  // set the users username (comes from the request)
// 		user.password = req.body.password;  // set the users password (comes from the request)

// 		user.save(function(err) {
// 			if (err) {
// 				// duplicate entry
// 				if (err.code == 11000) 
// 					return res.json({ success: false, message: 'A user with that username already exists. '});
// 				else 
// 					return res.send(err);
// 			}

// 			// return a message
// 			res.json({ message: 'User created!' });
// 		});

// 	})

// 	// get all the users (accessed at GET http://localhost:8080/api/users)
// 	.get(function(req, res) {
// 		User.find(function(err, users) {
// 			if (err) return res.send(err);

// 			// return the users
// 			res.json(users);
// 		});
// 	});

// // on routes that end in /users/:user_id
// // ----------------------------------------------------
// apiRouter.route('/users/:user_id')

// 	// get the user with that id
// 	.get(function(req, res) {
// 		User.findById(req.params.user_id, function(err, user) {
// 			if (err) return res.send(err);

// 			// return that user
// 			res.json(user);
// 		});
// 	})

// 	// update the user with this id
// 	.put(function(req, res) {
// 		User.findById(req.params.user_id, function(err, user) {

// 			if (err) return res.send(err);

// 			// set the new user information if it exists in the request
// 			if (req.body.name) user.name = req.body.name;
// 			if (req.body.username) user.username = req.body.username;
// 			if (req.body.password) user.password = req.body.password;

// 			// save the user
// 			user.save(function(err) {
// 				if (err) return res.send(err);

// 				// return a message
// 				res.json({ message: 'User updated!' });
// 			});

// 		});
// 	})

// 	// delete the user with this id
// 	.delete(function(req, res) {
// 		User.remove({
// 			_id: req.params.user_id
// 		}, function(err, user) {
// 			if (err) return res.send(err);

// 			res.json({ message: 'Successfully deleted' });
// 		});
// 	});

// REGISTER OUR ROUTES -------------------------------
// app.use('/students', studentRouter);

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Good to go! Port ' + config.port + ' works');