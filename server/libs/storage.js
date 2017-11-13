'use strict';

class Storage {
    constructor() {
        if (Storage.instance) {
            return Storage.instance;
        }

        this.obj = {};

        Storage.instance = this;
    }

    put(key, data) {
        if (!this.obj[key]) {
            this.obj[key] = [];
        }

        this.obj[key].push(data);
    }

    getAll(key) {
        return this.obj[key] ? this.obj[key] : null;
    }

    get(key, field, value) {
        for (let i = 0; i < this.obj[key].length; i++) {
            if (this.obj[key][i][field] === value) {
                return this.obj[key][i];
            }
        }

        return null;
    }

    removeAll(key) {
        delete this.obj[key];
    }

    remove(key, field, value) {
        for (let i = 0; i < this.obj[key].length; i++) {
            if (this.obj[key][i][field] === value) {
                delete this.obj[key][i];
                return;
            }
        }
    }

    clear() {
        this.obj = {};
    }
}

module.exports = Storage;
