var express = require('express'),
    app = express(),
    cons = require('consolidate');

app.engine ('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(app.router);

function errorHandler(err, req, res, next) {
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function (req, res, next) {
	res.render('fruitPicker', {'fruits': [ 'apple', 'orange', 'banana', 'peach']});
})

app.post('/favourite_fruit', function(req, res, next) {
	var favourite = req.body.fruit;
	if (typeof favourite == 'undefined') {
		next(Error('Please choose fruit!'));
	} else {
		res.send("Your favourite fruit is " + favourite)
	}
})

app.listen(3000);
console.log('Express server listening on port 3000');