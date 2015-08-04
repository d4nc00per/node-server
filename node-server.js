var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var auth = require('./auth');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./static'));

app.get("/", returnView);

app.post('/index', login);

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});

function login(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	res.send(auth.authenticate(username, password))
}

function returnView(req, res) {
	res.set('Content-Type', 'text/html');
	res.send(new Buffer(fs.readFileSync("index.html")));
}