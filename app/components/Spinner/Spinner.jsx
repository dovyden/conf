import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Spinner.css';

const b = b_.lock('spinner');

// Example call of Spinner-component with mix: <Spinner className="toolbar__spinner" />
// In result we'll give className: 'spinner toolbar__spinner'
export default function Spinner({position, className}) {
    // We call the spinner-component either with a `position` prop or with a `className` prop. No other way
    const bemClass = className ? b.mix(className) : b({[`position_${position}`]: true});

    return (
        <div className={bemClass}
        />
    );
}

Spinner.propTypes = {
    className: PropTypes.string,
    position: PropTypes.string,
};
