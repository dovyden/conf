import b_ from 'b_';
import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';

const b = b_.lock('button');

export default function Button({className, onClick, text}) {
    return (
        <button
            className={b.mix(className)}
            onClick={onClick}>
            {text}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    src: PropTypes.string
};

