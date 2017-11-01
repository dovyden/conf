import {LAYOUT_CHANGE} from '../constants/layout';

const initialState = {
    stateId: 1,
    direction: 'row',
    tape: '100%',
    cellOf1stTape: '100%',
    cellOf2ndTape: '100%',
};

export default function layout(state = initialState, action) {
    switch (action.type) {

        case LAYOUT_CHANGE:
            return {...state,
                stateId: action.payload.stateId,
                direction: action.payload.direction,
                tape: action.payload.tape,
                cellOf1stTape: action.payload.cellOf1stTape,
                cellOf2ndTape: action.payload.cellOf2ndTape,
            };

        default:
            return state;
    }
}
