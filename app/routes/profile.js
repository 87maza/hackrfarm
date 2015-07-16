var User = require('../models/user');
//var mongoose = require('mongoose');




module.exports = function(app, express){
    var profileRouter = express.Router();

    // /profile
    profileRouter.get('/', function(req, res) {
        res.render('profile', {user: req.user});
    });

    // /profile/update
    profileRouter.post('/', function(req, res) {


        res.send("email: " + req.body.email);
    });



    return profileRouter;
};