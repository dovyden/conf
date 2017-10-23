import React from 'react';

export default function Label({className, onClick, text}) {
    return (
        <label className={className} onClick={onClick}>
            {text}
        </label>
    );
}
