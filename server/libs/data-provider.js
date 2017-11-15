'use strict';

const logger = require('../libs/logger');

const CACHE = Object.create(null);


class DataProvider {
    /**
     * DataProvider constructor
     *
     * @constructor
     * @param {string} name
     */
    constructor(name) {
        this._name = name;
        this._logger = logger({namespace: `DataProvider:${name}`});
    }

    /**
     * returns data provider
     *
     * @param {string} name
     * @return {DataProvider}
     */
    static dataProvider(name) {
        if (CACHE[name]) {
            return CACHE[name];
        }

        const DataProvider = require(`../data-providers/${name}`);
        CACHE[name] = new DataProvider(name);

        return CACHE[name];
    }
}

module.exports = DataProvider;
