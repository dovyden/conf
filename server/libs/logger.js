'use strict';

const dominoLogger = require('domino-logger');
const appLogger = dominoLogger('app');


module.exports = function loggerFactory(options) {
    // prevent errors emitting
    options.emitErrors = false;

    return appLogger(options);
};
