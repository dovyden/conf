import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Navigator.css';

const b = b_.lock('nodes-list');

export default function Toolbar(props) {
    const {nodeId, node, navigateTo} = props;
    return (
        <div className={b('node')}
            onClick={() => {
                navigateTo({type: 'node', nodeId});
            }}
        >
            <span className={b('text', {'node-attrs': true})}>
                {node.name1}
            </span>
            <span className={b('text', {'node-attrs': true})}>
                {node['sec/owner']};
            </span>
        </div>
    );
}

Toolbar.propTypes = {
    nodeId: PropTypes.string.isRequired,
    node: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired
};
