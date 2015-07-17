var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'); //parses information from POST
    //used to manipulate POST

var User = require('../models/user');
//var mongoose = require('mongoose');




module.exports = function(app, express){
    var profileRouter = express.Router();


    profileRouter.get('/', function(req, res) {
        res.render('profile', {user: req.user});
    });

    // /profile/update
    //profileRouter.post('/', function(req, res) {
    //        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    //        var tagline = req.body.tagline;
    //
    //        //call the create function for our database
    //        mongoose.model('Blob').create({
    //            name : name,
    //            badge : badge,
    //            dob : dob,
    //            isloved : isloved
    //        }, function (err, blob) {
    //            if (err) {
    //                res.send("There was a problem adding the information to the database.");
    //            } else {
    //                //Blob has been created
    //                console.log('POST creating new blob: ' + blob);
    //                res.format({
    //                    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
    //                    html: function(){
    //                        // If it worked, set the header so the address bar doesn't still say /adduser
    //                        res.location("blobs");
    //                        // And forward to success page
    //                        res.redirect("/blobs");
    //                    },
    //                    //JSON response will show the newly created blob
    //                    json: function(){
    //                        res.json(blob);
    //                    }
    //                });
    //            }
    //        })
    //    });

    return profileRouter;
};

