import React, {Component} from 'react';
import * as OpenSeadragon from 'openseadragon';
import {Path, paper, Point} from 'paper';
import './css/document.css';
import PropTypes from 'prop-types';
import {zoomPerScroll, noZoom} from './../../constants/document';

export default class DocumentView extends Component {
    componentDidMount() {
        const idMarks = `paperCanvas${this.props.idDocument.toString()}`;
        this.paper = paper.setup(idMarks);

        const targetElement = document.getElementById(idMarks);
        this.left = targetElement.getBoundingClientRect().left;
        this.top = targetElement.getBoundingClientRect().top;

        this.marks = new Array({});
        this.countOfMarks = 0;

        this.flagMouseDownForPaper = false;

        const idDocument = this.props.idDocument.toString();
        // TODO: slow raise events to faster redraw marks
        this.viewer = new OpenSeadragon.Viewer({
            id: idDocument,
            showNavigationControl: false,
            gestureSettingsMouse: {clickToZoom: false},
            zoomPerScroll,
            visibilityRatio: 0,
            constrainDuringPan: true,
            tileSources: 'https://test.knevod.com/static/tile/_test/4H/4H@test.knevod.com/330/0/tiles.dzi'
        });
        this.connectOSDWithPaper();
    }

    onOpen() {
        const oldBounds = this.viewer.viewport.getBounds(true);
        const newBounds = new OpenSeadragon.Rect(0, 0, 1, oldBounds.height / oldBounds.width);
        this.viewer.viewport.fitBounds(newBounds, true);
        this.viewer.viewport.zoomTo(2, true);
        this.currentZoom = 2;
        // console.log(this.viewer.source);
        // TODO: method who redraw marks with newBounds and zoom
    }

    connectOSDWithPaper() {
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onZoom = this.onZoom.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseDrag = this.onMouseDrag.bind(this);

        this.viewer.addHandler('open', this.onOpen);
        this.viewer.addHandler('canvas-exit', this.onMouseUp);
        this.viewer.addHandler('canvas-release', this.onMouseUp);
        this.viewer.addHandler('zoom', this.onZoom);
        this.viewer.addHandler('canvas-press', this.onMouseDown);
        this.viewer.addHandler('canvas-drag', this.onMouseDrag);
    }

    onMouseDown(event) {
        if (!event.originalEvent.ctrlKey) {
            return;
        }

        this.flagMouseDownForPaper = true;
        this.viewer.panVertical = false;
        this.viewer.panHorizontal = false;
        this.viewer.zoomPerScroll = noZoom;
        const x = event.position.x;
        const y = event.position.y;
        this.marks[this.countOfMarks] = {
            path: new Path({
                segments: [new Point(x, y)],
                strokeColor: '#ff0000',
                strokeWidth: 5,
            }),
            bound: null,
            zoom: null
        };
    }

    onMouseDrag(event) {
        if (this.flagMouseDownForPaper) {
            if (!event.originalEvent.ctrlKey) {
                this.onMouseUp();
            }
            const x = event.position.x;
            const y = event.position.y;
            this.marks[this.countOfMarks].path.add(new Point(x, y));
        } else if (this.countOfMarks) {
            /**
             * TODO: bug with zoom
             */
            const delta = event.delta;
            this.marks.forEach((item) => {
                item.path.translate(new Point(delta.x, delta.y));
            });
        }
    }

    onMouseUp() {
        if (this.flagMouseDownForPaper) {
            this.marks[this.countOfMarks].bound = this.viewer.viewport.getBounds(true);
            this.marks[this.countOfMarks].zoom = this.viewer.viewport.getZoom(true);
            this.countOfMarks++;
        }
        this.flagMouseDownForPaper = false;

        event.preventDefaultAction = false;
        this.viewer.panVertical = true;
        this.viewer.panHorizontal = true;
        this.viewer.zoomPerScroll = zoomPerScroll; // allow zoom
    }

    onZoom(event) {
        if (!this.countOfMarks || this.flagMouseDownForPaper) {
            return;
        }
        /**
         * TODO: bug with zoom
         */
        const currentZoom = event.zoom;
        const newZoom = currentZoom / this.currentZoom;
        const newCenter = this.viewer.viewport.viewportToViewerElementCoordinates(event.refPoint, true);

        this.marks.forEach((item) => {
            item.path.scale(newZoom, newCenter);
        });

        this.currentZoom = currentZoom;

    }

    render() {
        return (
            <div className="document_size_s document_theme_aqua">
                <div className="document__drawing_size_m" id = {this.props.idDocument.toString()}/>
                <div className="document__marks_size_m
                                document__marks_theme_transparent
                                document__marks_pointer-events_disabled">
                    <canvas className="document__marks_size_m"
                        id = {`paperCanvas${this.props.idDocument.toString()}`}/>
                </div>
            </div>
        );
    }
}

DocumentView.propTypes = {
    idDocument: PropTypes.number.isRequired
};
