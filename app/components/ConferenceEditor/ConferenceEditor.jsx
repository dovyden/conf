import React from 'react';

import Button from '../Button/Button';
import Label from '../Label/Label';
import ParticipatorsPick from '../ParticipatorsPick/ParticipatorsPick';
import TextArea from '../TextArea/TextArea';

export default function ConferenceEditor({participators, type}) {
    return (
        <form className="conference-editor">
            <div>
                <Label
                    className="conference-editor__label"
                    text="Дата и время:" />
                <Button
                    className="conference-editor__datepick"
                    onClick={''}
                    text="Дата" />
                <Button
                    className="conference-editor__timepick"
                    onClick={''}
                    text="Время" />
            </div>
            <div>
                <TextArea
                    className="conference-editor__textarea"
                    defaultText="Тема совещания"
                    type="conferenceTheme" />
            </div>
            <div>
                <Label
                    className="conference-editor__label"
                    text={`Участники(${participators.length})`} />
            </div>
            <div>
                <ParticipatorsPick
                    className="conference-editor__participators-pick"
                    participators={participators} />
            </div>
            <div>
                {
                    type === 'creator'
                    ? <Button
                        className="conference-editor__create"
                        text="Создать совещание"
                        onClick={''} />
                    : [
                        <Button
                            className="conference-editor__save"
                            key="save"
                            onClick={''}
                            text="Сохранить" />,
                        <Button
                            className="conference-editor__cancel"
                            key="cancel"
                            onClick={''}
                            text="Отмена" />
                    ]
                }
                <Label
                    className="conference-editor__changemoderator"
                    onClick={''}
                    text="Назначить модератора" />
            </div>
        </form>
    );
}
