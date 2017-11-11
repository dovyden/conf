'use strict';

const config = require('../libs/config');
const HTTPDataProvider = require('../libs/http-data-provider');

const {
    accountName,
    accountPass
} = config.voxEngine;


class VoxImplantDataProvider extends HTTPDataProvider {
    getApiKey() {
        if (this._apiKey) {  // check api was inited
            return Promise.resolve({
                accountId: this._accountId,
                apiKey: this._apiKey
            });
        }

        return this._fetch('voximplant', 'Logon', {
            query: {
                account_name: accountName,
                account_password: accountPass
            }
        }).then(res => {
            const {
                account_id: accountId,
                api_key: apiKey
            } = res.data;

            // store creditionals in instance
            this._accountId = accountId;
            this._apiKey = apiKey;

            return {
                accountId,
                apiKey
            };
        });
    }
}

module.exports = VoxImplantDataProvider;
