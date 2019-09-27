
const path = require('path');
const express =  require('express');
const app = express();
const socketio = require('socket.io');

//se obtiene el puerto del servidor en el que esta corriendo o se asigna el puerto 3000
app.set('port', process.env.PORT || 3000);

//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//inicio del servidor
const server = app.listen(app.get('port'), () => {
	console.log('servidor corriendo en puerto', app.get('port'));
});

//socketio necesita o require de un server para trabajar
const io = socketio(server);

/*
	WEBSOCKET
	Este código indica que cuando alguien se conecte vamos a comenzar a ejecutar una serie de instrucciones
*/
io.on('connection', (socket) => {

	//en consola se muestran los id's de los usarios activos o en linea
	console.log('nueva conexion',socket.id);

	//Escuchamos y recibidmos mensaje d ecada usuario y el mismo es emitido a los demas
	socket.on('chat:message', (data) => {
		io.sockets.emit('chat:message',data);
	});

	//Escuchamos y recbimos el usuario que esta escribiendo
	socket.on('chat:typing',(data) => {
		/*
			Emitimos e informamos a los demas que dicho usuario esta escribiendo. 
			El envio se realiza a todos los usuarios salvo el que se encuentra escribiendo mediante la funcion "broadcast"
		*/
		socket.broadcast.emit('chat:typing',data);

	});


});




