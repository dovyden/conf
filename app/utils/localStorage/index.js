import encryptingKey from './encryption';

export const loadFromLocalStorage = () => {
    try {
        const key = localStorage.getItem('key');
        if (key === null) {
            return false;
        }
        return key;
    } catch (err) {
        return undefined;
    }
};

export const saveToLocalStorage = (type, payload) => {
    try {
        if (type === 'key') {
            const encryptKey = encryptingKey(payload);
            localStorage.setItem('key', encryptKey);
        } else {                                                    // Token
            localStorage.setItem('token', payload);
        }
    } catch (err) {
        return undefined;
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        return undefined;
    }
};
