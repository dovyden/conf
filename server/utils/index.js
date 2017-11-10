'use strict';

/**
 * convert object keys to lowercase
 *
 * @param {Object} object
 * @return {Object}
 */
exports.keysToLowerCase = function keysToLowerCase(object = {}) {
    return Object.keys(object).reduce((memo, key) => {
        memo[key.toLowerCase()] = object[key];

        return memo;
    }, {});
};
