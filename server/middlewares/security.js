'use strict';

/**
 * sets security headers
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {function} next
 */
function SecurityController(req, res, next) {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'DENY');

    next();
}

/**
 * enable security headers
 *
 * @param {Express} app
 */
module.exports = (app) => {
    app.use(SecurityController);
};
