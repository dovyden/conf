'use strict';

const logger = require('../libs/logger');


class DataProvider {
    /**
     * DataProvider constructor
     *
     * @constructor
     * @param {Express.Request} req
     * @param {string} name
     */
    constructor(req, name) {
        this._req = req;
        this._name = name;
        this._logger = logger(req, `dataprovider:${name}`);
    }

    /**
     * returns data provider
     *
     * @param {string} name
     * @return {DataProvider}
     */
    dataProvider(name) {
        return this._req.dataProvider(name);
    }
}

module.exports = DataProvider;
