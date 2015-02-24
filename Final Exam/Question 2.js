db.messages.aggregate([
	// unwind the To array first
	{"$unwind": "$headers.To"},

	// remove duplicated To entries
	{"$group": {
		"_id": "$_id",
		"To": {"$addToSet": "$headers.To"},
		"From": {"$addToSet": "$headers.From"}
	}},

	// unwind the To field
	{"$unwind": "$To"},

	// unwind the From field (damn workaround)
	{"$unwind": "$From"},

	// Count
	{"$group": {
		"_id": {"From": "$From", "To": "$To"},
		"messageCnt": {"$sum": 1}
	}},

	// Sort by message count
	{"$sort": {
		"messageCnt": -1
	}}
]);