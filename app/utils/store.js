import {
    applyMiddleware,
    combineReducers,
    createStore
} from 'redux';
import {
    createLogger as logger
} from 'redux-logger';
import thunk from 'redux-thunk';

import {load as loadFromStorage} from './localStorage';
import reducers from '../reducers';
import {socketMiddleware} from '../websocket';

// add middlewares to redux store
const middlewares = [thunk, socketMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger({
        collapsed: true,
        diff: true,
        duration: true
    }));
}

// restore state-store from localStorage
const persistedState = {
    auth: loadFromStorage('auth')
};

// create store
export default createStore(
    combineReducers(reducers),
    persistedState,  // initial store
    applyMiddleware(...middlewares)
);
