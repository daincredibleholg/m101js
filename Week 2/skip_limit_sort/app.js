var MongoClient = require ('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
	if (err) throw err;

	var grades = db.collection('grades');

	var cursor = grades.find({});

	cursor.skip(1);
	cursor.limit(4);
	cursor.sort('grade', 1);

	cursor.skip()
	cursor.each (function(err, doc) {
		if (err) throw err;

		if (doc == null) {
			return db.close();
		}
		console.dir(doc);
	});
})