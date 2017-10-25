import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {login} from '../../actions/auth';
import AuthForm from '../../components/Auth/Auth';
import Spinner from '../../components/Spinner/Spinner';
//import Loading from '../../components/Auth/Loading';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.checkURL = this.checkURL.bind(this);
        this.addToken = this.addToken.bind(this);
    }

    componentDidMount() {
        this.keyFromURL = this.checkURL();

        if (this.keyFromURL) {
            this.addToken(this.keyFromURL);
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

        auth({
            key,
            push
        });
    }

    render() {
        const {loading} = this.props;

        // if (loading) {
        //     return <Loading />;
        // } else {
        return <AuthForm onClick={this.addToken} loading={loading}/>;
        // }
    }
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (key, push) => dispatch(login(key, push))
    };
}

Auth.propTypes = {
    match: PropTypes.object,
    auth: PropTypes.func.isRequired,
    history: PropTypes.object,
    token: PropTypes.string,
    loading: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
