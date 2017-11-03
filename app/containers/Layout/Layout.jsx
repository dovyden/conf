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
        this.state = {
            currentState: this.props.layout.root.state,
            top: '0%',                      //4 splitters
            bottom: '100%',
            left: '0%',
            right: '100%',
            hiddenSplitters: '',            //display: none for splitters

            draggingSplitters: '',          //type of dragging
            isDragging: false,              //state of dragging
            parentWidth: 0,                 //of tape
            parentHeight: 0,                //depend on size of splitter
            offsetX: 0,
            offsetY: 0,

            minSizeOfCell: 50,              //for creating and deleting     change on minSizeOfTape
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

    possibleDownTo2(e) {
        return (e.clientY - parseFloat(this.state.top) *
                e.target.parentElement.clientHeight / 100 <
                this.state.sizeOfBox) ? 'top' :
                    (parseFloat(this.state.bottom) *
                    e.target.parentElement.clientHeight / 100 - e.clientY <
                    this.state.sizeOfBox) ? 'bottom' : '';
    }

    downTo2(e, types) {
        const opposite = (types === 'left top') ? 'right bottom' :
            (types === 'right bottom') ? 'left top' :
            (types === 'left bottom') ? 'right top' : 'left bottom';
        const arr = types.split(' ');

        this.setState({
            ...this.state,
            currentState: 2,
            draggingSplitters: types,
            hiddenSplitters: opposite,
            isDragging: true,

            parentHeight: e.target.parentElement.clientHeight,
            parentWidth: e.target.parentElement.clientWidth,
            offsetX: e.clientX - parseFloat(this.state[arr[0]]) *
                e.target.parentElement.clientWidth / 100,
            offsetY: e.clientY - parseFloat(this.state[arr[1]]) *
                e.target.parentElement.clientHeight / 100,
        });
    }
    downTo3(e, type) {
        const opposite = (type === 'top') ? 'bottom' :
            (type === 'bottom') ? 'top' :
            (type === 'left') ? 'right' : 'left';
        const arr = (type === 'left' || type === 'right') ?
            [e.clientX - parseFloat(this.state[type]) *
                e.target.parentElement.clientWidth / 100, 0] :
            [0, e.clientY - parseFloat(this.state[type]) *
                e.target.parentElement.clientHeight / 100];

        this.setState({
            ...this.state,
            currentState: 3,
            draggingSplitters: type,
            hiddenSplitters: opposite,
            isDragging: true,

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
            [arr[0]]: `${(e.clientX - this.state.offsetX) / 
                this.state.parentWidth * 100}%`,
            [arr[1]]: `${(e.clientY - this.state.offsetY) /
                this.state.parentHeight * 100}%`,
        });
    }
    move3(e) {
        const position = (this.state.draggingSplitters === 'top' ||
            this.state.draggingSplitters === 'bottom') ?
            `${(e.clientY - this.state.offsetY) / this.state.parentHeight * 100}%` :
            `${(e.clientX - this.state.offsetX) / this.state.parentWidth * 100}%`;

        this.setState({
            ...this.state,
            [this.state.draggingSplitters]: position,
        });
    }

    up2(e) {
        if (this.possibleUpTo1(e, 2)) {
            this.upTo1();
        } else {
            const arr = this.state.draggingSplitters.split(' ');

            if (this.possibleUpTo2(e, 2)) {
                this.upTo2(this.state.draggingSplitters,
                    `${(parseFloat(this.state[arr[0]]) + this.state.offsetX / 
                        this.state.parentWidth * 100)}%`,
                    `${(parseFloat(this.state[arr[1]]) + this.state.offsetY / 
                        this.state.parentHeight * 100)}%`);
            } else {
                const args = (e.clientY < this.state.minSizeOfCell ||
                    e.clientY > this.state.parentHeight -
                    this.state.minSizeOfCell) ? {
                        type: arr[0],
                        distance: `${(e.clientX - this.state.offsetX) /
                            this.state.parentWidth * 100}%`,
                    } : {
                        type: arr[1],
                        distance: `${(e.clientY - this.state.offsetY) / 
                            this.state.parentHeight * 100}%`,
                    }

                this.upTo3(args.type, args.distance);
            }
        }
    }
    up3(e) {
        if (this.possibleUpTo1(e, 3)) {

            this.upTo1();
        } else {
            const pos = (this.state.draggingSplitters === 'top' ||
                this.state.draggingSplitters === 'bottom') ?
                `${e.clientY / this.state.parentHeight * 100}%` :
                `${e.clientX / this.state.parentWidth * 100}%`;

            this.upTo3(this.state.draggingSplitters, pos);
        }
    }

    possibleUpTo1(e, previousState) {
        const a = (
            e.clientY < this.state.minSizeOfCell ||
            e.clientY > this.state.parentHeight -
            this.state.minSizeOfCell
        );

        const b = (
            e.clientX < this.state.minSizeOfCell ||
            e.clientX > this.state.parentWidth -
            this.state.minSizeOfCell
        );

        switch (previousState) {
            case 2:
                return a && b;
            case 3:
                return a || b;
        }

    }
    possibleUpTo2(e, previousState) {
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

    upTo1(contentId) {
        this.setState({
            ...this.state,
            currentState: 1,
            isDragging: false,
            draggingSplitters: '',
            top: '0%',
            bottom: '100%',
            left: '0%',
            right: '100%',
            hiddenSplitters: '',
        });

        const {changeLayout} = this.props;
        changeLayout({
            state: 1,
            direction: 'row',
            tape: '100%',
            cellOf1stTape: '100%',
            cellOf2ndTape: '100%',
            contentId: [contentId, null, null, null]
        });
    }
    upTo2(types, size, sizeOfCell) {
        const opposite = (types === 'left top') ? 'right bottom' :
            (types === 'right bottom') ? 'left top' :
            (types === 'left bottom') ? 'right top' : 'left bottom';

        this.setState({
            ...this.state,
            currentState: 2,
            isDragging: false,
            draggingSplitters: types,
            hiddenSplitters: opposite,
        });

        const {changeLayout} = this.props;
        changeLayout({
            stateId: 2,
            direction: 'row',
            tape: size,
            cellOf1stTape: sizeOfCell,
            cellOf2ndTape: sizeOfCell,
        });
    }
    upTo3(type, size) {
        const direction = type === ('top' || 'bottom') ? 'column' : 'row';
        const opposite = (type === 'top') ? 'bottom' :
            (type === 'bottom') ? 'top' :
            (type === 'left') ? 'right' : 'left';

        let splitters = {
            top: '0%',
            bottom: '100%',
            left: '0%',
            right: '100%',
        }
        delete splitters[type];

        this.setState({
            ...this.state,
            currentState: 3,
            isDragging: false,
            draggingSplitters: type,
            ...splitters,
            hiddenSplitters: opposite,
        });

        const {changeLayout} = this.props;
        changeLayout({
            stateId: 3,
            direction,
            tape: size,
            cellOf1stTape: '100%',
            cellOf2ndTape: '100%',
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
            }
        }
    }

    render() {
        return (
            <LayoutComponent
                direction={this.props.layout.root.direction}
                mousedown={this.mouseDownLine.bind(this)}
            >
                <Splitter
                    type={'top'}
                    position={this.state.top}
                    display = {this.state.hiddenSplitters}
                />
                <Splitter
                    type={'bottom'}
                    position={this.state.bottom}
                    display = {this.state.hiddenSplitters}
                />
                <Splitter
                    type={'left'}
                    position={this.state.left}
                    display = {this.state.hiddenSplitters}
                />
                <Splitter
                    type={'right'}
                    position={this.state.right}
                    display = {this.state.hiddenSplitters}
                />
                <Tape
                    type={'tape'}
                    direction={(this.props.layout.root.direction === 'row') ?
                        'column' : 'row'}
                    size={this.props.layout.tape[0]}
                >
                    <Tape
                        type={'cell'}
                        size={this.props.layout.cell[0].flexBasis}
                    >{this.props.layout.cell[0].contentId}</Tape>
                    <Tape
                        type={'cell'}
                        size={this.props.layout.cell[1].flexBasis}
                    >{this.props.layout.cell[1].contentId}</Tape>
                </Tape>
                <Tape
                    type={'tape'}
                    direction={(this.props.layout.root.direction === 'row') ?
                        'column' : 'row'}
                    size={this.props.layout.tape[1]}
                >
                    <Tape
                        type={'cell'}
                        size={this.props.layout.cell[2].flexBasis}
                    >{this.props.layout.cell[2].contentId}</Tape>
                    <Tape
                        type={'cell'}
                        size={this.props.layout.cell[3].flexBasis}
                    >{this.props.layout.cell[3].contentId}</Tape>
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
