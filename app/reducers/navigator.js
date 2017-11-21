import {STORE_NODES} from '../constants/navigator';

const initialState = {
    nodes: {},
    root: undefined
};

export default function navigatorReducer(state = initialState, {type, payload}) {
    switch (type) {
        case STORE_NODES: {
            const {nodes, fetchRoot, downloadChildrenId} = payload;
            let root = state.root;
            if (fetchRoot) {
                root = [];
                for (const nodeId in payload) {
                    root.push(nodeId);
                }
            }
            const nodesMerged = Object.assign({}, state.nodes, nodes);
            if (downloadChildrenId !== undefined) {
                nodesMerged[downloadChildrenId].childrenDownloaded = true;
            }
            return {
                root,
                nodes: nodesMerged
            };
        }
    }
    return state;
}
