import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css';

const Layout = ({children, direction, mousedown}) => {
    const styleProp = {
        flexDirection: direction,
    };
    return (
        <div className={'layout'} style={styleProp} onMouseDown={mousedown}>
            {children}
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
    direction: PropTypes.string,
    mousedown: PropTypes.func,
};

export default Layout;
