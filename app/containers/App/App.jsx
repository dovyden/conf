import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Switch, withRouter} from 'react-router-dom';

import AppComponent from '../../components/App/App';
import Auth from '../Auth/Auth';

class App extends Component {
    constructor(props) {
        super(props);

        this.checkAuthLocation = this.checkAuthLocation.bind(this);
    }

    componentDidMount() {
        const {token} = this.props;
        const authAtUrl = this.checkAuthLocation();

        // If I haven't token and i don't placed at 'test.com/auth/...' -> redirect 'test.com/auth'
        // Else - nothing doing
        if (!authAtUrl && !token) {
            this.props.history.replace('auth');
        }
    }

    checkAuthLocation() {
        const {pathname} = this.props.location;
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

const mapStateToProps = ({auth}) => ({
    token: auth.token
});

export default withRouter(connect(mapStateToProps)(App));
