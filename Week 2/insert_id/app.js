var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
	if (err) throw err;

	var doc = { '_id': 'calvin', 'age': 6};

	db.collection ('students').insert(doc, function (err, inserted) {
		if (err) {
			console.log(err.message);
			return db.close();
		}

		console.dir("Successfully inserted " + JSON.stringify(inserted));

		return db.close();
	})
})