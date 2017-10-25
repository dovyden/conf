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

        return (
            <form className="auth-form" onSubmit={this.onPressSubmit}>
                <input ref={this.onInputArea} placeholder="Type a Key"/>
                <button type="submit">Get Token</button>
                {this.props.loading ? <Spinner /> : <div />}
            </form>

        );
    }
}

Auth.propTypes = {
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.bool
};
