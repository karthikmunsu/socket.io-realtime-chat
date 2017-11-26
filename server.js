var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/node_modules'));  

app.get('/test', function(req, res) {
	res.status(200).send('<h1>hello user</h1>');
	res.end();
})

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/html/index.html');
})

io.on('connection', function(socket){  
  console.log('a user connected');
socket.on('new message', function(msg){
    console.log('new message: ' + msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, function() {
	console.log('server running @localhost:' + port);
})
