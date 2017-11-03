'use strict';

const config = require('../libs/config');
const soketIO = require('socket.io');

module.exports = (server) => {

    const io = soketIO(server, config.websockets);

    io.on('connection', (socket) => {

        socket
            .on('message', ({type, payload}) => {

                switch (type) {
                    case 'example':
                        require('./case/example')(payload);
                        break;

                    default:
                        require('./case/default')(payload);
                }
            })

            .on('disconnect', () => {})

            .on('error', (error) => {});

    });

    return io;
};
