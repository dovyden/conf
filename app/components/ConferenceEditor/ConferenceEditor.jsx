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
                    text="Дата"
                    type="date"
                    onClick={} />
                <Button
                    className="conference-editor__timepick"
                    text="Время"
                    type="time"
                    onClick={} />
            </div>
            <div>
                <TextArea
                    className="conference-editor__textarea"
                    defaultText="Тема совещания" />
            </div>
            <div>
                <Label
                    className="conference-editor__label"
                    text={`Участники(${participators.length()})`} />
            </div>
            <div>
                <ParticipatorsPick
                    className="conference-editor__participators-pick"
                    participators={participators} />
            </div>
            <div>
                {type === 'creator'
                    ? <Button
                        className="conference-editor__create"
                        text="Создать совещание"
                        type="button"
                        onClick={} />
                    : <div>
                        <Button
                            className="conference-editor__save"
                            text="Сохранить"
                            type="button"
                            onClick={} />
                        <Button
                            className="conference-editor__cancel"
                            text="Отмена"
                            type="button"
                            onClick={} />
                    </div>}
                &nbsp;
                <Label
                    className="conference-editor__changemoderator"
                    text="Назначить модератора"
                    onClick={} />
            </div>
        </form>
    );
}
