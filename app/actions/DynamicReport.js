import {CHANGE_TAB_DOCUMENT, CHANGE_TAB_VERSION} from '../constants/ActionTypes';

export const changeTabDocument = (id) => {
    return {
        type: CHANGE_TAB_DOCUMENT,
        payload: {
            id
        }
    };
};

export const changeTabVersion = (payload) => {
    return {
        type: CHANGE_TAB_VERSION,
        payload
    };
};
