
// set dependencies
var express = require('express');
var router = express.Router();

// require model
var listmaker = require('../models/listmaker.js');

// define routes
router.get('/', function (req, res) {
	listmaker.selectAll(function (data) {
		res.redirect('/index');
	});
});

router.get('/index', function (req, res) {
	listmaker.selectAll(function (data) {
		var itemsObj = { children: data };
		console.log(itemsObj);
		res.render('index', itemsObj);
	});
});

router.post('/children/create', function (req, res) {
	listmaker.insertOne(req.body.name, function () {
		res.redirect('/index');
	});
});

router.post('/children/naughty/:id', function (req, res) {
	listmaker.naughtyOne(req.params.id, function () {
		res.redirect('/index');
	});
});

router.post('/children/nice/:id', function (req, res) {
	listmaker.niceOne(req.params.id, function () {
		res.redirect('/index');
	});
});

router.delete('/children/delete/:id', function (req, res) {
	listmaker.deleteOne(req.params.id, function () {
		res.redirect('/index');
	});
});


// export router
module.exports = router;
