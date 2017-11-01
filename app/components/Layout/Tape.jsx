import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css';

const Tape = ({children, direction, size, type}) => {
    const styleProp = {
        flexBasis: size,
    };

    if (direction) {
        styleProp.flexDirection = direction;
    }

    if (size !== '0%') {
        return (
            <div className={type} style={styleProp}>
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
    type: PropTypes.string,
};

export default Tape;
