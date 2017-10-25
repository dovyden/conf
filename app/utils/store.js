import {
    applyMiddleware,
    combineReducers,
    createStore,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import {
    createLogger as logger
} from 'redux-logger';
import reducers from '../reducers';
import {loadState} from './localStorage/';
import {redirect} from './middlewares/redirect';

// add middlewares to redux store
const middlewares = [thunk];
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger({
        collapsed: true,
        diff: true,
        duration: true
    }));
    middlewares.push(redirect);
    // Redux_Dev_Tools extension
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// restore state-store from localStorage
const persistedState = loadState();

// create store
const store = createStore(
    combineReducers(reducers),
    persistedState,  // initial store
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

export default store;
