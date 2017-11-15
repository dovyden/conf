'use strict';

class Storage {
    constructor() {
        if (Storage.instance) {
            return Storage.instance;
        }

        this.data = {};

        Storage.instance = this;
    }

    setItem(key, value) {
        this.data[key] = value;

        process.send({
            type: 'setItem',
            payload: {
                key,
                value
            }
        });
    }

    getItem(key) {
        return this.data[key];
    }

    removeItem(key) {
        delete this.data[key];

        process.send({
            type: 'removeItem',
            payload: {
                key
            }
        });
    }
}

module.exports = Storage;
