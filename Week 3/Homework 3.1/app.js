var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/school", function (err, db) {

	if (err) throw err;

	db.collection('students').find({}).toArray(function (err, docs) {
		if (err) throw err;

		var min = -1;
		var value;
		var noOfDocs = docs.length;
		var i;

		for (i = 0; i < noOfDocs; i++) {
			var doc = docs[i];

			// find the smallest homework score

			for (var j = 0; j < doc.scores.length; j++) {
				value = doc.scores[j];

				if (value.type == 'homework') {
					if (min === -1 || value.score < doc.scores[min].score) {
						min = j;
					}
				}
			}

			// splice out the lowest homework -- splice(index, n) removes n entries from index
			doc.scores.splice(min, 1);

			db.collection('students').save(doc, function (err, saved) {
				if (err) throw err;
			})

		}

		return db.close();

	});

});