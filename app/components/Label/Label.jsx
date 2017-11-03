import PropTypes from 'prop-types';
import React from 'react';

export default function Label({className, onClick, text}) {
    return (
        <label className={className} onClick={onClick}>
            {text}
        </label>
    );
}

Label.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
};
