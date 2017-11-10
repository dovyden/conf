import {
    AUTH_FAIL,
    AUTH_SUCCESS
} from '../constants/auth';

const initialState = {
    key: '',
    token: '',
};

export default function user(state = initialState, {type, payload}) {
    switch (type) {

        case AUTH_SUCCESS:
            return {
                ...state,
                ...payload,
                error: {},
            };

        case AUTH_FAIL:
            const {
                code,
                message,
                isAuthenticated,
            } = payload;

            return {
                ...state,
                error: {
                    code,
                    message
                },
                isAuthenticated,
            };

        default:
            return state
    }
}
