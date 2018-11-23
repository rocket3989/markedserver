var express = require('express');
var app = express();
var server = app.listen(8080);
var users = [];
app.use(express.static('public'));

console.log('server open on port 8080');

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection',newConnection);
function newConnection(client) {
	var id = users.length;
	console.log('user '+id);
	client.emit('name',{name:id});
	users.push(socket);
	client.on('data',data =>{ 
		console.log(data);
		client.broadcast.emit('data',data);
		});
	client.on('disconnect',function(data){
		console.log("connection end");
	})
}