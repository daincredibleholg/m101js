var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
	if (err) throw err;

	// it looks like NSA isn't so big in the news at the moment - but 'Google' will
	// return some nice matches in my current data set.
	var query = { 'title': {'$regex': 'Google'}};

	var projection = {'title': 1, '_id': 0};

	db.collection('reddit').find(query, projection).each(function (err,doc) {
		if (err) throw err;

		if (doc == null) {
			return db.close();
		}

		console.dir(doc.title);
	});
});