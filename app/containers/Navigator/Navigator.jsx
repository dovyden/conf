import React from 'react';
import PropTypes from 'prop-types';

export default function Navigator(props) {
    return (
        <div onClick={props.navigateTo()}>
            {props.nodeId}
            {props.nodeId}
        </div>
    );
}

Navigator.propTypes = {
    nodeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    navigateTo: PropTypes.func.isRequired,
    scroll: PropTypes.number
};
