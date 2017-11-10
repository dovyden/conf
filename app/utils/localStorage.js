export function save(type, payload) {
    const serializedState = JSON.stringify(payload);
    try {
        localStorage.setItem(type, serializedState);
        return true;
    } catch (err) {
        return false;
    }
}

export function load(type, defaultValue = {}) {
    try {
        const item = localStorage.getItem(type);
        return JSON.parse(item);
    } catch (err) {
        return defaultValue;
    }
}
