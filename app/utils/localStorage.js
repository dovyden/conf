export const saveToLocalStorage = (type, payload) => {
    try {
        localStorage.setItem(type, payload);
    } catch (err) {
        return undefined;
    }
};

export const loadState = () => {
    try {
        const key = localStorage.getItem('key');
        const token = localStorage.getItem('token');
        return (key && token) ? {
            auth: {
                key,
                token
            }
        } : {};
    } catch (err) {
        return undefined;
    }
};
