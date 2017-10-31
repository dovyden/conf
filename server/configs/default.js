'use strict';

const path = require('path');

const ROOT_DIR = process.cwd();
const appData = require(path.join(ROOT_DIR, 'package.json'));


module.exports = {
    // application data (package.json)
    app: appData,

    // backend list for data providers
    backend: {
        node: 'https://test.knevod.com/node'
    },

    // cookies parser
    // cookies: {
    //     secret: '2ea53d8'
    // },

    // server port
    port: process.env.APP_PORT || 80,

    // assets directory
    static: path.join(ROOT_DIR, 'build')
};
