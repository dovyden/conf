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
import throttle from 'lodash/throttle';
import {loadState, saveState} from './localStorage/';
import {redirect} from './middlewares/redirect';

// add middlewares to redux store
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger({
        collapsed: true,
        diff: true,
        duration: true
    }));
    middlewares.push(redirect);
}

// restore state-store from localStorage
const persistedState = loadState();

// create store
const store = createStore(
    combineReducers(reducers),
    persistedState,  // initial store
    applyMiddleware(...middlewares)
);

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));

export default store;
