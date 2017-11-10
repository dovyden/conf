'use strict';

module.exports = (app) => {
    app.use(require('./example'));
    app.use(require('./conference'));
};

