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
        const auth = this.getUrlParam();

        const path = token ? '/' : '/auth';

        // Example: url = 'test.com/auth/:key?' and doesn't exist token at store -> just render
        if (auth && !token) {
            return;
        }
        // if I have token - redirect to '/', otherwise I haven't token and 'auth' at url - redirect to '/auth'
        this.props.history.replace(path);
    }

    getUrlParam() {
        const path = window.location.pathname;
        const params = path.split('/');

        return params[1];
    }

    render() {
        return (
            <Switch>
                <Route exact path={'/'} component={AppComponent}/>
                <Route exact path={'/auth/:key?'} component={Auth}/>
            </Switch>
        );
    }
}

App.propTypes = {
    history: PropTypes.object,
    token: PropTypes.string
};

function mapStateToProps(state) {
    return {
        token: state.auth.token
    };
}

export default withRouter(connect(mapStateToProps)(App));
