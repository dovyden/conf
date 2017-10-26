import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Auth.css';

import Spinner from '../Spinner/Spinner';

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.onInputArea = this.onInputArea.bind(this);
    }

    onPressSubmit(e) {
        const {onClick} = this.props;

        e.preventDefault();
        if (!this.inputKey.value || !this.inputKey.value) {
            alert('field can not be empty');
            return;
        }
        onClick(this.inputKey.value);
        this.inputKey.value = '';
    }

    onInputArea(input) {
        this.inputKey = input;
    }

    render() {
        const loading = this.props.loading ? <Spinner /> : <div />;

        const authArea = this.props.fromURL ? <div />
            : <div>
                <input ref={this.onInputArea} placeholder="Type a Key"/>
                <button type="submit">Get Token</button>
            </div>;

        return (
            <form className="auth-form" onSubmit={this.onPressSubmit}>
                <div>{this.props.message}</div>
                {authArea}
                {loading}
            </form>
        );

    }
}

Auth.propTypes = {
    loading: PropTypes.bool,
    message: PropTypes.string,
    fromURL: PropTypes.any,
    onClick: PropTypes.func.isRequired,
};
