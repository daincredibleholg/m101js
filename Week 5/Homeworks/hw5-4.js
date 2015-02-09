db.zips.aggregate([
	// Make a nice bunch of docs we can work with...
	{"$project": {
		"_id": 0,
		"first_city_char": {"$substr": ["$city", 0, 1]},
		"zip": "$_id",
		"city": 1,
		"pop": 1
	}},

	// only work on cities starting with a numeric char
	{"$match": {
		"$and": [ {"first_city_char": {"$gte": "0"}}, {"first_city_char": {"$lte": "9"}} ]
	}},

	// sum it up, Scotty
	{"$group": {
		"_id": null,
		"sum_total": {"$sum": "$pop"}
	}}
]);