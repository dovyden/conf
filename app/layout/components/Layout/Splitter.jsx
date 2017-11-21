import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Layout.css';

const b = b_.lock('layout');

const Splitter = ({type, splitter}) => {
    const stylePosition = {};
    const axis = (type === 'bottom' || type === 'top') ? 'top' : 'left';

    stylePosition[axis] = `${splitter[0]}%`;

    return (splitter[2])            // hidden or not
        ? (<div className={b('splitter', {[type]: true})} data-type={type} style={stylePosition}/>)
        : null;
};

Splitter.propTypes = {
    type: PropTypes.string,
    splitter: PropTypes.array,             // fill
};

export default Splitter;
