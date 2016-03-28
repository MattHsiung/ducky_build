'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var md5 = require('blueimp-md5');

var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        validate: {
          validator: validateEmail,
          message: "Not a valid email address"
        }
    },
    imageUrl: {
      type: String,
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    github: {
        githubId: String,
        username: String,
        url: String,
        accessToken: String
    },
    google: {
        id: String
    },
    firebase: {
        token: String
    }
});

//expect an email string
function validateEmail(email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
};

//prehook to generate image via gravatar email
schema.pre('save', function(next){
  this.imageUrl = 'http://www.gravatar.com/avatar/' + md5(this.email.replace(/\s/g,''));
  console.log('do they get an image', this.imageUrl, this.email);
  next();
})

schema.statics.validateStreamingUser = function (data){
    console.log('validation', data);
    return this.findOne({username : data.username})
        .then(function (user){
            console.log('user', user);
            var encrypted = encryptPassword(data.password, user.salt);
            console.log('salted pword', encrypted);
            if(!user) throw Error('Not a valid username & password');
            if(user.password !== encrypted) throw new Error('Not a valid email & password');
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
