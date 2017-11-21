import {
    LAYOUT_CHANGE,
    NAVIGATE_TO,
} from '../constants/layout';

export const changeLayout = (props) => ({
    type: LAYOUT_CHANGE,
    payload: props,
});

export const navigateTo = (props) => ({
    type: NAVIGATE_TO,
    payload: props,
});
