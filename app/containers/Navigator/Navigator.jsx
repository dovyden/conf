import React from 'react';
import PropTypes from 'prop-types';

let kek = 0;

export default function Navigator(props) {
    return (
        <div onClick={() => props.navigateTo(kek++)}>
            {kek}
            {props.nodeId}
            {props.scroll}
        </div>
    );
}

Navigator.propTypes = {
    nodeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    navigateTo: PropTypes.func.isRequired,
    scroll: PropTypes.number
};
