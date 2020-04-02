const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { createMessage } = require('../utils/utils');
console.log(Usuarios.name);
let users = new Usuarios();
io.on('connection', (client) => {
    client.on('welcomeChat', (data, callback) => {
        console.log(data);
        if (!data.name || !data.room) {
            return callback({
                ok: false,
                message: 'The name and the room are required'
            })
        }
        // con la funcion join puedo unir un usuario a una sala
        client.join(data.room);
        users.addPerson(client.id, data.name, data.room);
        /**
         * con el to() puede redirigir el mensaje a las personas que necesito
         * con el getPeopleByRoom solo muestro las personas que estan en la misma room
         */
        let people_byRoom = users.getPeopleByRoom(data.room);
        client.broadcast.to(data.room).emit('send_message', createMessage('admin', `the user ${data.name} joins to the chat`));
        client.broadcast.to(data.room).emit('get_people', people_byRoom);
        callback(people_byRoom);
    });
    client.on('send_message', (data, callback) => {
        let person = users.search_person_ById(client.id);
        client.broadcast.to(person.room).emit('send_message', createMessage(person.name, data.message));
        callback(data);
    })
    client.on('disconnect', () => {
        let delete_user = users.close_session_personById(client.id);
        if (delete_user) {
            client.broadcast.to(delete_user.room).emit('send_message', createMessage('admin', `the user ${delete_user.name} has leaved the chat`));
            client.broadcast.to(delete_user.room).emit('get_people', users.getPeopleByRoom(delete_user.room));
        }
    })
    client.on('private_message', (data, callback) => {
        if (!data.message) {
            callback({
                ok: false,
                message: 'The message is neccesary'
            })
        }
        let to = users.search_person_ByName(data.to)
        console.log(to);
        client.broadcast.to(to.id).emit('private_message', createMessage(users.search_person_ById(client.id).name, data.message));
    })
});