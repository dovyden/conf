import React, {Component} from 'react';
import * as OpenSeadragon from 'openseadragon';
import {Path, paper, Point} from 'paper';

export default class DocumentView extends Component {
    onMouseDown(event) {
        if (!event.originalEvent.ctrlKey) {
            return;
        }

        this.flagMouseDownForPaper = true;
        this.viewer.panVertical = false;
        this.viewer.panHorizontal = false;
        this.viewer.zoomPerScroll = 1; // forbid zoom
        const x = event.position.x;
        const y = event.position.y;
        this.marks[this.countOfMarks] = {
            path: new Path({
                segments: [new Point(x, y)],
                strokeColor: '#ff0000',
                strokeWidth: 5,
            }),
            bound: null,
            zoom: null,
            currentZoom: null
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
             * TODO: when there is no pan because of the fact that the drawing gets on the screen,
             * the marks should not move
             */
            // TODO: do only one translate when drag is over(optimization)
            const delta = event.delta;
            const currentZoom = this.viewer.viewport.getZoom(true);
            this.marks.forEach((item) => {
                const newZoom = currentZoom / item.currentZoom;
                const deltaPath = new Point(delta.x / newZoom, delta.y / newZoom);
                item.path.translate(deltaPath);
            });
        }
    }

    onMouseUp() {
        if (this.flagMouseDownForPaper) {
            this.marks[this.countOfMarks].bound = this.viewer.viewport.getBounds(true);
            this.marks[this.countOfMarks].zoom = this.viewer.viewport.getZoom(true);
            this.marks[this.countOfMarks].currentZoom = this.viewer.viewport.getZoom(true);
            this.countOfMarks++;
        }
        this.flagMouseDownForPaper = false;

        event.preventDefaultAction = false;
        this.viewer.panVertical = true;
        this.viewer.panHorizontal = true;
        this.viewer.zoomPerScroll = 0.75; // allow zoom
    }

    componentDidMount() {
        const idMarks = `paperCanvas${this.props.idDocument.toString()}`;
        paper.setup(idMarks);

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
            showNavigator: false,
            zoomPerScroll: 0.75,
            debugMode: false,
            visibilityRatio: 0.9,
            // minZoomLevel: 1,
            // maxZoomLevel: 6,
            constrainDuringPan: true,
            tileSources: 'https://test.knevod.com/static/tile/_test/4H/4H@test.knevod.com/330/0/tiles.dzi'
        });

        this.viewer.addHandler('open', () => {
            const oldBounds = this.viewer.viewport.getBounds(true);
            const newBounds = new OpenSeadragon.Rect(0, 0, 1, oldBounds.height / oldBounds.width);
            this.viewer.viewport.fitBounds(newBounds, true);
            this.viewer.viewport.zoomTo(1, true);
            // TODO: method who redraw marks with newBounds and zoom
        });

        this.viewer.addHandler('zoom', (event) => {
            if (!this.countOfMarks || this.flagMouseDownForPaper) {
                return;
            }

            const currentZoom = event.zoom;
            if (currentZoom >= 6 || currentZoom <= 1) {
                return;
            }

            const newCenter = this.viewer.viewport.deltaPixelsFromPointsNoRotate(event.refPoint, true);
            const oldCenter = this.viewer.viewport.deltaPixelsFromPointsNoRotate(this.viewer.viewport.getCenter(true), true);
            const delta = new Point(oldCenter.x - newCenter.x, oldCenter.y - newCenter.y);
            this.marks.forEach((item) => {
                const newZoom = currentZoom / item.currentZoom;
                item.path.scale(newZoom);
                const sign = currentZoom > item.currentZoom ? 1 : -1;
                delta.x *= sign;
                delta.y *= sign;
                const interchangeableZoom = sign === 1 ? currentZoom : item.currentZoom;
                delta.x /= interchangeableZoom;
                delta.y /= interchangeableZoom;
                console.log(delta.x, delta.y);
                item.path.translate(delta);
                item.currentZoom = currentZoom;
            });
        });

        this.viewer.addHandler('canvas-press', (event) => {
            this.onMouseDown(event);
        });
        this.viewer.addHandler('canvas-drag', (event) => {
            this.onMouseDrag(event);

        });
        this.viewer.addHandler('canvas-exit', () => {
            this.onMouseUp();
        });
        this.viewer.addHandler('canvas-release', () => {
            this.onMouseUp();
        });
    }

    render() {
        return (
            <div className="document">
                <div className="openSeadragonDocument" id = {this.props.idDocument.toString()}/>
                <div className="marks">
                    <canvas className="marks"
                        id = {`paperCanvas${this.props.idDocument.toString()}`}/>
                </div>
            </div>
        );
    }
}

