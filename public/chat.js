const socket = io();


/*
	Se lleva a cabo el envio de nuestro mensaje incluyendo el nombre de usuario
*/
$("#send").click(function(){

	//extraemos de los inputs el usuario ingresado y el mensaje
	var message = $('#message').val();
	var username = $('#username').val();

	//emitimos dicho mensaje acompañado del usuario
	socket.emit('chat:message',{
		message: message,
		username: username
	});

	//vaciamos en text-tarea del mensaje
	$('#message').val("");

});

//cuando estamos escribiendo emitimos nuestro username
$("#message").keypress(function(){

	//se encarga de emitir nuestro nombre de usuario a los demas para que se enteren que estamos escribiendo
	socket.emit('chat:typing',$('#username').val());

});

//Escuchamos si llegan mensajes de otros usaurios para ser mostrados en el nuestra pagina
socket.on('chat:message', function(data){

	$('#actions').html("");

	var li = [

		'<li class="collection-item avatar">',

	        '<img src="https://materializecss.com/images/yuna.jpg" alt="" class="circle">',
	        '<span class="title">'+data.username+'</span>',
	        '<p>'+data.message+'</p>',
	     
	    '</li>'

	].join("");

	$('#output').append(li);


});

//escuchamos los usuarios que pueden estar escribiendo
socket.on('chat:typing',function(data){

	/*
		Y mostramos ese usuario que puede esta escribiendo, en nuestro pagina.
	*/ 
	$('#actions').html('<p><em>'+data+' está escribiendo...</em></p>');

});