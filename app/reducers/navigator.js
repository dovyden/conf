import {NODE_DOWNLOADED} from '../constants/navigator';

const initialState = {
    nodes: {},
    root: []
};

export default function navigatorReducer(state = initialState, {type, payload}) {
    switch (type) {
        case NODE_DOWNLOADED: {
            return {
                root: state.root,
                nodes: Object.assign(state.nodes, payload.nodes)
            };
        }
    }

    return state;
}
