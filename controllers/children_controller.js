
// set dependencies
var express = require('express');
var router = express.Router();

// Dependencies
var models  = require('./models');

// extract our sequelize connection from the models object, to avoid confusion
var sequelizeConnection = models.sequelize

var newChild;


// define routes
router.get('/children', function (req, res) {

	models.Child.findAll({})
	.then(function(children){
		var childObj = res.json(children);
		console.log(childObj);
		res.render('children/index', childObj);
	});
});

router.post('/children/create', function (req, res) {
	var child = req.body; // set request to variable
// create new instance of model child
	models.Child.create(
		{
			childName: child.name
		}, 

		{
			// We need to 'include' the uniform and store models.
			// Otherwise, Sequelize won't know which fields to enter into which tables.
			include: [models.List],
			include: [models.Gift]
		}
	)
	// save child to variable
	.then(function(child){
		newChild = child;
	});
	
	.then(function(){
		newChild.setList(???);
		newChild.setGift(???);
	});

	res.redirect('/');
});

router.post('/children/naughty/:id', function (req, res) {

	// Take the request...
	var childID = req.params.id;

	models.Child.update({
	  naughty: 1,
	}, {
	  where: {
	    id: {
	      $e: childID
	    }
	  }
	});

	res.redirect('/');
});

router.post('/children/nice/:id', function (req, res) {
	// Take the request...
	var childID = req.params.id;

	models.Child.update({
	  naughty: 0,
	}, {
	  where: {
	    id: {
	      $e: childID
	    }
	  }
	});

	res.redirect('/');
});

router.delete('/children/delete/:id', function (req, res) {
	// Take the request...
	var childID = req.params.id;

	models.Child.delete({
	  naughty: 0,
	}, {
	  where: {
	    id: {
	      $e: childID
	    }
	  }
	});

	res.redirect('/');
});

router.post('/children/assign/:child/:gift', function (req, res) {
	var child = req.params.child; // set request to variable
	var gift = req.params.gift; // set request to variable

	models.Child.findOne({
		where: {
			child_id: child
		}
	}).then(function(result){
		result.setGift(gift);
	}).then(function(){
		res.redirect('/')
	});
});


// export router
module.exports = router;
