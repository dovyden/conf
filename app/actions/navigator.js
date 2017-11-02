import {NODE_DOWNLOADED} from '../constants/navigator';

import {fetchApi} from '../utils/fetch';

export const fetchNodes = (params) => {
    return (dispatch) => {
        const {query, attrs} = params;
        fetchApi('node/SEARCH', {body: {
            query,
            attrs
        }}).then(res => {
            return res.json();
        }).then(json => {
            dispatch({
                type: NODE_DOWNLOADED,
                payload: json
            });
        });
    };
};
