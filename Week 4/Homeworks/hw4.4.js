// The following query will return the entry with the longest running query.
use m101;

db.profile.find({ns:'school2.students'},{'_id':0,'ns':1,millis:1}).sort({millis: -1}).limit(1);