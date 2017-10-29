import PropTypes from 'prop-types';
import React from 'react';

export default function Button({className, onClick, text, src}) {
    return (
        <button
            className={`button ${className}`}
            onClick={onClick}>
            <img src={src} alt="" />
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

