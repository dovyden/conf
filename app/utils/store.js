import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import thunk from 'redux-thunk';
import {
    createLogger as logger
} from 'redux-logger';
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

// create store
export default createStore(
    combineReducers(reducers),
    {},  // initial store
    applyMiddleware(...middlewares)
);
