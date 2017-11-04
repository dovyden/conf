import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Switch, withRouter} from 'react-router-dom';

import AppComponent from '../../components/App/App';
import Auth from '../Auth/Auth';

class App extends Component {
    constructor(props) {
        super(props);

        this.getUrlParam = this.getUrlParam.bind(this);
    }

    componentDidMount() {
        const {token} = this.props;
        const {pathname} = this.props.location;
        const auth = this.getUrlParam(pathname);

        const path = token ? pathname : '/auth';

        // Example: url = 'test.com/auth/:key?' and doesn't exist token at store ->
        // just render process auth with this key
        if (auth && !token) {
            return;
        }
        // if I have token - redirect to pathname (that placed in url),
        // otherwise I haven't token and 'auth' at url - redirect to '/auth'
        this.props.history.replace(path);
    }

    getUrlParam(pathname) {
        const params = pathname.split('/');

        return params[1] === 'auth';
    }

    render() {
        return (
            <Switch>
                <Route exact path={'/auth/:key?'} component={Auth}/>
                <Route path={'/'} component={AppComponent}/>
            </Switch>
        );
    }
}

App.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    token: PropTypes.string
};

function mapStateToProps(state) {
    return {
        token: state.auth.token
    };
}

export default withRouter(connect(mapStateToProps)(App));
