import b_ from 'b_';
import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';

const b = b_.lock('button');

export default function Button({className, onClick, ...props}) {
    return (
        <button
            className={b.mix(className)}
            onClick={onClick}>
            {props.children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

