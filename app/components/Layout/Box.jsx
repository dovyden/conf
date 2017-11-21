import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Layout.css';

const b = b_.lock('layout');

const Box = ({type, box}) => {
    const stylePosition = {};

    stylePosition['top'] = `${box[1]}%`;        // Y
    stylePosition['left'] = `${box[0]}%`;       // X

    return (box[2])            // hidden or not
        ? (<div className={b('box', {[type]: true})} data-type={type} style={stylePosition}/>)
        : null;
};

Box.propTypes = {
    type: PropTypes.string,
    box: PropTypes.array,             // fill
};

export default Box;
