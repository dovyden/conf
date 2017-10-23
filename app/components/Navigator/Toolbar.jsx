import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {v4} from 'uuid';

import './Navigator.css';

export default function Toolbar(props) {
    return (
        <div className="upperPanel">
            <div className="path">
                {props.path.map((node) => {
                    return (
                        <span key={v4()}>
                            <b>/</b>
                            <Link to={`/nav/${node.parentId}`}>
                                {node.name}
                            </Link>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

Toolbar.propTypes = {
    path: PropTypes.array.isRequired
};
