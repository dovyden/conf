'use strict';

const querystring = require('querystring');
const url = require('url');
const _ = require('lodash');


/**
 * @typedef {Object} RequestMeta
 * @property {boolean} error
 * @property {Object} request
 * @property {string} request.method
 * @property {string} request.url
 * @property {Object} request.headers
 * @property {string} request.curl
 * @property {Object} response
 * @property {number} response.statusCode
 * @property {Object} response.headers
 * @property {undefined|string} response.body
 */


/**
 * returns request method
 *
 * @param {Object} options
 * @return {string}
 */
function getRequestMethod(options) {
    return options.method || (options.body ? 'POST' : 'GET');
}

/**
 * returns request url
 *
 * @param {Object} options
 * @return {string}
 */
function getRequestUrl(options) {
    const parsedUrl = url.parse(options.url);  // @see `got` package

    // if `query` exists got replaces query string
    if (options.query) {
        parsedUrl.query = options.query;
        delete parsedUrl.search;
    }

    return url.format(parsedUrl);
}

/**
 * checks can body be stringified
 *
 * @param {*} body
 * @return {boolean}
 */
function canBodyBeStringified(body) {
    return _.isPlainObject(body) || Array.isArray(body);
}

/**
 * returns request headers
 *
 * @param {Object} options
 * @return {Object}
 */
function getRequestHeaders(options) {
    const headers = {
        'accept-encoding': 'gzip,deflate'
        // we replace `User-Agent` in HTTPDataProvider
    };

    // check `json` options
    if (options.json && options.headers.accept === undefined) {
        headers.accept = 'application/json';
    }

    // check body
    const {body, form, json} = options;

    if (body && !headers['content-type']) {
        const canBeStringified = canBodyBeStringified(body);

        if (body.getBoundary) {
            headers['content-type'] = `multipart/form-data; boundary=${body.getBoundary()}`;

        } else if (form && canBeStringified) {
            headers['content-type'] = 'application/x-www-form-urlencoded';

        } else if (json && canBeStringified) {
            headers['content-type'] = 'application/json';
        }
    }

    // check custom agent (default agent hasn't keep alive)
    if (options.agent && options.agent.keepAlive) {
        // `Agent` don't send `Keep-Alive` header (for example `Keep-Alive: timeout=5, max=1000`)
        headers.connection = 'Keep-Alive';
    }

    return Object.assign(headers, options.headers);
}

/**
 * returns curl version of request
 *
 * @param {Object} options
 * @param {string} options.method
 * @param {*} options.body
 * @return {string}
 */
function buildCurlRequest(options) {
    const url = getRequestUrl(options);

    // method
    const method = getRequestMethod(options);

    // headers
    const requestHeaders = getRequestHeaders(options);
    const headers = [];

    for (const header in requestHeaders) {
        headers.push(`-H "${header}: ${requestHeaders[header]}"`);
    }

    // body
    const {body, form, json} = options;
    let payload;

    if (body) {
        const canBeStringified = canBodyBeStringified(body);

        if (body.getBoundary) {
            payload = '-d \'<multipart form data>\'';

        } else if (form && canBeStringified) {
            payload = `-d '${querystring.stringify(options.body)}'`;

        } else if (json && canBeStringified) {
            payload = `-d '${JSON.stringify(options.body)}'`;

        } else if (typeof body === 'string') {
            payload = `-d '${body}'`;
        }
    }

    // eslint-disable-next-line prefer-template
    return `curl -i -X ${method} "${url}" ${headers.join(' ')}${payload ? ' ' + payload : ''}`;
}

/**
 * returns request meta data:
 *  - error status
 *  - request data
 *  - response data
 *
 * @param {Error} err
 * @param {Object|null} res
 * @param {number} res.statusCode
 * @param {Object} res.headers
 * @param {Object|string} res.body
 * @param {Object} options
 * @return {RequestMeta}
 */
module.exports = function getRequestMeta(err, res, options) {
    let statusCode = 0;

    if (err) {
        if (['ESOCKETTIMEDOUT', 'ETIMEDOUT'].includes(err.code)) {
            statusCode = 499;
        } else {
            // `statusCode` can be `undefined`, for example when request error is "getaddrinfo ENOTFOUND"
            statusCode = err.statusCode || 500;
        }
    } else {
        statusCode = res.statusCode;
    }

    return {
        type: 'http',
        error: err instanceof Error,
        request: {
            method: getRequestMethod(options),
            url: getRequestUrl(options),
            headers: getRequestHeaders(options),
            curl: buildCurlRequest(options)
        },
        response: {
            statusCode,
            headers: res ? res.headers : undefined,
            body: res ? res.body : undefined
        },
        timing: Date.now() - options.startTime
    };
};
