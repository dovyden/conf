import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import AuthForm from '../../components/Auth/Auth';
import {authentication} from '../../actions/auth';

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

    componentWillReceiveProps(nextProps) {
        const {isAuthenticated, error} = nextProps;

        if (error) {
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

        return (key) ? key : false;
    }

    addToken(key) {
        const {auth} = this.props;

        this.setState({loading: true});
        auth(key);
    }

    render() {
        const {loading} = this.state;

        return <AuthForm
            onClick={this.addToken}
            loading={loading}
            message={this.props.message}
            fromURL={this.keyFromURL}
        />;
    }
}

Auth.propTypes = {
    auth: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    match: PropTypes.object,
    message: PropTypes.string,
    history: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    error: PropTypes.number
};

function mapStateToProps(state) {
    return {
        error: state.auth.error,
        message: state.auth.message,
        isAuthenticated: state.auth.isAuthenticated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (key) => dispatch(authentication(key))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
