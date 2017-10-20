import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthForm from '../../components/Auth/Auth';
import Loading from '../../components/Auth/Loading';
import {saveToLocalStorage} from '../../utils/localStorage/index';
import {login} from '../../actions/user';


class Auth extends Component {
    constructor(props) {
        super(props);

        this.addToken = this.addToken.bind(this);
    }

    componentDidMount() {
        const {fromURL} = this.props;

        if (fromURL) {
            this.addToken(fromURL);
        }
    }

    addToken(key) {
        const login = this.props.actions;
        const {push} = this.props.history;

        login({
            key,
            push
        });
    }

    render() {
        const {loading, token} = this.props;

        if (token) {
            saveToLocalStorage('token', token);
        }

        if (loading) {
            return <Loading />;
        } else {
            return <AuthForm onClick={this.addToken}/>;
        }
    }
}

function mapStateToProps(state) {
    return {
        loading: state.user.loading,
        token: state.user.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(login, dispatch)
    };
}

Auth.propTypes = {
    actions: PropTypes.func.isRequired,
    history: PropTypes.object,
    fromURL: PropTypes.bool,
    loading: PropTypes.bool,
    token: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
