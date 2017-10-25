import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import AuthForm from '../../components/Auth/Auth';
import {login} from '../../actions/auth';
import Spinner from '../../components/Spinner/Spinner';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};

        this.checkURL = this.checkURL.bind(this);
        this.addToken = this.addToken.bind(this);
    }

    componentDidMount() {
        this.keyFromURL = this.checkURL();

        if (this.keyFromURL) {
            this.addToken(this.keyFromURL);
        } else {
            this.setState({loading: false});
        }
    }

    checkURL() {
        // Get path. Example: site.com/auth/123 -> ['auth','123']
        const {key} = this.props.match.params;

        return (key) ? key : false;
    }

    addToken(key) {
        const {auth} = this.props;
        const {push} = this.props.history;

        this.setState({loading: true});
        auth({
            key,
            push
        });
    }

    render() {
        const {loading} = this.state;

        if (this.keyFromURL) {
            return <Spinner />;
        } else {
            return <AuthForm onClick={this.addToken} loading={loading}/>;
        }
    }
}

Auth.propTypes = {
    auth: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    match: PropTypes.object,
    history: PropTypes.object,
    token: PropTypes.string
};

function mapDispatchToProps(dispatch) {
    return {
        auth: (key, push) => dispatch(login(key, push))
    };
}

export default withRouter(connect(null, mapDispatchToProps)(Auth));
