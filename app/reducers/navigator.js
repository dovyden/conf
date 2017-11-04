import {NODE_DOWNLOADED} from '../constants/navigator';

const initialState = {
    nodes: {}
};

export default function navigatorReducer(state = initialState, {type, payload}) {
    switch (type) {
        case NODE_DOWNLOADED: {
            let root = [];
            if (state.root === undefined) {
                for (const key in payload) {
                    if (payload.hasOwnProperty(key)) {
                        root.push(key);
                    }
                }
            } else {
                root = state.root;
            }
            return {
                root,
                nodes: Object.assign(state.nodes, payload)
            };
        }
    }
    return state;
}
