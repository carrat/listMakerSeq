// include mysql connection data
var connection = require('./connection.js');

// Define default global variables
var tableName = "children";
var orderBy = "id";


//define ORM functions
var orm = {
//select all from table
	selectAll: function (cb) {
		connection.query('SELECT * FROM children ORDER BY child_name asc',  function(err, res){
			if (err) throw err;
			cb(res);
		});
	},

//inset one row into table
	insertOne: function (childName, cb) {
		console.log("Insert");
		connection.query('INSERT INTO children SET ?', {child_name: childName}, function(err, res){
			if (err) throw err;
			cb(res);
		});
	},
//update one row in table to naughty
	naughtyOne: function(childID, cb){
		console.log("Naughty");
		connection.query('UPDATE children SET ? WHERE ?', [{naughty: 1}, {id: childID}], function(err, res){
			if (err) throw err;
			cb(res);
		});
	},
//update one row in table to nice
	niceOne: function(childID, cb){
		console.log("Nice");
		connection.query('UPDATE children SET ? WHERE ?', [{naughty: 0}, {id: childID}], function(err, res){
			if (err) throw err;
			cb(res);
		});
	},
//delete one row from table
	deleteOne: function(childID, cb){
		console.log("Delete");
		connection.query('DELETE FROM children WHERE ?', [{id: childID}], function(err, res){
			if (err) throw err;
			cb(res);
		});
	}

};

//export ORM functions
module.exports = orm;