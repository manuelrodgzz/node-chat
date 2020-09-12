const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pass to next layer of middleware
    next();
});

const port = process.env.PORT || 8080;  

let server = http.createServer(app);

module.exports.io = socketIO(server);
require('./socket/socket')

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});