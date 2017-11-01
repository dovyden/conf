import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LayoutComponent from '../../components/Layout/Layout';
import Tape from '../../components/Layout/Tape';
import Splitter from '../../components/Layout/Splitter';
import Cell from '../../components/Layout/Cell'


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
        this.state = {
            currentState: 1,
            top: '0%',                      //4 splitters
            bottom: '100%',
            left: '0%',
            right: '100%',
            displayNone: '',                //display: none for splitters
            tape: '100%',                   //flexBasis for 1st tape
            cellOf1stTape: '100%',          //flexBasis for 1st cell of 1st tape
            cellOf2ndTape: '100%',          //flexBasis for 1st cell of 2nd tape
            direction: 'row',               //for tapes => for cells is opposite

            type: '',                       //type of dragging
            isDragging: false,              //state of dragging
            parentWidth: 0,                 //of cell or tape
            parentHeight: 0,                //depend on size of splitter

            minSizeOfCell: 50,              //for creating and deleting
            sizeOfBox: 20,                  //for dragging intersection point
        };
    }

    componentDidMount() {
        this.setState({                             //only for tapes version
            tape: this.props.data.flexBasis,
            direction: this.props.data.direction,
        });
        window.addEventListener('mousemove', this.mouseMoveLine, false);
        window.addEventListener('mouseup', this.mouseUpLine, false);
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.mouseMoveLine, false);
        window.removeEventListener('mouseup', this.mouseUpLine, false);
    }

    down1 = (e) => {
        switch (e.target.dataset.type) {
            case 'top':
            case 'bottom':
                const type = e.target.dataset.type;
                const opposite = (type === 'top') ? 'bottom' : 'top';
                this.downTo3(e, type, opposite);
                break;
            case 'left':
            case 'right':
                const type1 = e.target.dataset.type;
                const opposite1 = (type1 === 'left') ? 'right' : 'left';
                const type2 = this.possibleDownTo2(e);
                if (type2) {
                    const opposite2 = (type2 === 'top') ? 'bottom' : 'top';
                    this.downTo2(e, `${type1} ${type2}`, `${opposite1} ${opposite2}`);
                } else {
                    this.downTo3(e, type1, opposite1);
                }
                break;
        }
    }
    down2 = (e) => {
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
                const opposite1 = (type1 === 'left') ? 'right' : 'left';
                const type2 = this.possibleDownTo2(e);
                if (type2) {
                    const opposite2 = (type2 === 'top') ? 'bottom' : 'top';
                    this.downTo2(e, `${type1} ${type2}`, `${opposite1} ${opposite2}`);
                } else {
                    this.downTo5();
                }
                break;
        }
    }
    down3 = (e) => {
        if (e.target.dataset.type === this.state.type) {
            const type = e.target.dataset.type;
            const opposite = (type === 'top') ? 'bottom' :
                (type === 'bottom') ? 'top' :
                    (type === 'left') ? 'right' : 'left';
            this.downTo3(e, type, opposite);
        } else {
            switch (e.target.dataset.type) {
                case 'top':
                    this.downTo4();
                    break;
                case 'bottom':
                    this.downTo4();
                    break;
                case 'left':
                    this.downTo4();
                    break;
                case 'right':
                    this.downTo4();
                    break;
            }
        }
    }

    possibleDownTo2 = (e) => {
        if (e.clientY - parseFloat(this.state.top) *
            e.target.parentElement.clientHeight / 100 < this.state.sizeOfBox){
            return 'top';
        } else {
            if (parseFloat(this.state.bottom) * e.target.parentElement.clientHeight / 100
                - e.clientY < this.state.sizeOfBox) {
                return 'bottom';
            } else {
                return false;
            }
        }
    }

    downTo2 = (e, type, opposite) => {

        this.setState({
            ...this.state,
            currentState: 2,
            type: type,
            displayNone: opposite,
            isDragging: true,

            parentHeight: e.target.parentElement.clientHeight,
            parentWidth: e.target.parentElement.clientWidth,
        });
    }
    downTo3 = (e, type, opposite) => {
        this.setState({
            ...this.state,
            currentState: 3,
            type: type,
            displayNone: opposite,
            isDragging: true,

            parentHeight: e.target.parentElement.clientHeight,
            parentWidth: e.target.parentElement.clientWidth,
        });
    }
    downTo4 = (e) => {}
    downTo5 = (e) => {}

    move2 = (e) => {
        switch (this.state.type) {
            case 'left top':
                this.setState({
                    ...this.state,
                    left: `${e.clientX / this.state.parentWidth * 100}%`,
                    top: `${e.clientY / this.state.parentHeight * 100}%`,
                });
                break;
            case 'left bottom':
                this.setState({
                    ...this.state,
                    left: `${e.clientX / this.state.parentWidth * 100}%`,
                    bottom: `${e.clientY / this.state.parentHeight * 100}%`,
                });
                break;
            case 'right top':
                this.setState({
                    ...this.state,
                    right: `${e.clientX / this.state.parentWidth * 100}%`,
                    top: `${e.clientY / this.state.parentHeight * 100}%`,
                });
                break;
            case 'right bottom':
                this.setState({
                    ...this.state,
                    right: `${e.clientX / this.state.parentWidth * 100}%`,
                    bottom: `${e.clientY / this.state.parentHeight * 100}%`,
                });
                break;
        }
    }
    move3 = (e) => {
        switch (this.state.type) {
            case 'top':
                this.setState({
                    ...this.state,
                    top: `${e.clientY / this.state.parentHeight * 100}%`,
                });
                break;
            case 'bottom':
                this.setState({
                    ...this.state,
                    bottom: `${e.clientY / this.state.parentHeight * 100}%`,
                });
                break;
            case 'left':
                this.setState({
                    ...this.state,
                    left: `${e.clientX / this.state.parentWidth * 100}%`,
                });
                break;
            case 'right':
                this.setState({
                    ...this.state,
                    right: `${e.clientX / this.state.parentWidth * 100}%`,
                });
                break;
        }
    }

    up2 = (e) => {
        if (this.possibleUpTo1(e, 2)) {
            this.upTo1();
        } else {
                switch (this.state.type) {
                    case 'left top':
                        if (this.possibleUpTo2(e, 2)) {
                            this.upTo2('left top', 'right bottom',
                                this.state.left, this.state.top);
                        } else {
                            if (e.clientY < this.state.minSizeOfCell ||
                                e.clientY > this.state.parentHeight -
                                            this.state.minSizeOfCell) {
                                this.upTo3('left', 'right',
                                    `${e.clientX / this.state.parentWidth * 100}%`);
                            } else {
                                this.upTo3('top', 'bottom',
                                    `${e.clientY / this.state.parentHeight * 100}%`);
                            }
                        }
                        break;
                    case 'left bottom':
                        if (this.possibleUpTo2(e, 2)) {
                            this.upTo2('left bottom', 'right top',
                                this.state.left, this.state.bottom);
                        } else {
                            if (e.clientY < this.state.minSizeOfCell ||
                                e.clientY > this.state.parentHeight -
                                this.state.minSizeOfCell) {
                                this.upTo3('left', 'right',
                                    `${e.clientX / this.state.parentWidth * 100}%`);
                            } else {
                                this.upTo3('bottom', 'top',
                                    `${e.clientY / this.state.parentHeight * 100}%`);
                            }
                        }
                        break;
                    case 'right top':
                        if (this.possibleUpTo2(e, 2)) {
                            this.upTo2('right top', 'left bottom',
                                this.state.right, this.state.top);
                        } else {
                            if (e.clientY < this.state.minSizeOfCell ||
                                e.clientY > this.state.parentHeight -
                                this.state.minSizeOfCell) {
                                this.upTo3('right', 'left',
                                    `${e.clientX / this.state.parentWidth * 100}%`);
                            } else {
                                this.upTo3('top', 'bottom',
                                    `${e.clientY / this.state.parentHeight * 100}%`);
                            }
                        }
                        break;
                    case 'right bottom':
                        if (this.possibleUpTo2(e, 2)) {
                            this.upTo2('right bottom', 'left top',
                                this.state.right, this.state.bottom);
                        } else {
                            if (e.clientY < this.state.minSizeOfCell ||
                                e.clientY > this.state.parentHeight -
                                this.state.minSizeOfCell) {
                                this.upTo3('right', 'left',
                                    `${e.clientX / this.state.parentWidth * 100}%`);
                            } else {
                                this.upTo3('bottom', 'top',
                                    `${e.clientY / this.state.parentHeight * 100}%`);
                            }
                        }
                        break;
                }
        }
    }
    up3 = (e) => {
        if (this.possibleUpTo1(e, 3)) {
            this.upTo1();
        } else {
            switch (this.state.type) {
                case 'top':
                    this.upTo3('top', 'bottom',
                        `${e.clientY / this.state.parentHeight * 100}%`);
                    break;
                case 'bottom':
                    this.upTo3('bottom', 'top',
                        `${e.clientY / this.state.parentHeight * 100}%`);
                    break;
                case 'left':
                    this.upTo3('left', 'right',
                        `${e.clientX / this.state.parentWidth * 100}%`);
                    break;
                case 'right':
                    this.upTo3('right', 'left',
                        `${e.clientX / this.state.parentWidth * 100}%`);
                    break;
            }
        }
    }

    possibleUpTo1 = (e, previousState) => {
        switch (previousState) {
            case 2:
                return (e.clientY < this.state.minSizeOfCell ||
                        e.clientY > this.state.parentHeight -
                                    this.state.minSizeOfCell) &&
                       (e.clientX < this.state.minSizeOfCell ||
                        e.clientX > this.state.parentWidth -
                                    this.state.minSizeOfCell)
            case 3:
                return (e.clientY < this.state.minSizeOfCell ||
                        e.clientY > this.state.parentHeight -
                                    this.state.minSizeOfCell ||
                        e.clientX < this.state.minSizeOfCell ||
                        e.clientX > this.state.parentWidth -
                                    this.state.minSizeOfCell)
        }
    }

    possibleUpTo2 = (e, previousState) => {
        switch (previousState) {
            case 2:
                return (e.clientY > this.state.minSizeOfCell &&
                        e.clientX > this.state.minSizeOfCell &&
                        e.clientY < this.state.parentHeight -
                                    this.state.minSizeOfCell &&
                        e.clientX < this.state.parentWidth -
                                    this.state.minSizeOfCell)
        }
    }

    upTo1 = () => {
        this.setState({
            ...this.state,
            currentState: 1,
            isDragging: false,
            type: '',
            direction: 'row',
            tape: '100%',
            cellOf1stTape: '100%',
            cellOf2ndTape: '100%',
            top: '0%',
            bottom: '100%',
            left: '0%',
            right: '100%',
            displayNone: '',
        });
    }
    upTo2 = (type, opposite, size, sizeOfCell) => {
        this.setState({
            ...this.state,
            currentState: 2,
            isDragging: false,
            type: type,
            direction: 'row',
            tape: size,
            cellOf1stTape: sizeOfCell,
            cellOf2ndTape: sizeOfCell,
            displayNone: opposite,
        });
    }
    upTo3 = (type, opposite, size) => {
        switch (type) {
            case 'top':
                this.setState({
                    ...this.state,
                    currentState: 3,
                    isDragging: false,
                    type: type,
                    direction: 'column',
                    tape: size,
                    cellOf1stTape: '100%',
                    cellOf2ndTape: '100%',
                    bottom: '100%',
                    left: '0%',
                    right: '100%',
                    displayNone: opposite,
                });
                break;
            case 'bottom':
                this.setState({
                    ...this.state,
                    currentState: 3,
                    isDragging: false,
                    type: type,
                    direction: 'column',
                    tape: size,
                    cellOf1stTape: '100%',
                    cellOf2ndTape: '100%',
                    top: '0%',
                    left: '0%',
                    right: '100%',
                    displayNone: opposite,
                });
                break;
            case 'left':
                this.setState({
                    ...this.state,
                    currentState: 3,
                    isDragging: false,
                    type: type,
                    direction: 'row',
                    tape: size,
                    cellOf1stTape: '100%',
                    cellOf2ndTape: '100%',
                    top: '0%',
                    bottom: '100%',
                    right: '100%',
                    displayNone: opposite,
                });
                break;
            case 'right':
                this.setState({
                    ...this.state,
                    currentState: 3,
                    isDragging: false,
                    type: type,
                    direction: 'row',
                    tape: size,
                    cellOf1stTape: '100%',
                    cellOf2ndTape: '100%',
                    top: '0%',
                    bottom: '100%',
                    left: '0%',
                    displayNone: opposite,
                });
                break;
        }
    }

    mouseDownLine = (e) => {
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
            }
        }
    }
    mouseMoveLine = (e) => {
        if (this.state.isDragging) {
            unFocus(document, window);
            switch (this.state.currentState){
                case 2:
                    this.move2(e);
                    break;
                case 3:
                    this.move3(e);
                    break;
            }
        }
    }
    mouseUpLine = (e) => {
        if (this.state.isDragging) {
            switch (this.state.currentState) {
                case 2:
                    this.up2(e);
                    break;
                case 3:
                    this.up3(e);
                    break;
            }
        }
    }

    render() {
        return (
            <LayoutComponent
                direction={this.state.direction}
                mousedown={this.mouseDownLine}
            >
                <Splitter type={'top'} position={this.state.top} display = {this.state.displayNone}/>
                <Splitter type={'bottom'} position={this.state.bottom} display = {this.state.displayNone}/>
                <Splitter type={'left'} position={this.state.left} display = {this.state.displayNone}/>
                <Splitter type={'right'} position={this.state.right} display = {this.state.displayNone}/>
                <Tape
                    direction={(this.state.direction === 'row') ? 'column' : 'row'}
                    size={this.state.tape}
                >
                    <Cell
                        size={this.state.cellOf1stTape}
                    />
                    <Cell
                        size={`${100 - parseFloat(this.state.cellOf1stTape)}%`}
                    />
                </Tape>
                <Tape
                    direction={(this.state.direction === 'row') ? 'column' : 'row'}
                    size={`${100 - parseFloat(this.state.tape)}%`}
                >
                    <Cell
                        size={this.state.cellOf2ndTape}
                    />
                    <Cell
                        size={`${100 - parseFloat(this.state.cellOf2ndTape)}%`}
                    />
                </Tape>
            </LayoutComponent>
        );
    }
}

Layout.propTypes = {
    data: PropTypes.object,
};

export default Layout;
