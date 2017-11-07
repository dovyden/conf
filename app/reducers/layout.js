import {LAYOUT_CHANGE} from '../constants/layout';

const initState = {
    root: {
        state: 1,
        direction: 'row',
    },
    tape: [100, 0],         // flexBasis for 1st tape, 2nd tape
    cell: [{
        contentId: 0,
        flexBasis: 100      // 1st cell of 1st tape
    }, {
        contentId: null,
        flexBasis: 0        // 2st cell of 1st tape
    }, {
        contentId: null,
        flexBasis: 0        // 1st cell of 2st tape
    }, {
        contentId: null,
        flexBasis: 0        // 2st cell of 2st tape
    }],
    content: [{
        type: 'navigator',
        id: null,
    }, {
        type: 'empty1',
        id: null,
    }, {
        type: 'empty2',
        id: null,
    }, {
        type: 'empty3',
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
                tape: [tape, 100 - tape],
                cell: [{
                    contentId: contentId[0],
                    flexBasis: cellOf1stTape,
                }, {
                    contentId: contentId[1],
                    flexBasis: 100 - cellOf1stTape,
                }, {
                    contentId: contentId[2],
                    flexBasis: cellOf2ndTape
                }, {
                    contentId: contentId[3],
                    flexBasis: 100 - cellOf2ndTape,
                }]
            };

        default:
            return state;
    }
}
