'use strict';

const serveStatic = require('serve-static');
const config = require('../libs/config');


/**
 * checks it's asset request and return 404 Not Found
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {function} next
 */
function CheckStaticController(req, res, next) {
    // prevent handle assets request
    if (res.locals.isAsset) {
        res.status(404).end();
    } else {
        next();
    }
}

/**
 * serves static files
 *
 * @param {Express} app
 */
module.exports = (app) => {
    if (!config.static) {
        return;
    }

    app.use(serveStatic(config.static, {
        dotfiles: 'deny',
        redirect: false
    }));

    app.use(CheckStaticController);
};
