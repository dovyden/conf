'use strict';

const express = require('express');


/**
 * handles ping requests
 *
 * @param {Express} app
 */
module.exports = (app) => {
    const router = express.Router();

    router.get('/ping', (req, res) => {
        res.status(200).send('pong!\n');
    });

    app.use(router);
};
