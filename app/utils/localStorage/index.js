export const loadFromLocalStorage = () => {
    try {
        const token = localStorage.getItem('token');
        if (token === null) {
            return false;
        }
        return token;
    } catch (err) {
        return undefined;
    }
};

export const saveToLocalStorage = (type, payload) => {
    try {
        localStorage.setItem(type, payload);
    } catch (err) {
        return undefined;
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return {};
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
