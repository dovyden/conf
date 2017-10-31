'use strict';

const http = require('http');
const https = require('https');
const querystring = require('querystring');
const got = require('got');
const isRetryAllowed = require('is-retry-allowed');
const config = require('./config');
const DataProvider = require('./data-provider');
const {keysToLowerCase} = require('../utils');
const getRequestMeta = require('../utils/request-meta');

const {APP_ENV} = process.env;
const IS_DEVELOPMENT = APP_ENV === 'development';

const DEFAULT_TIMEOUT = 300;
const USER_AGENT = `${config.app.name}/${config.app.version}`;
const AGENTS = {
    http: new http.Agent({
        keepAlive: true
    }),
    https: new https.Agent({
        keepAlive: true
    }),
    unauthorized: new https.Agent({
        keepAlive: true,
        rejectUnauthorized: false
    })
};


class HttpDataProvider extends DataProvider {
    /**
     * fetch backend resource
     *
     * @param {string} backend
     * @param {string} path
     * @param {Object} [params]
     *   @param {string} [params.method = 'GET']
     *   @param {Object} [params.headers]
     *   @param {Object} [params.cookie]
     *   @param {Object} [params.query]
     *   @param {Buffer|FormData|Object|string} [params.body]
     *   @param {boolean} [params.form = false]
     *   @param {boolean} [params.json = true]
     *   @param {number} [params.timeout = DEFAULT_TIMEOUT]
     *   @param {boolean} [params.followRedirect = false]
     *   @param {number} [params.retries = 3]
     *   @param {boolean} [params.strict = true]
     *   @param {http.Agent} [params.agent]
     * @return {Promise}
     */
    _fetch(backend, path, params = {}) {
        if (!backend) {
            return Promise.reject(new Error('HttpDataProvider#_fetch: backend not defined'));
        }

        const url = `${config.backend[backend]}/${path}`;

        // custom headers
        const headers = {};

        if (this._req.headers['x-forwarded-for'] || this._req.headers['x-real-ip'] || this._req.ip) {
            headers['x-forwarded-for'] = this._req.headers['x-forwarded-for'] ||
                this._req.headers['x-real-ip'] ||
                this._req.ip;
        }

        // handle cookies
        if (params.cookie && Object.keys(params.cookie).length) {
            headers.cookie = querystring.stringify(params.cookie, '; ', '=');
        }

        // handle retries (POST isn't idempotent method)
        const retries = params.retries || (params.method === 'POST' || params.body ? 0 : 3);

        // choose Agent
        let agent;

        if ('agent' in params) {  // can be `false` or `undefined`
            agent = params.agent;
        } else if (/^https:/.test(url)) {  // is secure connection
            agent = ('strict' in params) && !params.strict ? AGENTS.unauthorized : AGENTS.https;
        } else {
            agent = AGENTS.http;
        }

        // request options
        const options = {
            url,  // for request meta builder
            method: params.method,  // GET by default (or POST if body exists)
            headers: Object.assign({'user-agent': USER_AGENT}, headers, keysToLowerCase(params.headers)),
            query: params.query,
            body: params.body,
            form: params.form,
            json: params.json || true,
            followRedirect: params.followRedirect || false,
            retries: this._getRetriesHandler(retries),
            timeout: params.timeout || DEFAULT_TIMEOUT,
            agent,
            startTime: Date.now()
        };

        return got(url, options).then(res => {
            this._log(null, res, options);

            const {statusCode, headers, body} = res;

            return {
                statusCode,
                headers: keysToLowerCase(headers),
                data: body
            };
        }).catch(err => {
            this._log(err, null, options);

            throw err;
        });
    }

    /**
     * returns request retries handler
     *
     * @private
     * @param {number} retries
     * @return {retriesHandler}
     */
    _getRetriesHandler(retries) {
        let count = 0;

        function retriesHandler(retry, err) {
            if (retry > retries || !isRetryAllowed(err)) {
                return 0;
            }

            count++;  // log retries
            return 1000 * Math.pow(2, retry) + Math.random() * 100;  // delay
        }
        retriesHandler.getCount = () => count;

        return retriesHandler;
    }

    /**
     * logging request
     *
     * @private
     * @param {Error|null} err
     * @param {Object|null} res
     * @param {Object} options
     */
    _log(err, res, options) {
        const meta = getRequestMeta(err, res, options);
        const retries = options.retries.getCount();

        // log timing
        const message = retries > 0
            ? '[%s] %s %s %d ms (retries: %d)'
            : '[%s] %s %s %d ms';  // don't show zero retries
        const params = [
            meta.response.statusCode,
            meta.request.method,
            meta.request.url,
            meta.timing
        ];

        if (retries > 0) {
            params.push(retries);
        }

        this._logger.log(message, ...params);

        // log error
        if (err) {
            this._logger.error('Request error: %s', err.message);

            if (IS_DEVELOPMENT) {
                this._logger.error(meta.request.curl);
            }
        }
    }
}

module.exports = HttpDataProvider;
