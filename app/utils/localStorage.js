export function save(key, value) {
    const serializedState = JSON.stringify(value);
    try {
        localStorage.setItem(key, serializedState);
        return true;

    } catch (err) {
        return false;
    }
}

export function load(key, defaultValue) {
    try {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : defaultValue;

    } catch (err) {
        return defaultValue;
    }
}
