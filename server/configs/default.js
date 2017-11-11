'use strict';

const path = require('path');
const os = require('os');

const ROOT_DIR = process.cwd();
const appData = require(path.join(ROOT_DIR, 'package.json'));


module.exports = {
    // application data (package.json)
    app: appData,

    // backend list for data providers
    backend: {
        node: 'https://test.knevod.com/node',
        voximplant: 'https://api.voximplant.com/platform_api'
    },

    // cookies parser
    // cookies: {
    //     secret: '2ea53d8'
    // },

    // server port
    port: process.env.APP_PORT || 80,

    // assets directory
    static: path.join(ROOT_DIR, 'build'),

    // vox implant account
    voxEngine: {
        appName: 'ingipro-practice',
        accountName: 'dovyden',
        accountPass: process.env.VOX_IMPLANT_PASS,
        userName: 'user1',
        userPass: 'foruser1'
    },

    // socket.io settings
    websockets: {
        path: '/ws',
        transports: ['websocket', 'polling']
    },

    // workers count
    workers: os.cpus().length
};
