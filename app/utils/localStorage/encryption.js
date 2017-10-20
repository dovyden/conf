const SELT = 42;

const encryptingKey = (key) => {
    let result = '';

    for (let i = 0; i < key.length; i++) {
        result += String.fromCharCode(SELT ^ key.charCodeAt(i));
    }
    return result;
};

export default encryptingKey;
