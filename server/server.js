'use strict';

const cluster = require('cluster');
const config = require('./libs/config');
const logger = require('./libs/logger');
require('./utils/unhandled-errors');

// run cluster
if (cluster.isMaster) {
    const masterLogger = logger({namespace: 'Master'});
    masterLogger.log(`Master ${process.pid} is running`);

    cluster.on('message', (worker, message) => {
        const {type, payload} = message;

        switch (type) {
            case 'setItem':
            case 'removeItem':
            case 'EXAMPLE_UPDATE_DATA':
                masterLogger.info(`Message from worker (${worker.process.pid}): ${type}: ${payload}`);

                // resend message to other workers
                for (const id in cluster.workers) {
                    if (worker.id !== Number(id)) {
                        cluster.workers[id].send(message);
                    }
                }
                break;
        }
    });
    cluster.on('exit', (worker, code, signal) => {
        masterLogger.log(`Worker (${worker.process.pid}, ${code}, ${signal}) died, respawn...`);
        cluster.fork();
    });

    for (let i = 0; i < config.workers; i++) {
        cluster.fork();
    }
} else {
    const workerLogger = logger({namespace: 'Worker'});
    workerLogger.log(`Worker (${process.pid}) started`);

    require('./worker');
}
