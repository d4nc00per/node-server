var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myHome'
var db = new MongoClient().connect(url);

exports.authenticate = function(username, password) {

	db.collection("users").findOne({"username": username}, function(err, doc)
		{
			if (doc.password === password) {
				return true;
			}

			return false;
		});
};