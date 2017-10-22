import * as types from '../constants/ActionTypes';

export const changeTabDocument = (id) => {
    return {
        type: types.CHANGE_TAB_DOCUMENT,
        payload: {
            id
        }
    };
};

export const changeTabVersion = (payload) => {
    return {
        type: types.CHANGE_TAB_VERSION,
        payload
    };
};
