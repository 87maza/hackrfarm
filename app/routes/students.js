var config     = require('../../config');
var path = require('path');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

var LINKEDIN_CLIENT_ID = "75g8ft640v9fa3";
var LINKEDIN_CLIENT_SECRET = "JkceLYEGTziTbHMF";

var authUser;
var User = require('../models/user');
var mongoose = require('mongoose');

passport.serializeUser(function(user, done) {

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = function(app, express) {

	// // basic route for the home page
	app.get('/', function(req, res) {


		User.find({}, function(err, userList) {
			res.render('index', {
				user: req.user || {},
				users: userList || {}
			});
		});


	});

	passport.use(new LinkedInStrategy({
    clientID:     LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL:  "https://warm-basin-7635.herokuapp.com/auth/linkedin/callback",
    scope:        [ 'r_basicprofile', 'r_emailaddress'],
			passReqToCallback: true
  	},
  function(req,accessToken, refreshToken, profile, done) {
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

	  User.findOne({linkedInId : profile.id},function(err,user){
		  if(user) {
			  authUser = user;
		  } else {
			  console.log(profile);
			  authUser = new User({
				  "linkedInId": profile._json.id,
				  "name": profile.displayName,
				  "tagline": profile._json.headline,
				  "location": profile._json.location.name,
				  //"email":profile._json.email,
				  "pic": profile._json.pictureUrl,
				  "source": profile._json.publicProfileUrl
			  });

			  authUser.save(function(err) {
				  if (err) throw err;

				  console.log('User saved successfully!');
			  });

		  }
		  //req.cookie(user, authUser.name);

	  });

  }));

	app.get('/auth/linkedin',
	  passport.authenticate('linkedin', { state: 'true'  }),
	  function(req, res){
	    // The request will be redirected to LinkedIn for authentication, so this
	    // function will not be called.




	  });

	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
		successRedirect: '/students',
		failureRedirect: '/login'
	}));

	// get an instance of the express router
	var studentRouter = express.Router();

	//// middleware to use for all requests
	//studentRouter.use(function(req, res, next) {
	//	// do logging
	//	console.log('Somebody visited /students');
	//
	//	next(); // make sure we go to the next routes and don't stop here
	//});



	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/
	studentRouter.get('/', function(req, res) {
		//res.send('Broseph! welcome to our students page!');
		User.find({}, function(err, userList) {
			res.render('students', {
				user: req.user || {},
				users: userList || {}
			});
		});


	});


	return studentRouter;
};