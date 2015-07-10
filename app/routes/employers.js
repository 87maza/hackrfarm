var config     = require('../../config');
var path = require('path');
var express = require('express');
var router = express.Router();


module.exports = function(app, express) {
var employerRouter = express.Router();

	// middleware to use for all requests
	employerRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody visited /employers');

		next(); // make sure we go to the next routes and don't stop here
	});

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	employerRouter.get('/', function(req, res) {
		res.send('Broseph! welcome to our employers page!');	
	});

	return employerRouter;
};