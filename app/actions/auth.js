import {
    AUTH_SUCCESS,
    AUTH_FAIL
} from '../constants/auth';

import {fetchApi} from '../utils/fetch';
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
        fetchApi('user/AUTH', {body: {
            key
        }}).then(res => {
            return res.json();
        }).then(json => {
            if (json.error) {
                dispatch(failAuth(json, key));
            } else {
                dispatch(successAuth(key, json.token, json.login));

                saveToLocalStorage({
                    key,
                    token: json.token,
                    login: json.login,
                });
            }
        });
    };
};
