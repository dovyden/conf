import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Auth.css';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {message: ''};

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.newRefKey = this.newRefKey.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({message: nextProps.message || ''});
    }

    onSubmitForm(e) {
        e.preventDefault();

        const {onSubmit} = this.props;

        if (!this.inputKey.value) {
            this.setState({message: 'Field can\'t be empty'});
            return;
        }
        onSubmit(this.inputKey.value);
        this.inputKey.value = '';
    }

    newRefKey(input) {
        this.inputKey = input;
    }

    render() {
        const {loading} = this.props;
        const {message} = this.state;

        return (
            <div className="auth">
                <form className="auth-form" onSubmit={this.onSubmitForm}>
                    <input ref={this.newRefKey} placeholder="Type a Key" disabled={loading}/>
                    <button type="submit">Get Token</button>
                </form>
                {message ? <div className="auth__message">{message}</div> : null}
            </div>
        );

    }
}

Auth.propTypes = {
    loading: PropTypes.bool,
    message: PropTypes.string,
    fromURL: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
};
