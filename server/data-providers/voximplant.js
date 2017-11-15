'use strict';

const config = require('../libs/config');
const HTTPDataProvider = require('../libs/http-data-provider');

const {
    accountName,
    accountPass
} = config.voxEngine;
const TIMEOUT = 1000;


class VoxImplantDataProvider extends HTTPDataProvider {
    getApiKey() {
        if (this._apiKey) {  // check api was inited
            return Promise.resolve({
                accountId: this._accountId,
                apiKey: this._apiKey,
                sessionId: this._sessionId
            });
        }

        return this._fetch('voximplant', 'Logon', {
            method: 'POST',
            body: {
                account_name: accountName,
                account_password: accountPass
            },
            form: true,
            timeout: TIMEOUT
        }).then(res => {
            const {
                account_id: accountId,
                api_key: apiKey,
                result: sessionId
            } = res.data;

            // store creditionals in instance
            this._accountId = accountId;
            this._apiKey = apiKey;
            this._sessionId = sessionId;

            return {
                accountId,
                apiKey,
                sessionId
            };
        });
    }
}

module.exports = VoxImplantDataProvider;
