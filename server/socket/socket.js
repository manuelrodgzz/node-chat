const {io} = require('../server');
const helpers = require('../helpers/helpers');

io.origins('*:*')

let arrayClients = []

const getClientCounter = (client) => {
    console.log(arrayClients)

    io.emit('enviarClientes', arrayClients)
}

const objMensajeBot = (mensaje) => {

    return{
        usuario: 'chat-bot',
        mensaje,
        color: 'gray'
    }
}

io.on('connection', (client) => {

    console.log('Se ha unido un nuevo usuario', client.id);

    client.on('login', (usuario) => {
        arrayClients.push({
            usuario,
            id: client.id,
            color: helpers.randomColor()
        });

        console.log(arrayClients);
        getClientCounter(client);
        io.sockets.emit('mensajeUsuario', objMensajeBot(usuario + ' ha ingresado al chat.'));
    });

    client.on('enviarMensaje', (objMensaje) => {

        objMensaje.color = arrayClients.find(cliente => cliente.usuario === objMensaje.usuario).color
        io.sockets.emit('mensajeUsuario', objMensaje)
        console.log(objMensaje)
    });

    client.on('disconnect', () => {
        const usuario = arrayClients.filter(cliente => cliente.id === client.id)
        io.sockets.emit('mensajeUsuario', objMensajeBot(usuario[0].usuario + ' ha dejado el chat.'))
        arrayClients = arrayClients.filter(cliente => cliente.id !== client.id)
        getClientCounter(client);
    });

    client.on('reconnect', () => {
        getClientCounter(client);
    });
});