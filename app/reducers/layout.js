import {LAYOUT_CHANGE} from '../constants/layout';

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

export default function layout(state = initState, {type, payload}) {
    switch (type) {

        case LAYOUT_CHANGE:
            const {
                stateId,
                direction,
                tape,
                contentId,
                cellOf1stTape,
                cellOf2ndTape,
            } = payload;

            return {...state,
                root: {
                    state: stateId,
                    direction: direction,
                },
                tape: [tape, `${100 - parseFloat(tape)}%`],
                cell: [{
                    contentId: contentId[0],
                    flexBasis: cellOf1stTape,
                }, {
                    contentId: contentId[1],
                    flexBasis: `${100 - parseFloat(cellOf1stTape)}%`,
                }, {
                    contentId: contentId[2],
                    flexBasis: cellOf2ndTape
                }, {
                    contentId: contentId[3],
                    flexBasis: `${100 - parseFloat(cellOf2ndTape)}%`,
                }]
            };

        default:
            return state;
    }
}
