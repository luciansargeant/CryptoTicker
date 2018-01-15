'use strict';

// Requires
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');

// Express app
var app = express();

// Handle requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set the root directory
app.use("/", express.static(__dirname));

// Create the server on port 7000
var server = app.listen(7001, function(){
	var host = server.address().address;
    var port = server.address().port;

   	console.log("CryptoTicker listening at http://%s:%s", host, port);
});

// Set the url to the bitfinex api
var url = 'https://api.bitfinex.com/v1';

// Routes

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+"/index.html"));
	res.end();
});

app.post('/getCurrPair', function(req, res){
	if(req.body.pairCode != undefined && req.body.pairCode != null){
		request.get(url + '/pubticker/' + req.body.pairCode, function(err, innerRes, body){
			
			if(err){
				console.log('Error retrieving data from Bitfinex -> ' + err);
			} 
			else {
				console.log(body);

				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				res.write(JSON.stringify(body));
				res.end();
			}

		});
	}	
	else {
		console.log('Bad request for altcoin.');
	}
});

app.post('/getBids', function(req, res){
	if(req.body.pairCode != undefined && req.body.pairCode != null){
		request.get(url + '/book/' + req.body.pairCode, function(err, innerRes, body){
			
			if(err){
				console.log('Error retrieving bid data from Bitfinex -> ' + err);
			} 
			else {
				console.log(body);

				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				res.write(JSON.stringify(body));
				res.end();
			}

		});
	}	
	else {
		console.log('Bad request for altcoin bids.');
	}
});

app.get('/getCodes', function(req, res){
	request.get(url + '/symbols', function(err, innerRes, body){
		
		if(err){
			console.log('Error retrieving codes from Bitfinex -> ' + err);
		} 
		else {
			console.log(body);

			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.write(JSON.stringify(body));
			res.end();
		}

	});
});
