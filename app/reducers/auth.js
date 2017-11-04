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
            const {
                key,
                token,
                login,
                isAuthenticated,
            } = payload;

            return {...state,
                key,
                token,
                login,
                isAuthenticated,
                error: {}
            };

        case AUTH_FAIL:
            const {
                error,
                message,
            } = payload;

            return {...state,
                error: {
                    code: error,
                    message
                }
            };

        default:
            return state
    }
}
