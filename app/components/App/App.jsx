import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import layout from '../Layout/Layout';
import isAuth from '../../containers/Auth/isAuth';
import GetToken from '../../containers/App/GetToken';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Instead RRv3 hooks */}
                <Route exact path={'/'} component={isAuth(layout)} />
                <Route exact path={'/:auth?/:key?'} component={GetToken} />
            </Switch>
        </BrowserRouter>
    );
}
