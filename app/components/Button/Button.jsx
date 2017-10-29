import React from 'react';

export default function Button({className, onClick, text, src}) {
    return (
        <button
            className={'button ' + className}
            onClick={onClick}>
            <img src={src} alt="" />
            {text}
        </button>
    );
}

