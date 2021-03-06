'use strict';
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Firebase = require("firebase");
var ducky = new Firebase("https://ducky.firebaseio.com/");

var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("Yn8pOTEBHpYwr9I4njqaN6XlFolJGBwbFRuPQH4A");

module.exports = function (app) {
    app.post('/auth/ducky-auth', function(req, res) {
    console.log('authenticating user');
    if(req.body.token) {
        console.log('with this token', req.body.token);
        ducky.authWithCustomToken(req.body.token, function(error, authData){
            if (error) console.log("Login Failed!", error);
            if(!authData) res.status(401).send('Invalid token.');
            res.json(authData);
        })

    } else {
        //authenticate user in mongoose
        console.log(req.body);
        User.validateStreamingUser(req.body)
            .then( function (user){
                var token = tokenGenerator.createToken({uid: user.username }, {expires: Date.now() + 31556952});
                 console.log('token is:' + token);
                //store token in mongo so we know they are streamers
                user.firebase.token = token;
                return user.save()
                .then(user => res.json({username: user.username, token: token}));
            })
            .catch(function(err){
                console.log('HERES THE ERROR', err.message);
                res.status(401).send(err.message);
            })
    }
});
}
