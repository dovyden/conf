import {isPlainObject} from 'lodash';
import {stringify} from 'querystring';

const API_VERSION = 100;
const DEFAULT_HOST = 'https://knevod.com';
const DEFAULT_OPTIONS = {
    method: 'POST',
    blob: false,
    cache: 'no-store',
    credentials: 'omit',
    hostname: DEFAULT_HOST,
    mode: 'cors',
    retries: 3,
    retryInterval: 500
};

/**
 * fetch data from server with retries
 *
 * @param {string} resource
 * @param {Object} options
 * @param {number} [options.retries = 3] retries count
 * @param {number} [options.retryInterval = 1000] interval between attempts of data fetching
 */
export default function fetch(resource, options = {}) {
    const params = Object.assign({}, DEFAULT_OPTIONS, options);
    const {
        method,
        headers,
        query,
        body,
        hostname
    } = params;

    // url
    const qs = query ? `?${stringify(query)}` : '';
    const url = `${hostname}${resource}${qs}`;

    // headers
    if (!headers) {
        params.headers = {};
    }

    // body
    if (body) {
        if (method === 'GET') {
            params.body = null;
        } else if (isPlainObject(body)) {
            const data = hostname === DEFAULT_HOST ? Object.assign({api: API_VERSION}, body) : body;
            params.body = JSON.stringify(data);
        }
    }

    // be careful about retries count
    // we use POST request to fetch data because we send query data in POST body
    // retries count must be "1" for POST requests that changes data
    const retryWrapper = (counter) => new Promise((resolve, reject) => {
        window.fetch(url, params)
            .then(res => resolve(res))
            .catch(ex => {
                // auth error or retries counter is ended
                if (ex.code === 401 || counter >= params.retries) {
                    reject(ex);
                    return;
                }

                // try again
                return setTimeout(
                    () => retryWrapper(counter + 1),
                    counter * params.retryInterval
                );
            });
    });

    // run (first attempt)
    return retryWrapper(1);
}
