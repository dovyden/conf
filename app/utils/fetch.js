import {isPlainObject} from 'lodash';
import {stringify} from 'querystring';
import store from './store';

const API_VERSION = 100;
const DEFAULT_HOST = 'https://knevod.com';
const DEFAULT_API_OPTIONS = {
    method: 'POST',
    blob: false,
    cache: 'no-store',
    credentials: 'omit',
    mode: 'cors'
};
const DEFAULT_OPTIONS = {
    method: 'GET',
    retries: 3,
    retryInterval: 500
};

/**
 * fetch data from server with retries
 *
 * @param {string} resource
 * @param {Object} options
 * @param {string} [options.method = GET]
 * @param {Object} [options.headers]
 * @param {Object} [options.query]
 * @param {string|FormData} [options.body]
 * @param {number} [options.retries = 3] retries count
 * @param {number} [options.retryInterval = 1000] interval between attempts of data fetching
 * @return {Promise.<Response>}
 */
export default function fetch(resource, options = {}) {
    const params = Object.assign({}, DEFAULT_OPTIONS, options);

    // build url
    const {query} = params;
    const qs = query ? `?${stringify(query)}` : '';
    const url = `${resource}${qs}`;

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

/**
 * fetch data from api
 *
 * @param {string} resource
 * @param {Object} options
 * @param {string} [options.method = POST]
 * @param {Object} [options.headers]
 * @param {Object} [options.query]
 * @param {string|FormData|Object} [options.body]
 * @return {Promise.<Response>}
 */
export function fetchApi(resource, options = {}) {
    const params = Object.assign({}, DEFAULT_API_OPTIONS, options);
    const {
        method,
        body
    } = params;

    // build url
    const url = `${DEFAULT_HOST}/${resource}`;

    // prepare body
    if (body) {
        if (method === 'GET') {
            params.body = null;

        } else if (isPlainObject(body)) {
            const data = Object.assign({
                api: API_VERSION,
                token: store.getState().auth.token
            }, body);
            params.body = JSON.stringify(data);
        }
    }

    return fetch(url, params);
}
