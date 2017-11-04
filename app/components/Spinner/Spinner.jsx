import React from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Spinner.css';

const b = b_.lock('spinner');

export default function Spinner({position}) {
    return (
        <div className={position ? b({[position]: true}) : b()}
        />
    );
}

Spinner.propTypes = {
    position: PropTypes.string,
};
