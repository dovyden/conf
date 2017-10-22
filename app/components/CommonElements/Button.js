import React, { Component } from 'react';

export default function Button({type, className, text, src, onClick}) {
    return (
        <input 
            type={type} 
            className={'button ' + className} 
            value={text} 
            src={src}
            onClick={onClick} />
    );
}

