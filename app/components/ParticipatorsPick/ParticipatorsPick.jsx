import React from 'react';

import Button from '../Button/Button';
import Participator from '../Participator/Participator';

export default function ParticipatorsPick({className, participators}) {
    return (
        <div className={className}>
            {participators.forEach((part) => {
                return (
                    <Participator
                        className={className + '__participator'}
                        firstName={part.firstName}
                        moderator={part.moderator} />
                );
            })}

        </div>
    );
}
