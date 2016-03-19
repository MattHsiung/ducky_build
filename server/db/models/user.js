'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: validateEmail,
          message: "Not a valid email address"
        }
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    firebase: {
        uid: String,
        token: String
    }
});

//expect an email string
function validateEmail(email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
};

schema.statics.validateStreamingUser = function (data){
    console.log(data);
    return this.findOne({email : data.email})
        .then(function (user){
            // var encrypted = encryptPassword(data.password, user.salt);
            if(!user) throw Error('Not a valid email & password');
            //TODO use once signup ready
            //if(user.password !== encrypted) throw new Error('Not a valid email & password');
            if(user.password !== data.password) throw new Error('Not a valid email & password');
            return user;
        })
};

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
};

function encryptPassword(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
