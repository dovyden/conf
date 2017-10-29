import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button/Button';
import Label from '../Label/Label';

export default function Participator({className, firstName, moderator}) {
    return (
        <div className={className}>
            {firstName}
            {
                moderator
                    ? <Label
                        className={`${className}__label`}
                        text="M" />
                    : <Button
                        className={`${className}__delete`}
                        onClick={''} />
            }
        </div>
    );
}

Participator.propTypes = {
    className: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    moderator: PropTypes.boolean
};
