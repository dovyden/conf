import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Toolbar.css';

const b = b_.lock('navigator-toolbar');

export default function Toolbar(props) {
    return (
        <div className={b()}>
            <div className={b('path')}>
                <span
                    className={b('text', {'previous-nodes': true})}
                    onClick={() => {
                        props.navigateTo({type: 'navigator', contentId: ''});
                    }}
                >
                    ⌂
                </span>
                {props.path.map((node) => {
                    let className;
                    if (node.nodeId === props.path[props.path.length - 1].nodeId) {
                        className = b('text', {'current-node': true});
                    } else {
                        className = b('text', {'previous-nodes': true});
                    }
                    return (
                        <span key={node.nodeId}>
                            <span className={b('text', {slash: true})}>
                                /
                            </span>
                            <span
                                className={className}
                                onClick={() => {
                                    props.navigateTo({type: 'navigator', contentId: node.nodeId});
                                }}
                            >
                                {node.name}
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

Toolbar.propTypes = {
    path: PropTypes.array.isRequired,
    navigateTo: PropTypes.func.isRequired
};
