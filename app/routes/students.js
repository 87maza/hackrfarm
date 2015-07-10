var config     = require('../../config');
var path = require('path');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

var LINKEDIN_CLIENT_ID = "75g8ft640v9fa3";
var LINKEDIN_CLIENT_SECRET = "JkceLYEGTziTbHMF";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = function(app, express) {

	// // basic route for the home page
	app.get('/', function(req, res) {
		res.sendFile(path.resolve(__dirname + '../../../public/app/views/index.html'));
	});

	passport.use(new LinkedInStrategy({
    clientID:     LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL:  "http://localhost:8080/auth/linkedin/callback",
    scope:        [ 'r_basicprofile', 'r_emailaddress']
  	},
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    // req.session.accessToken = accessToken;
	    process.nextTick(function () {
	      // To keep the example simple, the user's Linkedin profile is returned to
	      // represent the logged-in user.  In a typical application, you would want
	      // to associate the Linkedin account with a user record in your database,
		console.log(done);

	      // and return that user instead.
	      return done(null, profile);
	    });
	  }
	));

	app.get('/auth/linkedin',
	  passport.authenticate('linkedin', { state: 'true'  }),
	  function(req, res){
	    // The request will be redirected to LinkedIn for authentication, so this
	    // function will not be called.
	  });

	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
	  successRedirect: '/',
	  failureRedirect: '/login'
	}));

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
		res.send('Broseph! welcome to our students page!');	
	});




	return studentRouter;
};