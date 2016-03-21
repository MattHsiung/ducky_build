'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//get All streamers, search by firebaseId
router.get('/allStreamers', (req, res, next) => {
    User.find({ firebase: { $exists: true } }).populate('following').sort()
    .then( streamers => res.json(streamers))
    .catch( err => next(err))
})

//get all followers for a specific user
router.get('/:userid/followers', (req, res, next) => {
    User.find({following: {$in: [req.params.userid]} } ).populate('following')
    .then(followers => res.json(followers))
    .catch( err => next(err))
})

//userid should be logged in user, user to follow should be streamer to follow
router.put('/:userid/followers/:userToFollowId', (req, res, next) => {
    User.findOne({id: req.params.userid}, { $addToSet: {following: req.params.userToUnfollowId} } )
    .then(updatedUser => res.status(201).json(updatedUser))
    .catch( err => next(err))
})

//userid should be logged in user, user to follow should be streamer to follow
router.delete('/:userid/followers/:userToUnfollowId', (req, res, next) => {
    User.findById({id: req.params.userid}, {$pull: {following: req.params.userToUnfollowId} })
    .then(updatedUser => res.status(201).json(updatedUser))
    .catch( err => next(err))
})

//get a user by ID
router.get('/:userid', (req, res, next) => {
    User.findById(req.params.userid).populate('following')
    .then( user => res.json(user))
    .catch( err => next(err))
})

//edit a user by ID
router.put('/:userid', (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
    .then( updatedUser => res.status(201).json(updatedUser))
    .catch( err => next(err))
})

//delete a user by ID
router.delete('/:userid', (req, res, next) => {
    User.findByIdAndRemove(req.params.userid)
    .then(() => res.sendStatus(401))
    .catch( err => next(err))
})


