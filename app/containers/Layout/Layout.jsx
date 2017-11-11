import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changeLayout} from '../../actions/layout';
import LayoutComponent from '../../components/Layout/Layout';
import Tape from '../../components/Layout/Tape';
import Splitter from '../../components/Layout/Splitter';

function unFocus(document, window) {
    if (document.selection) {
        document.selection.empty();
    } else {
        try {
            window.getSelection().removeAllRanges();
        } catch (e) {}
    }
}

class Layout extends Component {
    constructor(props) {
        super(props);

        const {state} = this.props.layout.root;

        this.state = {
            currentState: state,
            top: 0,                         //4 splitters %
            bottom: 100,
            left: 0,
            right: 100,
            hiddenSplitters: '',            //display: none for splitters
            contentId: [0, null, null, null],   //for beginning doesn't matter

            draggingSplitters: '',          //type of dragging
            isDragging: false,              //state of dragging
            parentWidth: 0,                 //of tape
            parentHeight: 0,                //depend on size of splitter
            offsetX: 0,
            offsetY: 0,

            minSizeOfCell: 50,              //for creating and deleting
            sizeOfBox: 20,                  //for dragging intersection point
        };
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.mouseMoveLine.bind(this), false);
        window.addEventListener('mouseup', this.mouseUpLine.bind(this), false);
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.mouseMoveLine.bind(this), false);
        window.removeEventListener('mouseup', this.mouseUpLine.bind(this), false);
    }

    down1(e) {
        switch (e.target.dataset.type) {
            case 'top':
            case 'bottom':
                this.downTo3(e, e.target.dataset.type);
                break;

            case 'left':
            case 'right':
                const type1 = e.target.dataset.type;
                const type2 = this.possibleDownTo2(e);
                if (type2) {

                    this.downTo2(e, `${type1} ${type2}`);
                } else {
                    this.downTo3(e, type1);
                }
                break;
        }
    }
    down2(e) {
        switch (e.target.dataset.type) {
            case 'top':
                this.downTo5();
                break;

            case 'bottom':
                this.downTo5();
                break;

            case 'left':
            case 'right':
                const type1 = e.target.dataset.type;
                const type2 = this.possibleDownTo2(e);
                if (type2) {
                    this.downTo2(e, `${type1} ${type2}`);
                } else {
                    this.downTo5();
                }
                break;
        }
    }
    down3(e) {
        if (e.target.dataset.type === this.state.draggingSplitters) {
            this.downTo3(e, e.target.dataset.type);
        } else {
            this.downTo4();         // e.target.dataset.type: top, bottom, ...
        }
    }

    down4() {
        if ('pos of splitter !== 0% or 100%') {
            if ('type of splitter === left or right') {
                this.possibleDownTo4();
            } else {

            }
            if ('size of splitter !== 100%') {

            }

        } else {
            this.downTo4();         // e.target.dataset.type: top, bottom, ...
        }
    }

    possibleDownTo2(e) {
        return (Math.abs(e.clientY - this.state.top * e.target.parentElement.clientHeight
            / 100) < this.state.sizeOfBox) ? 'top' :
            (Math.abs(this.state.bottom * e.target.parentElement.clientHeight / 100
                - e.clientY) < this.state.sizeOfBox) ? 'bottom' : '';
    }

    possibleDownTo4(e) {

    }

    downTo2(e, types) {
        const opposite = (types === 'left top') ? 'right bottom' :
            (types === 'right bottom') ? 'left top' :
            (types === 'left bottom') ? 'right top' : 'left bottom';

        let contentId = [];
        switch (this.state.currentState) {
            case 1:
                contentId = (types === 'left top') ?
                    [null, null, null, this.props.layout.cell[0].contentId] :
                    (types === 'right bottom') ?
                        [this.props.layout.cell[0].contentId, null, null, null] :
                        (types === 'left bottom') ?
                            [null, null, this.props.layout.cell[0].contentId, null] :
                            [null, this.props.layout.cell[0].contentId, null, null];
                break;
            case 2:
                contentId = this.state.contentId;
                break;
        }

        const arr = types.split(' ');

        this.setState({
            ...this.state,
            currentState: 2,
            draggingSplitters: types,
            hiddenSplitters: opposite,
            isDragging: true,
            contentId: contentId,

            parentHeight: e.target.parentElement.clientHeight,
            parentWidth: e.target.parentElement.clientWidth,
            offsetX: e.clientX - this.state[arr[0]] *
                e.target.parentElement.clientWidth / 100,
            offsetY: e.clientY - this.state[arr[1]] *
                e.target.parentElement.clientHeight / 100,
        });
    }
    downTo3(e, type) {
        const opposite = (type === 'top') ? 'bottom' :
            (type === 'bottom') ? 'top' :
            (type === 'left') ? 'right' : 'left';

        let contentId = [];
        switch (this.state.currentState) {
            case 1:
                contentId = (type === 'top' || type === 'left') ?
                    [null, null, this.props.layout.cell[0].contentId, null] :
                    [this.props.layout.cell[0].contentId, null, null, null];
                break;
            case 3:
                contentId = this.state.contentId;
                break;
        }

        const arr = (type === 'left' || type === 'right') ?
            [e.clientX - this.state[type] *
                e.target.parentElement.clientWidth / 100, 0] :
            [0, e.clientY - this.state[type] *
                e.target.parentElement.clientHeight / 100];

        this.setState({
            ...this.state,
            currentState: 3,
            draggingSplitters: type,
            hiddenSplitters: opposite,
            isDragging: true,
            contentId: contentId,

            parentHeight: e.target.parentElement.clientHeight,
            parentWidth: e.target.parentElement.clientWidth,
            offsetX: arr[0],
            offsetY: arr[1],
        });
    }
    downTo4 = (e) => {}
    downTo5 = (e) => {}

    move2(e) {
        const arr = this.state.draggingSplitters.split(' ');

        this.setState({
            ...this.state,
            [arr[0]]: (e.clientX - this.state.offsetX) /
                this.state.parentWidth * 100,
            [arr[1]]: (e.clientY - this.state.offsetY) /
                this.state.parentHeight * 100,
        });
    }
    move3(e) {
        const position = (this.state.draggingSplitters === 'top' ||
            this.state.draggingSplitters === 'bottom') ?
            (e.clientY - this.state.offsetY) / this.state.parentHeight * 100 :
            (e.clientX - this.state.offsetX) / this.state.parentWidth * 100;

        this.setState({
            ...this.state,
            [this.state.draggingSplitters]: position,
        });
    }

    up2(e) {
        let contentId = this.possibleUpTo1(e, 2);
        if (contentId !== false) {
            this.upTo1(contentId);
        } else {
            const arr = this.state.draggingSplitters.split(' ');
            contentId = this.possibleUpTo2(e, 2);
            if (contentId !== false) {
                this.upTo2(this.state.draggingSplitters,
                    this.state[arr[0]] + this.state.offsetX /
                        this.state.parentWidth * 100,
                    this.state[arr[1]] + this.state.offsetY /
                        this.state.parentHeight * 100, contentId);
            } else {
                (e.clientY < this.state.minSizeOfCell) ?
                    this.upTo3(arr[0], (e.clientX - this.state.offsetX) /
                        this.state.parentWidth * 100, [this.state.contentId[1],
                        null,  this.state.contentId[3], null]) :

                    (e.clientY > this.state.parentHeight - this.state.minSizeOfCell) ?
                        this.upTo3(arr[0], (e.clientX - this.state.offsetX) /
                            this.state.parentWidth * 100, [this.state.contentId[0],
                            null,  this.state.contentId[2], null]) :

                        (e.clientX < this.state.minSizeOfCell) ?
                            this.upTo3(arr[1], (e.clientY - this.state.offsetY) /
                                this.state.parentHeight * 100, [this.state.contentId[2],
                                null,  this.state.contentId[3], null]) :

                            this.upTo3(arr[1], (e.clientY - this.state.offsetY) /
                                this.state.parentHeight * 100, [this.state.contentId[0],
                                null,  this.state.contentId[1], null])
            }       // change!
        }
    }
    up3(e) {
        const contentId = this.possibleUpTo1(e, 3);
        if (contentId !== false) {
            this.upTo1(contentId);
        } else {
            const pos = (this.state.draggingSplitters === 'top' ||
                this.state.draggingSplitters === 'bottom') ?
                e.clientY / this.state.parentHeight * 100 :
                e.clientX / this.state.parentWidth * 100;

            this.upTo3(this.state.draggingSplitters, pos, this.state.contentId);
        }
    }

    possibleUpTo1(e, previousState) {
        const top = (e.clientY < this.state.minSizeOfCell);
        const bottom = (e.clientY > this.state.parentHeight -
            this.state.minSizeOfCell);
        const left = (e.clientX < this.state.minSizeOfCell);
        const right = (e.clientX > this.state.parentWidth -
            this.state.minSizeOfCell);

        switch (previousState) {
            case 2:
                return (top && left) ? [this.state.contentId[3], null, null, null] :                    // 0,1,2,3 content id
                    (top && right) ? [this.state.contentId[1], null, null, null] :
                        (bottom && left) ? [this.state.contentId[2], null, null, null] :
                            (bottom && right) ? [this.state.contentId[0], null, null, null] : false;    // false
            case 3:
                return (top || left) ?  [this.state.contentId[2], null, null, null] :                   // 0 and 2 content id
                    (bottom || right) ? [this.state.contentId[0], null, null, null] : false;            // false
            // case 4:
            // case 5:              all must return id or  false;
        }

    }
    possibleUpTo2(e, previousState) {
        switch (previousState) {
            case 2:
                if (e.clientY > this.state.minSizeOfCell &&
                    e.clientX > this.state.minSizeOfCell &&
                    e.clientY < this.state.parentHeight -
                                this.state.minSizeOfCell &&
                    e.clientX < this.state.parentWidth -
                                this.state.minSizeOfCell) {
                    return this.state.contentId;
                } else {
                    return false;
                }
            // case 4:
            // case 5:              all must return [] or -1;
        }
    }

    upTo1(contentId) {
        this.setState({
            ...this.state,
            currentState: 1,
            isDragging: false,
            draggingSplitters: '',
            top: 0,
            bottom: 100,
            left: 0,
            right: 100,
            hiddenSplitters: '',
            contentId: contentId,
        });

        const {changeLayout} = this.props;
        changeLayout({
            state: 1,
            direction: 'row',
            tape: 100,
            cellOf1stTape: 100,
            cellOf2ndTape: 0,
            contentId: contentId,
        });
    }
    upTo2(types, size, sizeOfCell, contentId) {
        const opposite = (types === 'left top') ? 'right bottom' :
            (types === 'right bottom') ? 'left top' :
            (types === 'left bottom') ? 'right top' : 'left bottom';

        this.setState({
            ...this.state,
            currentState: 2,
            isDragging: false,
            draggingSplitters: types,
            hiddenSplitters: opposite,
            contentId: contentId,
        });

        const {changeLayout} = this.props;
        changeLayout({
            stateId: 2,
            direction: 'row',
            tape: size,
            cellOf1stTape: sizeOfCell,
            cellOf2ndTape: sizeOfCell,
            contentId: contentId,
        });
    }
    upTo3(type, size, contentId) {
        const direction = (type === 'top' || type === 'bottom') ? 'column' :
            'row';
        const opposite = (type === 'top') ? 'bottom' :
            (type === 'bottom') ? 'top' :
            (type === 'left') ? 'right' : 'left';

        let splitters = {
            top: 0,
            bottom: 100,
            left: 0,
            right: 100,
        }
        delete splitters[type];

        this.setState({
            ...this.state,
            currentState: 3,
            isDragging: false,
            draggingSplitters: type,
            ...splitters,
            hiddenSplitters: opposite,
            contentId: contentId,
        });

        const {changeLayout} = this.props;
        changeLayout({
            stateId: 3,
            direction,
            tape: size,
            cellOf1stTape: 100,
            cellOf2ndTape: 100,
            contentId: contentId,
        });
    }

    mouseDownLine(e) {
        if (e.target.dataset.type) {
            switch (this.state.currentState) {
                case 1:
                    this.down1(e);
                    break;
                case 2:
                    this.down2(e);
                    break;
                case 3:
                    this.down3(e);
                    break;
                case 4:
                    this.down4(e);
                    break;
                case 5:
                    this.down5(e);
                    break;
            }
        }
    }
    mouseMoveLine(e) {
        if (this.state.isDragging) {
            unFocus(document, window);
            switch (this.state.currentState){
                case 2:
                    this.move2(e);
                    break;
                case 3:
                    this.move3(e);
                    break;
                case 4:
                    this.move4(e);
                    break;
                case 5:
                    this.move5(e);
                    break;
            }
        }
    }
    mouseUpLine(e) {
        if (this.state.isDragging) {
            switch (this.state.currentState) {
                case 2:
                    this.up2(e);
                    break;
                case 3:
                    this.up3(e);
                    break;
                case 4:
                    this.up4(e);
                    break;
                case 5:
                    this.up5(e);
                    break;
            }
        }
    }

    render() {
        const {
            top,
            bottom,
            left,
            right,
            hiddenSplitters,
        } = this.state;

        const {
            tape,
            cell,
        } = this.props.layout;

        const {direction} = this.props.layout.root;

        return (
            <LayoutComponent
                direction={direction}
                mousedown={this.mouseDownLine.bind(this)}
            >
                <Splitter
                    type={'top'}
                    position={`${top}%`}
                    display = {hiddenSplitters}
                />
                <Splitter
                    type={'bottom'}
                    position={`${bottom}%`}
                    display = {hiddenSplitters}
                />
                <Splitter
                    type={'left'}
                    position={`${left}%`}
                    display = {hiddenSplitters}
                />
                <Splitter
                    type={'right'}
                    position={`${right}%`}
                    display = {hiddenSplitters}
                />
                <Tape
                    type={'tape'}
                    direction={(direction === 'row') ? 'column' : 'row'}
                    size={`${tape[0]}%`}
                >
                    <Tape
                        type={'cell'}
                        size={`${cell[0].flexBasis}%`}
                    >{cell[0].contentId}</Tape>
                    <Tape
                        type={'cell'}
                        size={`${cell[1].flexBasis}%`}
                    >{cell[1].contentId}</Tape>
                </Tape>

                <Tape
                    type={'tape'}
                    direction={(direction === 'row') ? 'column' : 'row'}
                    size={`${tape[1]}%`}
                >
                    <Tape
                        type={'cell'}
                        size={`${cell[2].flexBasis}%`}
                    >{cell[2].contentId}</Tape>
                    <Tape
                        type={'cell'}
                        size={`${cell[3].flexBasis}%`}
                    >{cell[3].contentId}</Tape>
                </Tape>
            </LayoutComponent>
        );
    }
}

Layout.propTypes = {
    data: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        layout: state.layout
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeLayout: (props) => dispatch(changeLayout(props))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
        