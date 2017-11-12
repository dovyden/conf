import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Layout.css';

const b = b_.lock('layout');

const Tape = ({children, direction, size, type}) => {
    const styleProp = {
        flexBasis: `${size}%`,
    };

    return (size !== 0)
        ? (<div className={direction ? b(type, {[direction]: true}) : b(type)} style={styleProp}>
            {children}
        </div>)
        : null;
};

Tape.propTypes = {
    children: PropTypes.node,
    direction: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
};

export default Tape;
