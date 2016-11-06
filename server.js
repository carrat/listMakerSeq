// Set dependencies
var express 	= require('express');
var methodOverride	= require('method-override');
var bodyParser 	= require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

// target static files
app.use('/static', express.static(__dirname + '/public/assets/'));

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// define routes
var routes = require('./controllers/listmaker_controller.js')
app.use('/', routes);

// start server listening
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})