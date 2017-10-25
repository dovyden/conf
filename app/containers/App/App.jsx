import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout/Layout';
import Auth from '../Auth/Auth';
import {loadFromLocalStorage} from '../../utils/localStorage';

class App extends Component {
    componentDidMount() {
        const token = loadFromLocalStorage();

        if (token) {
            this.props.history.push('/');
        } else {
            this.props.history.push('/auth');
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path={'/'} component={Layout}/>
                <Route exact path={'/auth/:key?'} component={Auth}/>
            </Switch>
        );
    }
}

App.propTypes = {
    history: PropTypes.object
};

export default withRouter(App);
