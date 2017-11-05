import React, {Component} from 'react';
import * as OpenSeadragon from 'openseadragon';
import {Path, paper, Point} from 'paper';

export default class DocumentView extends Component {
    onMouseDown(event) {
        if (!event.ctrlKey) {
            this.flagMouseDownForPaper = false; // по логике не нужно - для читаемости
            return;
        }

        this.flagMouseDownForPaper = true;
        // constrainDuringPan
        this.viewer.panVertical = false;
        this.viewer.panHorizontal = false;
        this.viewer.gestureSettingsMouse.scrollToZoom = false;
        const x = event.pageX - this.left;
        const y = event.pageY - this.top;
        this.marks[this.countOfMarks] = {
            path: new Path({
                segments: [x, y],
                strokeColor: '#ff0000',
                strokeWidth: 5,
            }),
            bound: null,
            zoom: null
        };
    }

    onMouseDrag(event, delta) {
        if (this.flagMouseDownForPaper) {
            if (!event.ctrlKey) {
                this.onMouseUp();
            }
            const x = event.pageX - this.left;
            const y = event.pageY - this.top;
            this.marks[this.countOfMarks].path.add(x, y);
        } else if (this.countOfMarks) {
            /**
             * TODO: when there is no pan because of the fact that the drawing gets on the screen,
             * the marks should not move
             */
            // const newZoom = this.viewer.viewport.getZoom(true) /  this.marks[0].zoom;
            // console.log(newZoom);
            console.log(this.viewer.viewport.getZoom(true));
            this.marks.forEach((item) => {
                const deltaPath = new Point(delta.x, delta.y);
                item.path.translate(deltaPath);
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
        this.viewer.panVertical = true;
        this.viewer.panHorizontal = true;
        this.viewer.gestureSettingsMouse.scrollToZoom = true;
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
        this.viewer = new OpenSeadragon.Viewer({
            id: idDocument,
            showNavigationControl: false,
            gestureSettingsMouse: {clickToZoom: false},
            showNavigator: false,
            zoomPerScroll: 0.5,
            debugMode: false,
            visibilityRatio: 0.9,
            minZoomLevel: 1,
            constrainDuringPan: true,
            tileSources: 'https://test.knevod.com/static/tile/_test/4H/4H@test.knevod.com/330/0/tiles.dzi'
        });

        this.viewer.addHandler('open', () => {
            const oldBounds = this.viewer.viewport.getBounds(true);
            const newBounds = new OpenSeadragon.Rect(0, 0, 1, oldBounds.height / oldBounds.width);
            this.viewer.viewport.fitBounds(newBounds, true); // нужное место на рисунке
            this.viewer.viewport.zoomTo(2); // нужный зум
        });

        this.viewer.addHandler('canvas-scroll', (event) => {

            // if (this.marks[0].path === undefined || this.flagMouseDownForPaper) {
            //     return;
            // }
            //
            // this.marks.forEach((item) => {
            //     const newZoom = this.viewer.viewport.getZoom(true) / item.zoom;
            //     item.path.view.zoom = newZoom;
            //     // item.path.scale(newZoom, new Point(item.path.handleBounds.center.x, item.path.handleBounds.center.y));
            // });
        });

        this.viewer.addHandler('canvas-press', (event) => {
            // event.preventDefaultAction = true
            this.onMouseDown(event.originalEvent);
        });
        this.viewer.addHandler('canvas-drag', (event) => {
            this.onMouseDrag(event.originalEvent, event.delta);

        });
        this.viewer.addHandler('canvas-exit', (event) => {
            this.onMouseUp();
        });
        this.viewer.addHandler('canvas-release', (event) => {
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

