import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from '../Auth/Auth';
import AppComponent from '../../components/App/App';

class App extends Component {
    constructor(props) {
        super(props);

        this.getUrlParam = this.getUrlParam.bind(this);
    }

    componentDidMount() {
        const {token} = this.props;
        const keyFromUrl = this.getUrlParam();

        const path = token ? '/' : '/auth';

        if (keyFromUrl) {
            this.props.history.push(`/auth/${keyFromUrl}`);
            return;
        }
        // replace
        this.props.history.push(path);
    }

    getUrlParam() {
        const path = window.location.pathname;
        const params = path.split('/');

        return params[2];
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

function mapStateToProps(state) {
    return {
        token: state.auth.token
    };
}

App.propTypes = {
    history: PropTypes.object,
    token: PropTypes.string
};

export default withRouter(connect(mapStateToProps)(App));
