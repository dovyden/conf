import React from 'react';
import PropTypes from 'prop-types';

export default function Navigator(props) {
    return (
        <div onClick={props.navigateTo()}>
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
