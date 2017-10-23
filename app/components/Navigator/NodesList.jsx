import React from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';
import {Link} from 'react-router-dom';

import './Navigator.css';

export default function NodesList(props) {
    return (
        <div>
            <div className="colNames">
                <span className="nodeSpan">
                    Название
                </span>
                <span className="nodeSpan">
                    Автор
                </span>
            </div>
            {Object.keys(props.nodes).map((nodeId) => {
                return (
                    <Link to={`/nav/${nodeId}`} key={v4()}>
                        <div className="node">
                            <span className="nodeSpan">
                                {props.nodes[nodeId].name1}
                            </span>
                            <span className="nodeSpan">
                                {props.nodes[nodeId]['sec/owner']}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

NodesList.propTypes = {
    nodes: PropTypes.object.isRequired
};
