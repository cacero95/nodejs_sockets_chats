var params = new URLSearchParams(window.location.search);
// functions for render jquery properties

// jquery references
var div_usuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txt_box = $('#txt_message');
var chat_box = $('#divChatbox');
var id = '';

function render_people(people) {
    var html = '';
    html += `
    <li>
        <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('room')}</span></a>
    </li>`
    for (var person of people) {
        // cuando en un objeto venga data-id its means id modificado
        html += `
        <li>
            <a id="${person.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${person.name} <small class="text-success">online</small></span></a>
        </li>
        `
    }
    div_usuarios.html(html);
}
// the second parameter is a boolean with id of the user
function render_message(mensaje, me) {
    var html = '';
    var date = new Date(mensaje.date);
    var time = `${date.getHours()}:${date.getMinutes()}`;

    if (me) {
        html += `
        <li class="animated fadeIn">
            <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
            <div class="chat-content">
            <h5>${mensaje.name}</h5>
            <div class="box bg-light-info">${mensaje.message}</div>
            </div>
            <div class="chat-time">${time}</div>
        </li>
        `;
    } else {
        if (mensaje.name === 'admin') {
            html += `
                <li class="reverse">
                <div class="chat-content">
                    <h5>${mensaje.name}</h5>
                    <div class="box bg-light-danger">${mensaje.message}</div>
                </div>

                <div class="chat-time">${time}</div>
            </li>
        `;
        } else {
            html += `
            <li class="reverse">
            <div class="chat-content">
                <h5>${mensaje.name}</h5>
                <div class="box bg-light-inverse">${mensaje.message}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">${time}</div>
        </li>
            `;
        }
    }
    chat_box.append(html);
    scrollBottom();
}

function scrollBottom() {

    // selectors
    var newMessage = chat_box.children('li:last-child');

    // heights
    var clientHeight = chat_box.prop('clientHeight');
    var scrollTop = chat_box.prop('scrollTop');
    var scrollHeight = chat_box.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        chat_box.scrollTop(scrollHeight);
    }
}
// listenner de cualquier a
div_usuarios.on('click', 'a', function() {
    // si usa jquery y data-id se usaria la siguiente sintaxis
    /**
     * var id = $(this).data('id');
     */
    if (this.id.length > 0) {
        id = this.id;
    }
});
formEnviar.on('submit', function(event) {
    event.preventDefault();
    if (txt_box.val().trim().length === 0) {
        return
    }
    var message = {
        name: params.get('name'),
        message: txt_box.val()
    }
    socket.emit('send_message', {
        name: params.get('name'),
        message: txt_box.val(),
        date: new Date().getTime()
    }, function(resp) {
        console.log('resp from the server', resp);
        txt_box.val('').focus();

        render_message(resp, true);

    })
})