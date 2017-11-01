import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css';

const Splitter = ({type, position, display}) => {
    let styleProp;
    const stylePosition = {};
    switch (type) {
        case 'top':
            styleProp = 'splitter_top';
            stylePosition.top = position;
            break;
        case 'bottom':
            styleProp = 'splitter_bottom';
            stylePosition.top = position;
            break;
        case 'left':
            styleProp = 'splitter_left';
            stylePosition.left = position;
            break;
        case 'right':
            styleProp = 'splitter_right';
            stylePosition.left = position;
            break;
    }

    if (!(display.indexOf(type) + 1)) {     // -1 not found, but 0 found => + 1
        return (
            <div className={styleProp} data-type={type} style={stylePosition}/>
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
