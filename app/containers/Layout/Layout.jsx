import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changeLayout, navigateTo} from '../../actions/layout';
import LayoutComponent from '../../components/Layout/Layout';
import Navigator from '../Navigator/Navigator';
import Tape from '../../components/Layout/Tape';
import Splitter from '../../components/Layout/Splitter';
import Box from '../../components/Layout/Box';

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

            draggingElement: '',
            isDragging: false,
            contentId: [0, 1, 2, 3],        // for beginning doesn't matter

            // [X, Y, visibility, jointHorizontal, jointVertical]
            box1st: [0, 0, true, 'top', 'left'],
            box2nd: [0, 100, true, 'bottom', 'left'],
            box3rd: [100, 0, true, 'top', 'right'],
            box4th: [100, 100, true, 'bottom', 'right'],

            top: [0, 100, true],            // [position, size, visibility]
            bottom: [100, 100, true],
            left: [0, 100, true],
            right: [100, 100, true],

            parentWidth: 0,                 // of tape
            parentHeight: 0,                // depend on size of splitter
            offsetX: 0,
            offsetY: 0,

            minSizeOfCell: 50,              // for creating and deleting
            sizeOfBox: 20,                  // for dragging intersection point
        };
        this.mouseDownLine = this.mouseDownLine.bind(this);

        this.navigateTo1stCell = this.navigate.bind(this, 0);
        this.navigateTo2ndCell = this.navigate.bind(this, 1);
        this.navigateTo3rdCell = this.navigate.bind(this, 2);
        this.navigateTo4thCell = this.navigate.bind(this, 3);
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
            case 'left':
            case 'right':
                this.downTo3(e, e.target.dataset.type);
                break;

            case 'box1st':                              // dragging box
            case 'box2nd':
            case 'box3rd':
            case 'box4th':
                this.downTo2(e, e.target.dataset.type);
                break;
        }
    }
    down2(e) {
        switch (e.target.dataset.type) {
            case 'top':
            case 'left':
            case 'right':
            case 'bottom':
                this.downTo5();
                break;

            case 'box1st':                              // dragging box
            case 'box2nd':
            case 'box3rd':
            case 'box4th':
                this.downTo2(e, e.target.dataset.type);
                break;
        }
    }
    down3(e) {
        switch (e.target.dataset.type) {
            case 'top':                         // dragging splitter
            case 'bottom':
            case 'left':
            case 'right':
                if (this.state[e.target.dataset.type][1] === 100) {         // [1] - size
                    this.downTo3(e, e.target.dataset.type);
                } else {
                    this.downTo4();
                }
                break;

            case 'box1st':                      // dragging box
            case 'box2nd':
            case 'box3rd':
            case 'box4th':
                this.downTo4();
                break;
        }
    }

    // down4() {}
    // down5() {}

    downTo2(e, draggingElement) {               // исправить
        const {contentId} = this.state;

        const top = [...this.state.top];
        const left = [...this.state.left];
        const bottom = [...this.state.bottom];
        const right = [...this.state.right];

        const box1st = [...this.state.box1st];
        const box2nd = [...this.state.box2nd];
        const box3rd = [...this.state.box3rd];
        const box4th = [...this.state.box4th];

        let newContentId = [];
        switch (this.state.currentState) {
            case 1:
                switch (draggingElement) {
                    case 'box1st':
                        newContentId = [contentId[3], contentId[1], contentId[2], contentId[0]];
                        box2nd[2] = false; box3rd[2] = false; box4th[2] = false;    // hidden boxes
                        bottom[2] = false; right[2] = false;                        // hidden splitters
                        break;
                    case 'box2nd':
                        newContentId = [contentId[2], contentId[1], contentId[0], contentId[3]];
                        box1st[2] = false; box3rd[2] = false; box4th[2] = false;    // hidden boxes
                        top[2] = false; right[2] = false;                           // hidden splitters
                        break;
                    case 'box3rd':
                        newContentId = [contentId[1], contentId[0], contentId[2], contentId[3]];
                        box2nd[2] = false; box1st[2] = false; box4th[2] = false;    // hidden boxes
                        bottom[2] = false; left[2] = false;                         // hidden splitters
                        break;
                    case 'box4th':
                        newContentId = [contentId[0], contentId[1], contentId[2], contentId[3]];
                        box2nd[2] = false; box3rd[2] = false; box1st[2] = false;    // hidden boxes
                        top[2] = false; left[2] = false;                            // hidden splitters
                        break;
                }
                break;
            case 2:
                newContentId = this.state.contentId;
                break;
        }

        this.setState({
            ...this.state,
            currentState: 2,
            draggingElement,
            isDragging: true,
            contentId: newContentId,

            top,
            left,
            bottom,
            right,

            box1st,
            box2nd,
            box3rd,
            box4th,

            parentHeight: e.target.parentElement.clientHeight,
            parentWidth: e.target.parentElement.clientWidth,
            offsetX: e.clientX - this.state[draggingElement][0] * e.target.parentElement.clientWidth / 100,  // [0]-X
            offsetY: e.clientY - this.state[draggingElement][1] * e.target.parentElement.clientHeight / 100, // [1]-Y
        });
    }
    downTo3(e, type) {                                  // draggingElement = type
        const {contentId} = this.state;

        const top = [...this.state.top];
        const left = [...this.state.left];
        const bottom = [...this.state.bottom];
        const right = [...this.state.right];

        const box1st = [...this.state.box1st];
        const box2nd = [...this.state.box2nd];
        const box3rd = [...this.state.box3rd];
        const box4th = [...this.state.box4th];

        box1st[2] = false; box2nd[2] = false; box3rd[2] = false; box4th[2] = false; // hidden boxes

        let offset = [];
        let newContentId = [];                          // for cells' content
        switch (this.state.currentState) {
            case 1:
                newContentId = (type === 'top' || type === 'left')
                    ? [contentId[2], contentId[1], contentId[0], contentId[3]]
                    : [contentId[0], contentId[1], contentId[2], contentId[3]];
                break;
            case 3:
                newContentId = this.state.contentId;
                break;
        }

        switch (type) {
            case 'top':
                left[2] = false; bottom[2] = false; right[2] = false;   // hidden splitters
                offset = [0, e.clientY - this.state[type][0] * e.target.parentElement.clientHeight / 100]; // Y
                break;
            case 'bottom':
                left[2] = false; top[2] = false; right[2] = false;      // hidden splitters
                offset = [0, e.clientY - this.state[type][0] * e.target.parentElement.clientHeight / 100]; // Y
                break;
            case 'left':
                top[2] = false; bottom[2] = false; right[2] = false;    // hidden splitters
                offset = [e.clientX - this.state[type][0] * e.target.parentElement.clientWidth / 100, 0];  // X
                break;
            case 'right':
                left[2] = false; bottom[2] = false; top[2] = false;     // hidden splitters
                offset = [e.clientX - this.state[type][0] * e.target.parentElement.clientWidth / 100, 0];  // X
                break;
        }

        this.setState({
            ...this.state,
            currentState: 3,
            draggingElement: type,
            isDragging: true,
            contentId: newContentId,

            top,
            left,
            bottom,
            right,

            box1st,
            box2nd,
            box3rd,
            box4th,

            parentHeight: e.target.parentElement.clientHeight,
            parentWidth: e.target.parentElement.clientWidth,
            offsetX: offset[0],
            offsetY: offset[1],
        });
    }
    downTo4() {}
    downTo5() {}

    move2(e) {
        const coordinates = [
            (e.clientX - this.state.offsetX) / this.state.parentWidth * 100,
            (e.clientY - this.state.offsetY) / this.state.parentHeight * 100
        ];

        // check border

        const box = [...this.state[this.state.draggingElement]];
        box[0] = coordinates[0];     // [0]-X
        box[1] = coordinates[1];     // [1]-Y

        const horizontal = [...this.state[box[3]]];
        const vertical = [...this.state[box[4]]];

        horizontal[0] = box[1];
        vertical[0] = box[0];

        this.setState({
            ...this.state,
            [this.state.draggingElement]: box,              // dragging box
            [box[3]]: horizontal,                           // horizontal
            [box[4]]: vertical,                             // vertical
        });
    }
    move3(e) {
        const coordinates = (this.state.draggingElement === 'top' || this.state.draggingElement === 'bottom')
            ? (e.clientY - this.state.offsetY) / this.state.parentHeight * 100
            : (e.clientX - this.state.offsetX) / this.state.parentWidth * 100;

        // check border

        const draggingElement = [...this.state[this.state.draggingElement]];
        draggingElement[0] = coordinates;

        this.setState({
            ...this.state,
            [this.state.draggingElement]: draggingElement,
        });
    }

    up2(e) {
        const {contentId} = this.state;
        // border
        const top = (e.clientY < this.state.minSizeOfCell);
        const bottom = (e.clientY > this.state.parentHeight - this.state.minSizeOfCell);
        const left = (e.clientX < this.state.minSizeOfCell);
        const right = (e.clientX > this.state.parentWidth - this.state.minSizeOfCell);

        // only 3 states
        if (top) {
            if (left) {
                return this.upTo1([contentId[3], contentId[1], contentId[2], contentId[0]]);
            }
            if (right) {
                return this.upTo1([contentId[1], contentId[0], contentId[2], contentId[3]]);
            }
            return this.upTo3(this.state[this.state.draggingElement][4],
                [contentId[1], contentId[0], contentId[3], contentId[2]]);
        }
        if (bottom) {
            if (left) {
                return this.upTo1([contentId[2], contentId[1], contentId[0], contentId[3]]);
            }
            if (right) {
                return this.upTo1([contentId[0], contentId[1], contentId[2], contentId[3]]);
            }
            return this.upTo3(this.state[this.state.draggingElement][4],
                [contentId[0], contentId[1], contentId[2], contentId[3]]);
        }
        if (left) {
            return this.upTo3(this.state[this.state.draggingElement][3],
                [contentId[2], contentId[1], contentId[3], contentId[0]]);
        }
        if (right) {
            return this.upTo3(this.state[this.state.draggingElement][3],
                [contentId[0], contentId[2], contentId[1], contentId[3]]);
        }
        return this.upTo2(this.state.contentId);
    }
    up3(e) {
        const {contentId} = this.state;
        // border
        const top = (e.clientY < this.state.minSizeOfCell);
        const bottom = (e.clientY > this.state.parentHeight - this.state.minSizeOfCell);
        const left = (e.clientX < this.state.minSizeOfCell);
        const right = (e.clientX > this.state.parentWidth - this.state.minSizeOfCell);

        if (this.state.draggingElement === 'top' || this.state.draggingElement === 'bottom') {
            if (top) {
                return this.upTo1([contentId[2], contentId[1], contentId[0], contentId[3]]);
            }
            if (bottom) {
                return this.upTo1([contentId[0], contentId[1], contentId[2], contentId[3]]);
            }
        } else {
            if (left) {
                return this.upTo1([contentId[2], contentId[1], contentId[0], contentId[3]]);
            }
            if (right) {
                return this.upTo1([contentId[0], contentId[1], contentId[2], contentId[3]]);
            }
        }

        return this.upTo3(this.state.draggingElement, this.state.contentId);
    }

    upTo1(contentId) {

        this.setState({                     // default state (exception: contentId)
            ...this.state,
            currentState: 1,

            draggingElement: '',
            isDragging: false,
            contentId,

            box1st: [0, 0, true, 'top', 'left'],
            box2nd: [0, 100, true, 'bottom', 'left'],
            box3rd: [100, 0, true, 'top', 'right'],
            box4th: [100, 100, true, 'bottom', 'right'],

            top: [0, 100, true],
            bottom: [100, 100, true],
            left: [0, 100, true],
            right: [100, 100, true],
        });

        const {changeLayout} = this.props;
        changeLayout({
            state: 1,
            direction: 'row',
            tape: 100,
            cellOf1stTape: 100,
            cellOf2ndTape: 0,
            contentId,
        });
    }
    upTo2(contentId) {
        const box = [...this.state[this.state.draggingElement]];
        this.setState({
            ...this.state,
            currentState: 2,

            draggingElement: '',
            isDragging: false,
            contentId,
        });

        const {changeLayout} = this.props;
        changeLayout({
            stateId: 2,
            direction: 'row',
            tape: box[0],
            cellOf1stTape: box[1],
            cellOf2ndTape: box[1],
            contentId,
        });
    }
    upTo3(draggingElement, contentId) {
        const top = [...this.state.top];
        const left = [...this.state.left];
        const bottom = [...this.state.bottom];
        const right = [...this.state.right];

        const box1st = [...this.state.box1st];
        const box2nd = [...this.state.box2nd];
        const box3rd = [...this.state.box3rd];
        const box4th = [...this.state.box4th];

        let direction;
        switch (draggingElement) {
            case 'top':
                bottom[2] = false; left[2] = true; right[2] = true;
                box2nd[2] = false; box4th[2] = false; box1st[2] = true; box3rd[2] = true;

                bottom[0] = 100; left[0] = 0; right[0] = 100;
                box1st[1] = top[0]; box1st[0] = 0;
                box3rd[1] = top[0]; box3rd[0] = 100;

                direction = 'column';
                break;
            case 'bottom':
                top[2] = false; left[2] = true; right[2] = true;
                box1st[2] = false; box3rd[2] = false; box2nd[2] = true; box4th[2] = true;

                top[0] = 0; left[0] = 0; right[0] = 100;
                box2nd[1] = bottom[0]; box2nd[0] = 0;
                box4th[1] = bottom[0]; box4th[0] = 100;

                direction = 'column';
                break;
            case 'left':
                right[2] = false; top[2] = true; bottom[2] = true;
                box3rd[2] = false; box4th[2] = false; box1st[2] = true; box2nd[2] = true;

                top[0] = 0; bottom[0] = 100; right[0] = 100;
                box1st[1] = 0; box1st[0] = left[0];
                box2nd[1] = 100; box2nd[0] = left[0];

                direction = 'row';
                break;
            case 'right':
                left[2] = false; top[2] = true; bottom[2] = true;
                box1st[2] = false; box2nd[2] = false; box3rd[2] = true; box4th[2] = true;

                top[0] = 0; bottom[0] = 100; left[0] = 0;
                box3rd[1] = 0; box3rd[0] = right[0];
                box4th[1] = 100; box4th[0] = right[0];

                direction = 'row';
                break;
        }

        const size = this.state[draggingElement][0];
        this.setState({
            ...this.state,
            currentState: 3,

            draggingElement: '',
            isDragging: false,
            contentId,

            top,
            left,
            bottom,
            right,

            box1st,
            box2nd,
            box3rd,
            box4th,
        });

        const {changeLayout} = this.props;
        changeLayout({
            stateId: 3,
            direction,
            tape: size,
            cellOf1stTape: 100,
            cellOf2ndTape: 100,
            contentId,
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
                // case 4:
                //     this.down4(e);
                //     break;
                // case 5:
                //     this.down5(e);
                //     break;
            }
        }
    }
    mouseMoveLine(e) {
        if (this.state.isDragging) {
            unFocus(document, window);
            switch (this.state.currentState) {
                case 2:
                    this.move2(e);
                    break;
                case 3:
                    this.move3(e);
                    break;
                // case 4:
                //     this.move4(e);
                //     break;
                // case 5:
                //     this.move5(e);
                //     break;
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
                // case 4:
                //     this.up4(e);
                //     break;
                // case 5:
                //     this.up5(e);
                //     break;
            }
        }
    }

    navigate(id, {type, contentId}) {
        const {navigateTo} = this.props;

        const {cell} = this.props.layout;
        const cellId = cell[id].contentId;

        navigateTo({type, cellId, contentId});
    }

    render() {
        const {
            top,
            bottom,
            left,
            right,

            box1st,
            box2nd,
            box3rd,
            box4th,
        } = this.state;

        const {
            tape,
            cell,
            content
        } = this.props.layout;

        const {direction} = this.props.layout.root;
        const cellDirection = (direction === 'row') ? 'column' : 'row';

        return (
            <LayoutComponent direction={direction} mousedown={this.mouseDownLine}>

                <Splitter type={'top'} splitter={top}/>
                <Splitter type={'bottom'} splitter={bottom}/>
                <Splitter type={'left'} splitter={left}/>
                <Splitter type={'right'} splitter={right}/>

                <Box type={'box1st'} box={box1st}/>
                <Box type={'box2nd'} box={box2nd}/>
                <Box type={'box3rd'} box={box3rd}/>
                <Box type={'box4th'} box={box4th}/>

                <Tape type={'tape'} direction={cellDirection} size={tape[0]}>
                    <Tape type={'cell'} size={cell[0].flexBasis}>
                        <Navigator navigateTo={this.navigateTo1stCell} nodeId={content[cell[0].contentId].id}/>
                    </Tape>
                    <Tape type={'cell'} size={cell[1].flexBasis}>
                        <Navigator navigateTo={this.navigateTo2ndCell} nodeId={content[cell[1].contentId].id}/>
                    </Tape>
                </Tape>

                <Tape type={'tape'} direction={cellDirection} size={tape[1]}>
                    <Tape type={'cell'} size={cell[2].flexBasis}>
                        <Navigator navigateTo={this.navigateTo3rdCell} nodeId={content[cell[2].contentId].id}/>
                    </Tape>
                    <Tape type={'cell'} size={cell[3].flexBasis}>
                        <Navigator navigateTo={this.navigateTo4thCell} nodeId={content[cell[3].contentId].id}/>
                    </Tape>
                </Tape>

            </LayoutComponent>
        );
    }
}

Layout.propTypes = {
    layout: PropTypes.object,                   // need full version
    changeLayout: PropTypes.func,
    navigateTo: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        layout: state.layout
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeLayout: (props) => dispatch(changeLayout(props)),
        navigateTo: (props) => dispatch(navigateTo(props)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
