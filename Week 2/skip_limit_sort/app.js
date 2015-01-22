var MongoClient = require ('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
	if (err) throw err;

	var grades = db.collection('grades');

//	var cursor = grades.find({});

//	cursor.skip(1);
//	cursor.limit(4);

	/* The reason why the parameter is an array is that objects cood get reordered and sort respects the order of the parameters.
	   In the example below this means, that the result is sorted by grade, ascending first and by student, descendent second. */
	//cursor.sort([['grade', 1], ['student', -1]]);

	/* The following approach is just another way of using skip, limit and sort. Again, the driver / MongoDB is taking
	   care of the correct order (sort, skip, limit).
	 */
	var options = {
		'skip': 1,
		'limit': 4,
		'sort': [['grade', 1], ['student', -1]]
	};
	var cursor = grades.find({}, [], options)

	cursor.each (function(err, doc) {
		if (err) throw err;

		if (doc == null) {
			return db.close();
		}
		console.dir(doc);
	});
})