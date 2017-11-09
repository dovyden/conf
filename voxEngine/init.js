'use strict';

const config = require('./server/libs/config');
const logger = require('./server/libs/logger');
const got = require('got');

const voxLogger = logger({namespace: 'Vox'});
const {accountName, accountPass} = config.voxEngine;
const url = 'https://api.voximplant.com/platform_api/Logon';
const options = {
    query: {
        account_name: accountName,
        account_password: accountPass
    }
};

let accountId;
let apiKey;

module.exports.voxInit = () => {
    got(url, options)
        .then(response => {
            const res = JSON.parse(response.body);
            accountId = res.account_id;
            apiKey = res.api_key;
        })
        .catch(error => {
            voxLogger(error);
        });
};

module.exports.accountId = accountId;
module.exports.apiKey = apiKey;
