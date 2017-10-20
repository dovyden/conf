import {
    ROUTING
} from '../../constants/routing';

export const redirect = store => next => action => {
    if (action.type === ROUTING) {
        action.payload.method(action.payload.nextUrl);
    }

    return next(action)
};
