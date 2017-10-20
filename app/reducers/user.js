import {
    AUTH_REQUEST,
    AUTH_FAIL,
    AUTH_SUCCESS
} from '../constants/user';

export default function user(state = {}, action) {
    switch (action.type) {

        case AUTH_REQUEST:
            return {...state,
                loading: action.payload.loading
            };

        case AUTH_SUCCESS:
            return {...state,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
                loading: action.payload.loading
            };

        case AUTH_FAIL:
            return state;

        default:
            return state
    }
}
