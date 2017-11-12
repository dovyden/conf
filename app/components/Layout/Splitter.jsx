import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Layout.css';

const b = b_.lock('layout');

const Splitter = ({type, position, display}) => {
    const stylePosition = {};
    const pos = type === 'bottom' || type === 'top' ? 'top' : 'left';

    stylePosition[pos] = `${position}%`;

    if (!(display.indexOf(type) + 1)) {     // -1 not found, but 0 found => + 1
        return (
            <div className={b('splitter', {[type]: true})} data-type={type} style={stylePosition}/>
        );
    } else {
        return null;
    }
};

Splitter.propTypes = {
    type: PropTypes.string,
    position: PropTypes.string,
    display: PropTypes.string,
};

export default Splitter;
