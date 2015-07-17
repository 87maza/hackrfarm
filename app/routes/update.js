//var express = require('express'),
//    router = express.Router(),
//    mongoose = require('mongoose'), //mongo connection
//    bodyParser = require('body-parser') //parses information from POST
////methodOverride = require('method-override'); //used to manipulate POST
//
//var User = require('../models/user');
//
//module.exports = function(app, express){
//    var updateRouter = express.Router();
//
//    // /profile
//    updateRouter.get('/', function(req, res) {
//        res.render('update', {user: req.user});
//    });
//
//    // /profile/update
//    updateRouter.post('/', function(req, res) {
//
//
//        res.send("tagline: " + req.body.tagline);
//    });
//
//
//
//    return updateRouter;
//};