export function save(key, value) {
    const serializedState = JSON.stringify(value);
    try {
        localStorage.setItem(key, serializedState);
        return true;

    } catch (err) {
        return false;
    }
}

export function load(key) {
    try {
        const item = localStorage.getItem(key);
        return JSON.parse(item) || undefined;

    } catch (err) {
        return false;
    }
}
