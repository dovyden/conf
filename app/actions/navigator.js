import {NODE_DOWNLOADED} from '../constants/navigator';

import {fetchApi} from '../utils/fetch';

const deserialize = (json) => {
    const nodes = json.nodes;
    const result = {};
    for (const key1 in nodes) {
        if (!nodes.hasOwnProperty(key1)) {
            continue;
        }
        const node = {};
        for (const key2 in nodes[key1]) {
            if (!nodes[key1].hasOwnProperty(key2)) {
                continue;
            }
            try {
                node[key2] = JSON.parse(nodes[key1][key2]);
            } catch (SyntaxError) {
                node[key2] = nodes[key1][key2];
            }
        }
        result[key1] = node;
    }
    return result;
};

export const fetchNodes = (params) => {
    return (dispatch) => {
        const {query, attrs} = params;
        fetchApi('node/SEARCH', {body: {
            query,
            attrs
        }}).then(res => {
            return res.json();
        }).then(
            (json) => {
                const data = deserialize(json);
                dispatch({
                    type: NODE_DOWNLOADED,
                    payload: data
                });
            }
        );
    };
};
