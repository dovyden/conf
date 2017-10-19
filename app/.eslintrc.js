module.exports = {
    "env": {
        "browser": true,
        "commonjs": false,
        "es6": true,
        "jest": true,
        "node": false
    },
    "globals": {
        // prevent marking of `process.env` in JSX as error
        "process": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    }
};
