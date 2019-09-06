try {
	var idColection = [];
	var server = require('ws').Server;
	ws = new server({ port: 5001 });
	ws.on('connection', function (w) {
		w.on('message', function (message) {
			message = JSON.parse(message);

			if (message.type == "name") {
				ws.personName = message.data;
				console.log("Novo usuario na sessao: " + message.sessionId);
				idColection.push(message.sessionId);
				console.log(idColection)
				return;
			}
			//console.log("Sessao: " + message.sessionId + "\nRecebida: " + message.data);
			ws.clients.forEach(function e(client) {
				if (client != ws);
					idColection.forEach(function e(id) {
						if (message.sessionId == id) {
							client.send(JSON.stringify({
								data: message.data,
								id: message.sessionId
							}));
						}
					});
				// console.log(JSON.stringify({
				// 		name: ws.personName,
				// 		data: message.data,
				// 		id: message.sessionId
				// }))
				// if(client != ws)
				// client.send(JSON.stringify({
				// 	name: ws.personName,
				// 	data: message.data
				// }));
				// console.log(client.sessionId," - ",sectionId);
				// if(client.sessionId == sectionId){
				// 	client.send(JSON.stringify({
				// 		name: ws.personName,
				// 		data: message.data,
				// 	}));
				// }

			});
		});

		w.on('close', function () {
			console.log("Conexão de um cliente foi fechada!");
		});
	});
} catch (e) {
	console.log(e);
}