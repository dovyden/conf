import {
    AUTH_SUCCESS,
    AUTH_FAIL
} from '../constants/auth';

import fetch from '../utils/fetch';
import {saveToLocalStorage} from '../utils/localStorage/';

const successAuth = (key, token) => ({
    type: AUTH_SUCCESS,
    payload: {
        key,
        token,
        isAuthenticated: true,
    }
});

const failAuth = ({error, message}) => ({
    type: AUTH_FAIL,
    payload: {
        error,
        message,
        isAuthenticated: false,
    }
});

export const authentication = (key) => {
    return (dispatch) => {
        fetch('/user/AUTH', {body: {
            key,
            api: 100
        }}).then(res => {
            return res.json();
        }).then(json => {

            if (json.error) {
                dispatch(failAuth(json));
            } else {
                dispatch(successAuth(key, json.token));

                // what should I do with json.login?
                saveToLocalStorage('key', key);
                saveToLocalStorage('token', json.token);
            }
        });
    };
};
