import {LAYOUT_CHANGE} from '../constants/layout';

const initialState = {
    stateId: 1,
    direction: 'row',
    tape: '100%',
    cellOf1stTape: '100%',
    cellOf2ndTape: '100%',
};

const initState = {
    root: {
        state: 1,
        direction: 'row',
    },
    tape: ['100%','0%'],        // flexBasis for 1st tape, 2nd tape
    cell: [{
        contentId: 0,
        flexBasis: '100%'
    }, {
        contentId: 1,
        flexBasis: '0%'
    }, {
        contentId: 2,
        flexBasis: '0%'
    }, {
        contentId: 3,
        flexBasis: '0%'
    }],
    content: [{
        type: 'navigator',
        id: null,
    }, {
        type: 'document',
        id: null,
    }, {
        type: 'navigator',
        id: null,
    }, {
        type: 'navigator',
        id: null,
    }],
};

export default function layout(state = initState, action) {
    switch (action.type) {

        case LAYOUT_CHANGE:
            return {...state,
                root: {
                    state: action.payload.stateId,
                    direction: action.payload.direction,
                },
                tape: [action.payload.tape, `${100 - parseFloat(action.payload.tape)}%`],
                cell: [{
                    contentId: action.payload.contentId[0],
                    flexBasis: action.payload.cellOf1stTape,
                }, {
                    contentId: action.payload.contentId[1],
                    flexBasis: `${100 - parseFloat(action.payload.cellOf1stTape)}%`,
                }, {
                    contentId: action.payload.contentId[2],
                    flexBasis: action.payload.cellOf2ndTape
                }, {
                    contentId: action.payload.contentId[3],
                    flexBasis: `${100 - parseFloat(action.payload.cellOf2ndTape)}%`,
                }]
            };

        default:
            return state;
    }
}
