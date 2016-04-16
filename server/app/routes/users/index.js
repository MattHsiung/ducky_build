'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//get ALL users, no matter who they are
router.get('/', (req, res, next) => {
    User.find({}).populate('following')
    .then( users => res.json(users))
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
    .then(() => res.sendStatus(200))
    .catch( err => next(err))
})
