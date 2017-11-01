import {LAYOUT_CHANGE} from '../constants/layout';

export const changeLayout = (props) => ({
    type: LAYOUT_CHANGE,
    payload: props,
});
