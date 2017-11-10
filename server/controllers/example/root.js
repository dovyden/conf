'use strict';

module.exports = function RootController(req, res, next) {
    req.dataProvider('example').getRootNodes().then(data => {
        res.json(data);
    }).catch(next);
};
