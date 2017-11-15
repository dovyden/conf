'use strict';

const express = require('express');
const config = require('./libs/config');
const DataProvider = require('./libs/data-provider');
const logger = require('./libs/logger');

const Storage = require('./libs/storage');

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
const workerLogger = logger({namespace: 'Worker'});

const storage = new Storage();

// init voximplant
DataProvider.dataProvider('voximplant').getApiKey().then(() => {
    // configure app
    configure(app);
    useMiddlewares(app);

    // listen messages from master
    process.on('message', ({type, payload}) => {
        switch (type) {
            case 'setItem':
                storage.setItem(payload.key, payload.value);
                break;
            case 'removeItem':
                storage.removeItem(payload.key);
                break;
            case 'EXAMPLE_UPDATE_DATA':
                workerLogger.log(`Worker (${process.pid}) got message: ${type}: ${payload}`);
                break;
        }
    });

    setInterval(() => { // @todo remove example
        process.send({
            type: 'EXAMPLE_UPDATE_DATA',
            payload: `Worker (${process.pid}): ${Date.now()}`
        });
    }, 5000);

    // start listening for incoming requests
    const server = app.listen(config.port, () => {
        workerLogger.log(`Worker (${process.pid}) is listening to requests (port ${config.port})`);
    });
    // init websockets
    require('./websocket')(server);

}).catch(ex => {
    workerLogger.error(`Configuring worker (${process.pid}) error: ${ex.stack}`);
    process.exit(1);
});
