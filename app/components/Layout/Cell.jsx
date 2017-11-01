import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css';

const Cell = ({children, size}) => {
    const styleProp = {
        flexBasis: size,
    };

    if (size !== '0%') {
        return (
            <div className={'cell'} style={styleProp}>
                {children}
            </div>
        );
    } else {
        return null;
    }
};

Cell.propTypes = {
    size: PropTypes.string,
    children: PropTypes.node,
};

export default Cell;
