import React from 'react';

export default function TextArea({className, defaultText}) {
    return (
        <input 
            className={className}
            type="text"
            placeholder={defaultText} />
    );
}