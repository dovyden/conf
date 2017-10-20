import React from 'react';
import './Auth.css';

export default function AuthForm(props) {
    const {onClick} = props;
    let inputKey;

    return (
        <div className={'Auth'}>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!inputKey.value || !inputKey.value) {
                    alert('field can not be empty');
                    return;
                }
                onClick(inputKey.value);
                inputKey.value = '';
            }}>
                <input ref={(input) => (inputKey = input)} placeholder={'Type a Key'}/>
                <button type={'submit'} >Get Token</button>
            </form>
        </div>
    );
}
