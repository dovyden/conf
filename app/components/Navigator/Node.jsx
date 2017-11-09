import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Navigator.css';

const b = b_.lock('nodes-list');

export default function Toolbar(props) {
    const {node} = props;
    return [
        <td key={'name'} className={b('text', {'node-attrs': true})}>
            {node.name1}
        </td>,
        <td key={'owner'} className={b('text', {'node-attrs': true})}>
            {node['sec/owner']};
        </td>
    ];
}

Toolbar.propTypes = {
    node: PropTypes.object.isRequired,
};
