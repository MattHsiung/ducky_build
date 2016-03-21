'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//get All streamers, search by firebaseId
router.get('/allStreamers', (req, res, next) => {
    User.find({ firebase: { $exists: true } }).populate('following').sort()
        .then( streamers => res.json(streamers));
})

//get all followers for a specific user
router.get('/:userid/followers', (req, res, next) => {
    User.find({following: {$in: [req.params.userid]} } ).populate('following')
    .then(followers => res.json(followers));
})

//get a user by ID
router.get('/:userid', (req, res, next) => {
    User.findById(req.params.userid).populate('following')
        .then( user => res.json(user))
})

//edit a user by ID
router.put('/:userid', (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
    .then( updatedUser => res.status(201).json(updatedUser))
    .catch( err => next(err));
})

//delete a user by ID
router.delete('/:userid', (req, res, next) => {
    User.findByIdAndRemove(req.params.userid)
    .then(() => res.sendStatus(401));
})


