import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Layout.css';

const b = b_.lock('layout');

const Layout = ({children, direction, mousedown}) => {
    return (
        <div className={b({[direction]: true})} onMouseDown={mousedown}>
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
