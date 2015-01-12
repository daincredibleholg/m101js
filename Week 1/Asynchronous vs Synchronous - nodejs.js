/*
 * M101JS - Week 1 - Asynchronous vs Synchronous - NodeJS variant
 */
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
	
	if (err) {
		throw err;
	}

	db.collection('coll').findOne({}, function (err, doc) {
		// Print result
		console.dir(doc);

		// Close the DB
		db.close();
	});

	// Declare success
	console.dir("Called findOne()!");
})