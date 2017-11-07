import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import AuthForm from '../../components/Auth/Auth';
import {authentication} from '../../actions/auth';
import Spinner from '../../components/Spinner/Spinner';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};

        this.checkURL = this.checkURL.bind(this);
        this.startGetToken = this.startGetToken.bind(this);
    }

    componentDidMount() {
        this.keyFromURL = this.checkURL();

        if (this.keyFromURL) {
            this.startGetToken(this.keyFromURL);
        } else {
            this.setState({loading: false});
        }
    }

    componentWillReceiveProps(nextProps) {
        const {isAuthenticated} = nextProps;
        const {code} = nextProps.error;

        if (code) {
            this.setState({loading: false});
        }
        // if the auth was successful -> redirect to '/' (Layout)
        if (isAuthenticated) {
            this.props.history.push('/');
        }
    }

    checkURL() {
        // Get path. Example: site.com/auth/123 -> ['auth','123']
        const {key} = this.props.match.params;

        return key ? key : false;
    }

    startGetToken(key) {
        const {auth} = this.props;

        this.setState({loading: true});
        auth(key);
    }

    render() {
        const {loading} = this.state;
        const {fromURL} = this.props;
        const {message} = this.props.error;

        return (
            <div>
                {loading ? <Spinner position="center"/> : null}
                {fromURL ? null : <AuthForm
                    onSubmit={this.startGetToken}
                    loading={loading}
                    errorMessage={message}
                />}
            </div>
        );
    }
}

Auth.propTypes = {
    auth: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    match: PropTypes.object,
    message: PropTypes.string,
    history: PropTypes.object,
    fromURL: PropTypes.any,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    error: PropTypes.object
};

function mapStateToProps({auth}) {
    const {
        error = {},
        isAuthenticated
    } = auth;

    return {
        error,
        isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (key) => dispatch(authentication(key))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
