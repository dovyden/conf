import io from 'socket.io-client';
import store from '../utils/store';

const options = {
    path: '/ws',
    transports: ['websocket', 'polling']
};
const url = 'http://localhost:80';

const socket = io.connect(url, options);


socket
    .on('message', (action) => {
        store.dispatch(action);
    })
    .on('error', (error) => {})
    .on('disconnect', (reason) => {});

const socketMiddleware = store => next => action => {
    const {type} = action;
    switch (type) {
        case 'LAYOUT_CHANGE':
        case 'ANOTHER':
            socket.emit('message', action);
            return next(action);

        default: return next(action);
    }
};

export {socket, socketMiddleware};
