'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Category = mongoose.model('Category');

//get all categories
router.get('/', (req,res,next) => {
	Category.find({})
		.then( categories => res.json(categories))
		.catch( err => next(err))
})

//give streamers the ability to create new category
router.post('/', (req,res,next) => {
	Category.create(req.body)
		.then(product => res.status(201).json(product))
})

//makes a category found by id available for use
router.param('categoryId', (req, res, next, categoryId) => {
	Category.findById(categoryId) 
		.then(category => req.category = category)
		.catch(err => next(err))
})

//gets a category by id
router.get('/:categoryId', (req, res) => res.json(req.category))

//updates a category by id
router.put('/:categoryId', (req, res, next) => {
	Category.findByIdAndUpdate(req.category._id, req.body, {new: true})
		.then(category => res.json(category))
		.catch(err => next(err))
})

//deletes a category by id
router.delete('/:categoryId', (req, res) => {
	req.category.remove()
		.then(() => res.status(204).end())
});