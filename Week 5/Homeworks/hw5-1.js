db.posts.aggregate([
	{"$unwind": "$comments"},
	{"$group": {
		"_id": "$comments.author", 
		"numOfPosts": {"$sum": 1}
	}}, 
	{"$sort": {"numOfPosts": -1}}, 
	{"$limit": 2}]);
