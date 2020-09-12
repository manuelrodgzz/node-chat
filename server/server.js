const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const cors = require('cors')

app.use(cors());

const port = process.env.PORT || 8080;  

let server = http.createServer(app);

module.exports.io = socketIO(server);
require('./socket/socket')

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});