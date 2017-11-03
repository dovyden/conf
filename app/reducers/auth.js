import {
    AUTH_FAIL,
    AUTH_SUCCESS
} from '../constants/auth';

const initialState = {
    key: null,
    token: null,
};

export default function user(state = initialState, action) {
    switch (action.type) {

        case AUTH_SUCCESS:
            return {...state,
                key: action.payload.key,
                token: action.payload.token,
                login: action.payload.login,
                isAuthenticated: action.payload.isAuthenticated,
                error: {}
            };

        case AUTH_FAIL:
            return {...state,
                error: {
                    code: action.payload.error,
                    message: action.payload.message
                },
                isAuthenticated: action.payload.isAuthenticated
            };

        default:
            return state
    }
}
