import b_ from 'b_';
import PropTypes from 'prop-types';
import React from 'react';
import './Label.css';

const b = b_.lock('label');

export default function Label({className, forID, ...props}) {
    return (
        <label
            className={b.mix(className)}
            htmlFor={forID}>
            {props.children}
        </label>
    );
}

Label.propTypes = {
    className: PropTypes.string,
    forID: PropTypes.string
};

