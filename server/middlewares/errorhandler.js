'use strict';

const {STATUS_CODES} = require('http');
const logger = require('../libs/logger');


/**
 * handles errors
 *
 * @param {Error} err
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {function} next
 */
function ErrorHandlerController(err, req, res, next) { // eslint-disable-line no-unused-vars
    const errorLogger = logger({req, namespace: 'ErrorHandler'});
    const isStatusCode = (typeof err === 'number');
    const statusCode = isStatusCode ? err : 500;

    // log error
    errorLogger.error('Error: %s', err);
    if (!isStatusCode) {
        errorLogger.error('Stack: %s', err.stack);
    }

    errorLogger.error('Request query: %j', req.query);
    errorLogger.error('Request body: %j', req.body);

    // return error
    const errorObj = isStatusCode
        ? new Error(`${err}: ${STATUS_CODES[err]}`)
        : err;
    const errorCode = errorObj.code || statusCode;

    res.status(statusCode);

    if (req.xhr || (req.accepts('json, text') === 'json')) {
        res.send({
            status: 'ERROR',
            code: isStatusCode ? err : errorCode,
            message: errorObj.message,
            stack: errorObj.stack,
            requestId: req.uuid
        });
    } else {
        res.send(
            `ERROR: (${isStatusCode ? err : errorCode}) ${errorObj.message}\n\n`
            + `requestId: ${req.uuid}\n`
            + `stack: ${errorObj.stack}`
        );
    }
}

/**
 * error handler
 *
 * @param {Express} app
 */
module.exports = (app) => {
    app.use(ErrorHandlerController);
};
