
var fs = require('fs');
var express = require('express');
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res)
{
	res.sendFile('index.html');
});

var imageLoader = require('./images.js');
imgs = imageLoader.GetImages();
// var isLoaded = 0;

io.on('connection', function(socket) {

	// if(isLoaded == 0)
	// {
		
		console.log("img length is 0");
		console.log(imgs.length);
		for(var x=0;x<imgs.length;x++)
		{
			console.log(imgs[x]);
			io.emit('loadImages', imgs[x]);
		}

		io.emit('ImagesAreLoaded', imgs[x]);

	// 	isLoaded = 1;
	// }

	socket.on('moveImage', function(msg) {
		io.emit('moveImage', msg)
		console.log(msg);
	});
});

// GET IMAGE NAMES
http.listen(3000, function()
{
	console.log('Working...');

});