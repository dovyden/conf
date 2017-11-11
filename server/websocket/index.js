'use strict';

const socketIo = require('socket.io');
const config = require('../libs/config');

module.exports = (server) => {
    const io = socketIo(server, config.websockets);

    io.on('connection', (socket) => {
        socket
            .on('message', ({type, payload}) => {
                try {
                    return require(`./case/${type.toLowerCase()}`)(socket, payload);
                } catch (ex) {
                    return require('./case/default')(socket, payload);
                }
            })
            .on('disconnect', () => {})
            .on('error', (error) => {  // eslint-disable-line no-unused-vars
                // websockerLogger.error('Something wrong happens!', error);
            });
    });

    return io;
};
