try {
	var server = require('ws').Server;
	console.log(server)
	ws = new server({ port: 5001 });
	console.log("Iniciando servidor\nAguardando usuários...");
	ws.on('connection', function (w) {
		w.on('message', function (message) {
			message = JSON.parse(message);
			if (message.type == "name") {
				ws.personName = message.data;
				w.sessao = message.sessionId;
				console.log("Novo usuario na sessao: " + message.sessionId);
				return;
			}
			ws.clients.forEach(function e(client) {
				if (client != ws) {
					if (message.sessionId == client.sessao) {
						console.log("Mensagem enviada para a sessão " + message.sessionId);
						client.send(JSON.stringify({
							data: message.data,
							id: message.sessionId
						}));
					}
				}
			});
		});
		w.on('close', function () {
			console.log("Conexão de um cliente na sessao " + w.sessao + " foi fechada!");
		});
	});
} catch (e) {
	console.log(e);
}