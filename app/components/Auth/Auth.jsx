import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Auth.css';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {errorMessage: ''};

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.refKey = this.refKey.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({errorMessage: nextProps.errorMessage || ''});
    }

    onSubmitForm(e) {
        e.preventDefault();

        const {onSubmit} = this.props;

        if (!this.inputKey.value) {
            this.setState({errorMessage: 'Field can\'t be empty'});
            return;
        }
        onSubmit(this.inputKey.value);
        this.inputKey.value = '';
    }

    refKey(input) {
        this.inputKey = input;
    }

    render() {
        const {loading} = this.props;
        const {errorMessage} = this.state;

        return (
            <div className="auth">
                <form className="auth-form" onSubmit={this.onSubmitForm}>
                    <input ref={this.refKey} placeholder="Type a Key" disabled={loading}/>
                    <button type="submit">Get Token</button>
                </form>
                {errorMessage ? <div className="auth__message">{errorMessage}</div> : null}
            </div>
        );

    }
}

Auth.propTypes = {
    loading: PropTypes.bool,
    errorMessage: PropTypes.string,
    fromURL: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
};
