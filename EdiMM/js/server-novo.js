const server = require('http').createServer();
const s = require('socket.io')(server);

s.on('connection', (socket) => {
  socket.join('room 237', () => {
    let rooms = Object.keys(socket.rooms);
    console.log(rooms); // [ <socket.id>, 'room 237' ]
  });
});

s.sockets.on('connection', function(socket) {
	socket.on('register', function(message) { 
	
	});
	
	socket.on('join', function(message) { 
		ws.personName = message.data;
			console.log("New client on the session: " + message.sessionId);
	});
	
	socket.on('publish', function(message) {
		message = JSON.parse(message);

		if (message.type == "join"){
			ws.personName = message.data;
			console.log("New client on the session: " + message.sessionId);
			return;
		}

		if (message.type == "close"){
			ws.personName = message.data;
			console.log("Client closed the connection with session: " + message.sessionId);
			return;
		}
		
		console.log("Session: " + message.sessionId + " Message: " + message.data);
		/*
		s.clients.forEach(function e(client) {
			if(client != ws) 
			client.send(JSON.stringify({
				name: ws.personName,
				data: message.data
			}));
		});
		*/
	});

	socket.on("leave", function(message) {
		message = JSON.parse(message);
		ws.personName = message.data;
		console.log("Client closed the connection with session: " + message.sessionId);
	});
	
	socket.on('close', function() {
		console.log("Client connection closed!");
	});
});

server.listen(5001, function (err) {
  if (err) throw err
  console.log('listening on port 5001')
});