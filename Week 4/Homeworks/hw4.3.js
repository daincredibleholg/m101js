// The following queries are needed to bring the wanted improvements

use blog;

db.posts.ensureIndex({'tags': 1});
db.posts.ensureIndex({'date': -1});
db.posts.ensureIndex({'permalink': 1});