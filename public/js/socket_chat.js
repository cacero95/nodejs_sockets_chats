var socket = io();
var params = new URLSearchParams(window.location.search);
if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html'
    throw new Error('the name and the sala are necesary');
} else if (params.get('name').length == 0 || params.get('room') == 0) {
    window.location = 'index.html'
    throw new Error('the name and the sala are necesary');
}
var usuario = {
    name: params.get('name'),
    room: params.get('room')
}
socket.on('connect', function() {
    socket.emit("welcomeChat", {
        name: usuario.name,
        room: usuario.room
    }, function(resp) {
        render_people(resp);
    })
})


// evento para identificar cuando un usuario send a message
socket.on('send_message', function(message) {
    render_message(message);
    scrollBottom();
});

// evento para estar pendiente cuando un usuario entra o sale del chat
socket.on('get_people', function(users) {
    render_people(users);
})

// manda un mensaje privado a someone in the room
socket.on('private_message', function(message) {
    console.log('Private message', message)
})