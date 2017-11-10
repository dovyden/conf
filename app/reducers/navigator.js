import {STORE_NODES} from '../constants/navigator';

const initialState = {
    nodes: {},
    root: undefined
};

export default function navigatorReducer(state = initialState, {type, payload}) {
    switch (type) {
        case STORE_NODES: {
            let root = [];
            if (state.root !== undefined) {
                root = state.root;
            }
            for (const nodeId in payload) {
                if (nodeId['hier/parent'] === 0 && !root.includes(nodeId)) {
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
