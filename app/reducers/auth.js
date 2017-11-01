/**
 * @typedef {Object} authState
 * @property {string} key
 * @property {string} token
 */

const initialState = {
    key: '',
    token: ''
};

/**
 * auth reducer
 *
 * @param {authState} state
 * @param {string} type
 * @param {*} payload
 * @return {authState}
 */
export default function authReducer(state = initialState/* , {type, payload}*/) {
    return state;
}
