import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './NodesList.css';
import Node from './Node';

const b = b_.lock('nodes-list');

export default function NodesList(props) {
    return (
        <table className={b()}>
            <thead>
                <tr className={b('node-attrs-names')}>
                    <th className={b('text', {'node-attrs-names': true})}>
                        Название
                    </th>
                    <th className={b('text', {'node-attrs-names': true})}>
                        Автор
                    </th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.nodes).map((nodeId) => {
                    return (
                        <Node
                            key={nodeId}
                            navigateTo={props.navigateTo}
                            nodeId={nodeId}
                            node={props.nodes[nodeId]}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}

NodesList.propTypes = {
    nodes: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired
};
