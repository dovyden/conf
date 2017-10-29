import PropTypes from 'prop-types';
import React from 'react';

export default function TextArea({className, defaultText, type}) {
    return (
        <textarea
            className={className}
            placeholder={defaultText}
            rows={type === 'chat' ? 3 : 1} />
    );
}

TextArea.propTypes = {
    className: PropTypes.string.isRequired,
    defaultText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};
