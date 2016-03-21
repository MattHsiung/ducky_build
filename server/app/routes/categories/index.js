'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Category = mongoose.model('Category');

//get all categories
router.get('/', function(req,res,next) {
	Category.find({})
		.then(function(categories) {
			res.json(categories);
		})
})

//makes a category found by id available for use
router.param('categoryId', function (req, res, next, categoryId) {
	Category.findById(categoryId) 
		.then(function(category) {
			if (!category) {
				return next(new Error('Category not found'));
			}
			req.category = category;
			next();
		})
		.then(null, function (err) {
			err.status = 404;
			next(err);
		})
})

//gets a category by id
router.get('/:categoryId', function (req, res) {
	res.json(req.category);
})

//updates a category by id
router.put('/:categoryId', function(req, res, next) {
	Category.findByIdAndUpdate(req.category._id, req.body, {new: true})
		.then(function(category) {
			res.json(category);
		})
		.then(null, next);
});

//deletes a category by id
router.delete('/:categoryId', function(req, res) {
	req.category.remove()
		.then(function() {
			res.status(204).end();
		})
});