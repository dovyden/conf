import {
    AUTH_REQUEST,
    AUTH_SUCCESS
} from '../constants/auth';
import {
    ROUTING
} from '../constants/routing';
import {saveToLocalStorage} from '../utils/localStorage/';

const requestAuth = () => ({
    type: AUTH_REQUEST,
    payload: {
        loading: true
    }
});

const successAuth = (key, token) => ({
    type: AUTH_SUCCESS,
    payload: {
        key,
        token,
        isAuthenticated: true,
        loading: false
    }
});

const routeTo = (url, push) => ({
    type: ROUTING,
    payload: {
        method: push,
        nextUrl: url
    }
});

export const login = (payload) => {
    return (dispatch) => {
        dispatch(requestAuth());

        /* Imitate request on backend to get token */
        setTimeout(() => {
            dispatch(successAuth(payload.key));
            const token = Math.random();
            saveToLocalStorage('key', payload.key);
            saveToLocalStorage('token', token);
            dispatch(routeTo('/', payload.push));
        }, 2000);
    };
};
