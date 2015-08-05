var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./static'));

app.get("/", returnView);

app.post('/index', function(req, res) {

	MongoClient.connect('mongodb://localhost:27017/myHome', function(err, db) {

		if (err) res.send(err)

		db.collection("users").findOne({"username": req.body.username}, function(err, doc)
			{
				if (doc.password === req.body.password) {
					res.send(true);
				}

				res.send(false);
			});
	});		
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});

function returnView(req, res) {
	res.set('Content-Type', 'text/html');
	res.send(new Buffer(fs.readFileSync("index.html")));
}