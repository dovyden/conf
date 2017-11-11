'use strict';

const config = require('../../libs/config');
const crypto = require('crypto');

const {
    userName,
    accountPass
} = config.voxEngine;

module.exports = (socket, payload) => {
    const {key} = payload;

    const passwd = crypto.createHash('md5');
    passwd.update(`${userName}:voximplant.com:${accountPass}`);

    const token = crypto.createHash('md5');
    token.update(`${key}|${passwd.digest('hex')}`);

    socket.emit('message', {
        type: 'KEY-VOX',
        payload: token.digest('hex')
    });
};
