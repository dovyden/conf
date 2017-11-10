'use strict';

const crypto = require('crypto');
const os = require('os');
const express = require('express');
const logger = require('./logger');


/**
 * returns random request id
 *
 * @link https://github.com/hhru/nginx_requestid
 *
 * @return {string}
 */
express.request.getRequestId = (() => {
    const hostname = os.hostname();
    const pid = process.pid.toString();

    return function getRequestId() {
        return crypto.createHash('md5')
            .update(hostname)
            .update(pid)
            .update(Date.now().toString())
            .update(Math.random().toString())
            .digest('hex');
    };
})();

/**
 * return instance of data provider by name
 *
 * @param {string} name
 * @return {DataProvider}
 */
express.request.dataProvider = function dataProvider(name) {
    this._dataProviders = this._dataProviders || {};

    if (this._dataProviders[name]) {
        return this._dataProviders[name];
    }

    const DataProvider = require(`../data-providers/${name}`);
    this._dataProviders[name] = new DataProvider(this);

    return this._dataProviders[name];
};

/**
 * handles response end
 *
 * @param {*} args
 * @return {*}
 */
const originalResponseEnd = express.response.end;
express.response.end = function ExpressCustomResponseEnd(...args) {
    const {req} = this;
    const requestLogger = logger({req, namespace: 'request'});

    const requestTime = Date.now() - this.locals.requestStartTime;
    const requestType = req.xhr ? 'xhr' : 'normal';

    const message = this.locals.isAsset
        ? 'Asset process time: %dms, status %d, %s %s (%s)'
        : 'Request process time: %dms, status %d, %s %s (%s)';

    requestLogger.log(
        message,
        requestTime,
        this.statusCode,
        req.method,
        req.originalUrl,
        requestType
    );

    return originalResponseEnd.apply(this, args);
};
