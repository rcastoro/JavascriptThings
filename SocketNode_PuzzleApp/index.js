
var fs = require('fs');
var express = require('express');
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Properties
var usersOnline = 0;
var puzzlePieces = [];
var puzzlePiece;

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res)
{
	res.sendFile('index.html');
});

var imageLoader = require('./images.js');
imgs = imageLoader.GetImages();
// var isLoaded = 0;

io.on('connection', function(socket) {
	
	for(var x=0;x<imgs.length;x++)
	{
		puzzlePiece = new Object();
		//Save initial server version of puzzle pieces into array for tracking of movement for new sockets
		if(usersOnline == 0)
		{
			//DEBUG
			console.log("Setting up initial puzzle pieces caching on server");

			puzzlePiece.src = imgs[x];
			puzzlePiece.id = x;
			puzzlePiece.top = 0;
			puzzlePiece.left = 0;

			puzzlePieces.push(puzzlePiece);
		}

		//Broadcast initial image load for client
		io.emit('loadImages', JSON.stringify(puzzlePieces[x]));
	}

	io.emit('ImagesAreLoaded', '');

	// ON MOVE IMAGE BROADCAST
	socket.on('moveImage', function(msg) {
		
		piece = JSON.parse(msg);
		console.log('Updating piece coordinates on server: ');
		console.log(piece.id+":");
		console.log("	Top: " + piece.top +"");
		console.log("	Left: " + piece.left +"");

		puzzlePieces[piece.id].top = piece.top;
		puzzlePieces[piece.id].left = piece.left;

		io.emit('moveImage', msg);
	});

	socket.on('disconnect', function() {
		usersOnline -= 1;
	});

	usersOnline += 1;

	console.log("New user connected");
	console.log("Users connected: " + usersOnline);

});

// GET IMAGE NAMES
http.listen(process.env.PORT || 3000, function()
{
	console.log('Working...');

});