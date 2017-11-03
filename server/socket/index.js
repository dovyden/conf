'use strict';

const config = require('../configs/socket');

module.exports = (server) => {

    const io = require('socket.io')(server, config);

    io.on('connection', (socket) => {

        socket
            .on('message', (data) => {

                const {type, payload} = data;

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
