import {
    AUTH_REQUEST,
    AUTH_SUCCESS
} from '../constants/user';
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

const successAuth = (key) => ({
    type: AUTH_SUCCESS,
    payload: {
        key,
        token: Math.random(),
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
            saveToLocalStorage('key', payload.key);
            dispatch(routeTo('/', payload.push));
        }, 2000);
    };
};

export const logout = () => {
    return {
        type: AUTH_SUCCESS
    };
};
