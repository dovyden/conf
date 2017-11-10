'use strict';

const path = require('path');
const _ = require('lodash');

process.env.APP_ENV = process.env.APP_ENV || 'development';
const environment = process.env.APP_ENV;


function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

module.exports = ['default', environment].reduce((memo, name) => {
    try {
        const configPath = require.resolve(path.join('..', 'configs', name));
        const data = require(configPath);

        return _.mergeWith(memo, data, customizer);
    } catch (ex) {
        return memo;
    }
}, {});
