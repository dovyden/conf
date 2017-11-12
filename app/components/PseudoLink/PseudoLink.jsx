import b_ from 'b_';
import PropTypes from 'prop-types';
import React from 'react';
import './PseudoLink.css';

const b = b_.lock('pseudolink');

export default function PseudoLink({className, onClick, ...props}) {
    return (
        <span
            className={b.mix(className)}
            onClick={onClick}>
            {props.children}
        </span>
    );
}

PseudoLink.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
};
