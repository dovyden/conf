import {
    AUTH_SUCCESS,
    AUTH_FAIL
} from '../constants/auth';

import {fetchApi} from '../utils/fetch';
import {save} from '../utils/localStorage';

const successAuth = (key, token, login) => ({
    type: AUTH_SUCCESS,
    payload: {
        key,
        token,
        login,
        isAuthenticated: true
    }
});

const failAuth = (code, message, key) => ({
    type: AUTH_FAIL,
    payload: {
        code,
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
            const {
                token,
                login,
                error = false,
                message = '',
            } = json;

            if (error) {
                dispatch(failAuth(error, message, key));
            } else {
                dispatch(successAuth(key, token, login));

                save('auth', {
                    key,
                    token,
                    login,
                });
            }
        });
    };
};
