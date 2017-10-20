import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import layout from '../Layout/Layout';
import isAuth from '../../containers/Auth/isAuth';
import GetToken from '../../containers/App/GetToken';

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Instead RRv3 hooks */}
                <Route path={'/layout'} component={isAuth(layout)} />
                <Route exact path={'/:auth?/:key?'} component={GetToken} />
            </Switch>
        </BrowserRouter>
    );
}
