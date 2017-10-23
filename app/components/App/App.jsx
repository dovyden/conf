import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';

import Navigator from '../../containers/Navigator/Navigator';
import store from '../../utils/store';

export default function App() {
    const rootNode = '5@test.knevod.com';
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={`/nav/${rootNode}`} push/>
                        </Route>
                        <Route path="/nav/:nodeId" component={Navigator} />
                        <Route path="/doc" component={Navigator}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
}
