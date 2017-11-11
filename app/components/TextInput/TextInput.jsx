import b_ from 'b_';
import PropTypes from 'prop-types';
import React from 'react';
import './TextInput.css';

const b = b_.lock('textinput');

export default function TextInput({className, defaultText, maxInputLength}) {
    return (
        <input
            className={b.mix(className)}
            id={className}
            maxLength={maxInputLength}
            placeholder={defaultText}
            size={maxInputLength ? maxInputLength + 5 : 40}
            type="text" />
    );
}

TextInput.propTypes = {
    className: PropTypes.string,
    defaultText: PropTypes.string,
    maxInputLength: PropTypes.number
};
