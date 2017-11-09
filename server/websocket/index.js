'use strict';

const config = require('../libs/config');
const soketIO = require('socket.io');

module.exports = (server) => {

    const io = soketIO(server, config.websockets);

    io.on('connection', (socket) => {

        socket
            .on('message', ({type, payload}) => {
                try {
                    return require(`case/${type}`)(payload, socket);
                } catch (ex) {
                    return require('case/default')(payload);
                }
            })

            .on('disconnect', () => {})

            .on('error', (error) => {});

    });

    return io;
};
