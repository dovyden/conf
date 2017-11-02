export const saveToLocalStorage = (payload) => {
    const serializedState = JSON.stringify(payload);
    try {
        localStorage.setItem('auth', serializedState);
    } catch (err) {
        return undefined;
    }
};
