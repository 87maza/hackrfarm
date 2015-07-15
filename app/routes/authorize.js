var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var path = require('path');
var express = require('express');
var router = express.Router();


module.exports = function(app, express) {
    var authorizeRouter = express.Router();

    // middleware to use for all requests
    authorizeRouter.use(function(req, res, next) {
        // do logging
        console.log('Somebody visited /authorize!');

        next(); // make sure we go to the next routes and don't stop here
    });

    // route to authenticate a user (POST http://localhost:8080/auth)
    authorizeRouter.post('/', function(req, res) {
        // find the user
      //  var user  = User.findOne( {name: } )//({
        //    username: req.body.username
        //}).select('name username password').exec(function(err, user) {
        //
        //    if (err) throw err;
            //
            //// no user with that username was found
            //if (!user) {
            //    res.json({
            //        success: false,
            //        message: 'Authentication failed. User not found.'
            //    });
            //} else if (user) {
            //
            //    // check if password matches
            //    var validPassword = user.comparePassword(req.body.password);
            //    if (!validPassword) {
            //        res.json({
            //            success: false,
            //            message: 'Authentication failed. Wrong password.'
            //        });
               // }}
        //if(user) {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({

                        //name: user.name,
                        //username: user.username
                    }, superSecret, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    console.log('hello');
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                //}

            //}

      //  });
    });

    // route middleware to verify a token
    authorizeRouter.use(function(req, res, next) {
        // do logging
        console.log('Somebody just came to our app!');

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token; //|| req.headers['x-access-token'];
console.log(token);
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, superSecret, function(err, decoded) {

                if (err) {
                    res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;

                    next(); // make sure we go to the next routes and don't stop here
                }
            });

        } else {

            // if there is no token
            // return an HTTP response of 403 (access forbidden) and an error message
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });
    // test route to make sure everything is working
    // accessed at GET http://localhost:8080/authorize
    authorizeRouter.get('/', function(req, res) {
        res.send('Broseph! welcome to our auth page!');
    });

    return authorizeRouter;
};