import React from 'react';
import Label from './../../CommonElements/Label';
import Button from './../../CommonElements/Button';
import TextArea from './../../CommonElements/TextArea';
import ParticipatorsPickBlock from './ParticipatorsPickBlock';

export default function ConferenceEditor({type}) {
    return (
        <form className="conference-editor">
            <div>
                <Label 
                    className="conference-editor__label" 
                    text="Дата и время:" />
                &nbsp;&nbsp;
                <Button 
                    className="conference-editor__datepick" 
                    text="Дата" 
                    type="date"
                    onClick={} />
                &nbsp;
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
                    text="Участники" 
                    participatorsNum={5} />
            </div>
            <div>
                <ParticipatorsPickBlock 
                    className="conference-editor__participators-block" />
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