const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const http = require('http');

let server = http.createServer(app);
let publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {
    if (err) {
        throw new Error(err);
    }
    console.log(`listen by the port ${port}`);
})