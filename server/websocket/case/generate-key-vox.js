'use strict';

const config = require('../../libs/config');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
const {userName, accountPass} = config.voxEngine;

module.exports = (payload, socket) => {
    const {key} = payload;
    const token = md5(`${key}|${md5(`${userName}:voximplant.com:${accountPass}`)}`);
    socket.emit('message', {
        type: 'key-vox',
        payload: token
    });
};
