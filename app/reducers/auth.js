import {
    AUTH_FAIL,
    AUTH_SUCCESS
} from '../constants/auth';

export default function user(state = {}, action) {
    switch (action.type) {

        case AUTH_SUCCESS:
            return {...state,
                key: action.payload.key,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated
            };

        case AUTH_FAIL:
            return {...state,
                error: action.payload.error,
                message: action.payload.message,
                isAuthenticated: action.payload.isAuthenticated
            };

        default:
            return state
    }
}
