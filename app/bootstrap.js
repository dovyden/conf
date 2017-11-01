import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './utils/store';

// we should extend b_ before it will be used
import './utils/b-extends';

import './components/Page/Page';
import App from './components/App/App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
