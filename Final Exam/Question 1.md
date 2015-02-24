# Preparation
Download the enrol.zip, unzip it and restore it with `mongorestore dump`.

# Query
Use following query to find the number of messages sent from Andrew Fastow, CFO (andrew.fastow@enron.com) to Jeff Skilling (jeff.skilling@enron.com)

```
db.messages.find({"headers.To": "jeff.skilling@enron.com", "headers.From": "andrew.fastow@enron.com" }).count();
```

# Given answer
The answer I gave was: 3.