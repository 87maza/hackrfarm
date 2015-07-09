// var User       = require('../models/user');
// var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var path = require('path')



module.exports = function(app, express) {

	// var bodyParser = require('body-parser'); 	// get body-parser
	// // var User       = require('../models/user');
	// // var jwt        = require('jsonwebtoken');
	// // var config     = require('../../config');

	// // basic route for the home page
	app.get('/', function(req, res) {
		res.send('Welcome to the home page!');
	});

	// get an instance of the express router
	var studentRouter = express.Router();

	// middleware to use for all requests
	studentRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody visited /students');

		next(); // make sure we go to the next routes and don't stop here
	});

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	studentRouter.get('/', function(req, res) {
		res.sendFile(path.resolve(__dirname + '../../../public/app/views/index.html'));
	});

	return studentRouter;
};