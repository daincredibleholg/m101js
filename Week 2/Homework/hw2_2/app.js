var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function (err, db) {
	if (err) throw err;

	// first, get a distinct list of States
	db.collection('data').distinct('State').toArray(function (err, docs) {
		if (err) throw err;

		for (doc in docs) {
			db.collection('data').find().sort({'Temperature': -1}).limit(1).each(function (err, monthHighDoc) {
				if (err) throw err;

				if (monthHighDoc == null) {
					return db.close();
				}

				console.dir(monthHighDoc);
			})
		}
	});

/*
	var query = { };
	var sort = { 'state': 1, 'Temperature': -1 };

	var cursor = db.collection('grades').find(query);

	cursor.each(function (err, doc) {
		if (err) throw err;

		if (doc == null) {
			return db.close();
		}

		console.dir(doc.student + " got a good grade!");

	});
*/
});