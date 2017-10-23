import React from 'react';

export default function Button({className, onClick, text, type, src}) {
    return (
        <input
            type={type}
            className={'button ' + className}
            value={text}
            src={src}
            onClick={onClick} />
    );
}

