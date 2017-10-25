const SALT = 42;

const encryptingKey = (key) => {
    let result = '';

    for (let i = 0; i < key.length; i++) {
        result += String.fromCharCode(SALT ^ key.charCodeAt(i));
    }
    return result;
};

export default encryptingKey;
