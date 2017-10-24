import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import layout from '../Layout/Layout';
import isAuth from '../../containers/Auth/isAuth';
import GetToken from '../../containers/App/GetToken';

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={isAuth(layout)} />
                <Route exact path={'/auth/:key?'} component={GetToken} />
            </Switch>
        </BrowserRouter>
    );
}
