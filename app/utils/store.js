import {
    applyMiddleware,
    combineReducers,
    createStore
} from 'redux';
import {
    createLogger as logger
} from 'redux-logger';
import thunk from 'redux-thunk';

import {load} from './localStorage';
import reducers from '../reducers';

// add middlewares to redux store
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger({
        collapsed: true,
        diff: true,
        duration: true
    }));
}

// restore state-store from localStorage
const persistedState = {
    auth: load('auth')
};

// create store
export default createStore(
    combineReducers(reducers),
    persistedState,  // initial store
    applyMiddleware(...middlewares)
);
