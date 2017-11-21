import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Layout.css';

const b = b_.lock('layout');

const Tape = ({children, type, direction, size}) => {
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
    type: PropTypes.string,
    direction: PropTypes.string,
    size: PropTypes.number,
};

export default Tape;
