import {STORE_NODES} from '../constants/navigator';

const initialState = {
    nodes: {},
    root: undefined
};

export default function navigatorReducer(state = initialState, {type, fetchRoot, payload}) {
    switch (type) {
        case STORE_NODES: {
            let root = state.root;
            if (fetchRoot) {
                root = [];
                for (const nodeId in payload) {
                    root.push(nodeId);
                }
            }
            return {
                root,
                nodes: Object.assign({}, state.nodes, payload)
            };
        }
    }
    return state;
}
