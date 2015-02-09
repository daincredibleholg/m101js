db.grades.aggregate([
	// We have to aggregate on "arrayed" values - get rid of it :)
	{"$unwind": "$scores"},

	// Throw away all unwanted quiz scores
	{"$match": {
		"scores.type": {"$ne": "quiz"}
	}},

	// get student average per class
	{"$group": {
		"_id": {"class_id": "$class_id", "student_id": "$student_id"},
		"student_score_avg": {"$avg": "$scores.score"}
	}},

	// get class average
	{"$group": {
		"_id": "$_id.class_id",
		"class_avg": {"$avg": "$student_score_avg"}
	}},

	// Sort in desc order, as we are only interested in the best class
	{"$sort": {"class_avg": -1}},

	// Like said before, only the best class is of interest and there can only be one
	{"$limit": 1},

	// Gold plating ahead: make the result a little bit more verbose
	{"$project": {
		"_id": 0,
		"class_id": "$_id"
	}}
])