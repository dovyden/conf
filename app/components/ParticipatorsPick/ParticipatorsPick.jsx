import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button/Button';
import Participator from '../Participator/Participator';
import TextArea from '../TextArea/TextArea';

export default function ParticipatorsPick({className, participators}) {
    return (
        <div className={className}>
            {participators.forEach((part) => {
                return (
                    <Participator
                        className={`${className}__participator`}
                        firstName={part.firstName}
                        moderator={part.moderator} />
                );
            })}
            <TextArea
                className={`${className}__new-participator`} />
            <Button
                className={`${className}_add-new-participator`}
                onClick={''}
                text="+" />
        </div>
    );
}

ParticipatorsPick.propTypes = {
    className: PropTypes.string.isRequired,
    participators: PropTypes.array.isRequired
};
