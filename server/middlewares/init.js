'use strict';

const config = require('../libs/config');
const logger = require('../libs/logger');

const reAsset = /\.(html?|txt|xml|css|js|json|gif|ico|jpe?g|png|svg|eot|otf|ttf|woff2?)$/i;


/**
 * init base structures of request
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {function} next
 */
function InitController(req, res, next) {
    // track request process time
    res.locals.requestStartTime = Date.now();

    // set request uuid
    req.uuid = req.get('X-Request-Id') || req.getRequestId();

    // check asset request
    const isAsset = reAsset.test(req.path);
    res.locals.isAsset = isAsset;

    // prevent handle assets if no static dir
    if (isAsset && !config.static) {
        res.status(404).end();
        return;
    }

    // log request
    const requestLogger = logger({req, namespace: 'request'});
    const requestType = req.xhr ? 'xhr' : 'normal';
    requestLogger.log(`Request processing starts: ${req.originalUrl} (${requestType})`);

    next();
}

/**
 * init request
 *
 * @param {Express} app
 */
module.exports = (app) => {
    app.use(InitController);
};
