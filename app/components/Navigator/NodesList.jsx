import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Navigator.css';
import Node from './Node';

const b = b_.lock('nodes-list');

export default function NodesList(props) {
    return (
        <table className={b()}>
            <thead>
                <tr className={b('col-names')}>
                    <th className={b('text', {'col-name': true})}>
                        Название
                    </th>
                    <th className={b('text', {'col-name': true})}>
                        Автор
                    </th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.nodes).map((nodeId) => {
                    return (
                        <tr
                            key={nodeId}
                            className={b('node')}
                            onClick={() => {
                                props.navigateTo({type: 'node', nodeId});
                            }}
                        >
                            <Node
                                node={props.nodes[nodeId]}
                            />
                        </tr>
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
