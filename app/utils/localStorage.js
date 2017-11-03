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
        const serializedState = JSON.parse(localStorage.getItem(type));

        return serializedState ? {
            [type]: serializedState

        } : defaultValue;
    } catch (err) {
        return false;
    }
}
