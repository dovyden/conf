import {CHANGE_TAB_DOCUMENT, CHANGE_TAB_VERSION} from '../constants/ActionTypes';

const initialState = {
    documents: {}
};

const activeTab = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case CHANGE_TAB_DOCUMENT:
            if (newState.documents[action.payload.id]) {
                delete newState.documents[action.payload.id];
            } else {
                newState.documents[action.payload.id] = {
                    versions: {}
                };
            }
            return newState;

        case CHANGE_TAB_VERSION:
            if (newState.documents[action.payload.idDocument].versions[action.payload.idVersion]) {
                delete newState.documents[action.payload.idDocument].versions[action.payload.idVersion];
            } else {
                newState.documents[action.payload.idDocument].versions[action.payload.idVersion] = {
                    tasks: {}
                };
            }
            return newState;

        default:
            return state;
    }
};

export default activeTab;
