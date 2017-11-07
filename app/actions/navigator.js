import {STORE_NODES, NODE_ATTRS_TO_DESERIALIZE, DEFAULT_NODE_ATTRS} from '../constants/navigator';

import {fetchApi} from '../utils/fetch';

const deserialize = (json) => {
    const nodes = json.nodes;
    const result = {};
    for (const nodeId in nodes) {
        const node = {};
        for (const propId in nodes[nodeId]) {
            if (NODE_ATTRS_TO_DESERIALIZE.includes(propId)) {
                node[propId] = JSON.parse(nodes[nodeId][propId]);
            } else {
                node[propId] = nodes[nodeId][propId];
            }
        }
        result[nodeId] = node;
    }
    return result;
};

export const fetchNodes = (query, attrs = DEFAULT_NODE_ATTRS) => {
    return (dispatch) => {
        fetchApi('node/SEARCH', {body: {
            query,
            attrs
        }}).then(res => {
            return res.json();
        }).then(
            (json) => {
                const data = deserialize(json);
                dispatch({
                    type: STORE_NODES,
                    payload: data
                });
            }
        );
    };
};
