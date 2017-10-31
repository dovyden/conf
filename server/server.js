'use strict';

const express = require('express');
const config = require('./libs/config');
const logger = require('./libs/logger');


// app
function configure(app) {
    app.disable('etag');
    app.disable('x-powered-by');
    app.set('case sensitive routing', true);
    app.set('env', process.env.NODE_ENV || 'development');
    app.set('strict routing', true);
    app.set('trust proxy', 1);
}

function useMiddlewares(app) {
    // prepare and start request handle
    require('./middlewares/init')(app);

    // serve static
    require('./middlewares/static')(app);

    // common middlewares
    require('./middlewares/ping')(app);
    require('./middlewares/cookie')(app);
    require('./middlewares/security')(app);

    // controllers
    require('./controllers')(app);
    require('./middlewares/errorhandler')(app);
}

// extend express
require('./libs/express-extensions');

// create app
const app = express();
const coreLogger = logger({namespace: 'Core'});

try {
    configure(app);
    useMiddlewares(app);

    // start listening for incoming requests
    app.listen(config.port, () => {
        coreLogger.log(`App is listening to requests (port ${config.port})`);
    });
} catch (ex) {
    coreLogger.error(`Configuring app error: ${ex.stack}`);
    process.exit(1);
}
