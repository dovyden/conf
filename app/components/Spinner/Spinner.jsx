import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Spinner.css';

const b = b_.lock('spinner');

export default function Spinner({className}) {
    return (
        <div className={b.mix(className)} />
    );
}

Spinner.propTypes = {
    className: PropTypes.string,
};
