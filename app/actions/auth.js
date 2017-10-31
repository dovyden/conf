import {
    AUTH_SUCCESS,
    AUTH_FAIL
} from '../constants/auth';

import fetch from '../utils/fetch';
import {saveToLocalStorage} from '../utils/localStorage';

const successAuth = (key, token, login) => ({
    type: AUTH_SUCCESS,
    payload: {
        key,
        token,
        login,
        isAuthenticated: true
    }
});

const failAuth = ({error, message}, key) => ({
    type: AUTH_FAIL,
    payload: {
        error,
        message: `${message}: ${key}`,
        isAuthenticated: false
    }
});

export const authentication = (key) => {
    return (dispatch) => {
        fetch('/user/AUTH', {body: {
            key
        }}).then(res => {
            return res.json();
        }).then(json => {
            if (json.error) {
                dispatch(failAuth(json, key));
            } else {
                dispatch(successAuth(key, json.token, json.login));

                // what should I do with json.login?
                saveToLocalStorage('key', key);
                saveToLocalStorage('token', json.token);
                saveToLocalStorage('login', json.login);
            }
        });
    };
};
