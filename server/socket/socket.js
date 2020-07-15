const {io} = require('../server');
const helpers = require('../helpers/helpers');

let arrayClients = []

const getClientCounter = (client) => {
    console.log(arrayClients)

    io.emit('enviarClientes', arrayClients)
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
    });

    client.on('enviarMensaje', (objMensaje) => {

        objMensaje.color = arrayClients.find(cliente => cliente.usuario === objMensaje.usuario).color
        io.sockets.emit('mensajeUsuario', objMensaje)
        console.log(objMensaje)
    });

    client.on('disconnect', () => {
        arrayClients = arrayClients.filter(cliente => cliente.id !== client.id)
        getClientCounter(client);
    });

    client.on('reconnect', () => {
        getClientCounter(client);
    });
});