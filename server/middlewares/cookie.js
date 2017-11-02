'use strict';

const cookieParser = require('cookie-parser');
const config = require('../libs/config');


/**
 * parse cookies
 *
 * @param {Express} app
 */
module.exports = (app) => {
    if (!config.cookies) {
        return;
    }

    // parse cookies
    app.use(cookieParser(config.cookies.secret));
};
