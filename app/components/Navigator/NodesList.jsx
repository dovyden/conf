import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Navigator.css';
import Node from './Node';

const b = b_.lock('nodes-list');

export default function NodesList(props) {
    return (
        <div>
            <div className={b('col-names')}>
                <span className={b('text', {'col-name': true})}>
                    Название
                </span>
                <span className={b('text', {'col-name': true})}>
                    Автор
                </span>
            </div>
            {Object.keys(props.nodes).map((nodeId) => {
                return (
                    <div key={nodeId}>
                        <Node
                            nodeId={nodeId}
                            node={props.nodes[nodeId]}
                            navigateTo={props.navigateTo}
                        />
                        <div className={b('line')}/>
                    </div>
                );
            })}
        </div>
    );
}

NodesList.propTypes = {
    nodes: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired
};
