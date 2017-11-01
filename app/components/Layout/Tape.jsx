import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css';

const Tape = ({children, direction, size}) => {
    const styleProp = {
        flexDirection: direction,
        flexBasis: size,
    };

    if (size !== '0%') {
        return (
            <div className={'tape'} style={styleProp}>
                {children}
            </div>
        );
    } else {
        return null;
    }
};

Tape.propTypes = {
    children: PropTypes.node,
    direction: PropTypes.string,
    size: PropTypes.string,
};

export default Tape;
