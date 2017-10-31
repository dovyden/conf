import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import {
    createLogger as logger
} from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import {loadState} from './localStorage';

// add middlewares to redux store
const middlewares = [thunk];
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger({
        collapsed: true,
        diff: true,
        duration: true
    }));
    // Redux_Dev_Tools extension
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// restore state-store from localStorage
const persistedState = loadState();

// create store
export default createStore(
    combineReducers(reducers),
    persistedState,  // initial store
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);
