'use strict';

const HTTPDataProvider = require('../libs/http-data-provider');


class NodeDataProvider extends HTTPDataProvider {
    getRootNodes() {
        return this._fetch('node', 'SEARCH', {
            method: 'POST',
            headers: {
                origin: 'https://test.knevod.com'
            },
            body: {
                api: 100500,
                token: 'nop',
                query: '$$TYPE$$ = \'NODE\' AND $$hier/parent$$ = \'\'',
                attrs: [
                    'TYPE',
                    'name1',
                    'name2',
                    'journalId',
                    'doc/versions',
                    'hier/parent',
                    'hier/children',
                    'removed',
                    'sec/mode',
                    'sec/owner',
                    'sec/group'
                ]
            }
        }).then(res => res.data);
    }
}

module.exports = NodeDataProvider;
