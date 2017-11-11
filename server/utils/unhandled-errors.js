'use strict';

const logger = require('../libs/logger');
const errorLogger = logger({namespace: 'Error'});

process.on('uncaughtException', (err) => {
    errorLogger.error(`Uncaught exception: ${err.stack}`);
});

process.on('unhandledRejection', (reason) => {
    errorLogger.warn(`Unhandled rejection of promise: ${reason.stack}`);
});
