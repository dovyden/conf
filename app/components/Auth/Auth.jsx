import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Auth.css';

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.onInputArea = this.onInputArea.bind(this);
    }

    onPressSubmit(e) {
        e.preventDefault();

        const {onClick} = this.props;

        if (!this.inputKey.value) {
            alert(`Field can't be empty`);
            return;
        }
        onClick(this.inputKey.value);
        this.inputKey.value = '';
    }

    onInputArea(refKey) {
        this.inputKey = refKey;
    }

    render() {
        const {loading, message} = this.props;
        return (
            <div className="auth">
                <form className="auth-form" onSubmit={this.onPressSubmit}>
                    {message ? <div className="message">{message}</div> : null}
                    <input ref={this.onInputArea} placeholder="Type a Key" disabled={loading}/>
                    <button type="submit">Get Token</button>
                </form>
            </div>
        );

    }
}

Auth.propTypes = {
    loading: PropTypes.bool,
    message: PropTypes.string,
    fromURL: PropTypes.any,
    onClick: PropTypes.func.isRequired,
};
