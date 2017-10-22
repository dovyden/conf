import React, { Component } from 'react';

class Label extends Component {
    render() {
        const { 
            className,
            text,
            participatorsNum,
            onClick
        } = this.props;

        const txt = `${text}${participatorsNum ? '(' + participatorsNum + '):' : ':'}`;

        return (
            <label className={className} onClick={onClick}>
                {txt}
            </label>
        );
    }
}

export default Label;