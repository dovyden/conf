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
        this.viewer.panVertical = false;
        this.viewer.panHorizontal = false;
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

    onMouseDrag(event) {
        if (this.flagMouseDownForPaper) {
            if (!event.ctrlKey) {
                this.onMouseUp();
            }
            const x = event.pageX - this.left;
            const y = event.pageY - this.top;
            this.marks[this.countOfMarks].path.add(x, y);
        }
    }

    onMouseUp() {
        if (this.flagMouseDownForPaper) {
            this.marks[this.countOfMarks].bound = this.viewer.viewport.getBounds(true);
            this.marks[this.countOfMarks].zoom = this.viewer.viewport.getZoom(true);
            console.log("Path:");
            console.log(this.marks[this.countOfMarks].path.bounds.topLeft);
            console.log(this.marks[this.countOfMarks].path.bounds.topRight);
            console.log(this.marks[this.countOfMarks].path.bounds.bottomRight);
            console.log(this.marks[this.countOfMarks].path.bounds.bottomLeft);
            console.log("OSD:");
            console.log(this.viewer.viewport.getBounds(true));
            this.countOfMarks++;
        }
        this.flagMouseDownForPaper = false;
        this.viewer.panVertical = true;
        this.viewer.panHorizontal = true;
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
            zoomPerScroll: 0.7,
            debugMode: false,
            visibilityRatio: 1.0,
            constrainDuringPan: true,
            tileSources: 'https://test.knevod.com/static/tile/_test/4H/4H@test.knevod.com/330/0/tiles.dzi'
        });

        this.viewer.addHandler('open', () => {
            const oldBounds = this.viewer.viewport.getBounds();
            const newBounds = new OpenSeadragon.Rect(0, 0, 1, oldBounds.height / oldBounds.width);
            this.viewer.viewport.fitBounds(newBounds, true); // нужное место на рисунке
            this.viewer.viewport.zoomTo(2); // нужный зум
        });

        // this.viewer.addHandler('animation', (event) => {
        //     console.log('animation');
        // });
        // this.viewer.addHandler('animation-start', (event) => {
        //     console.log('animation-start');
        // });
        // this.viewer.addHandler('animation-finish', (event) => {
        //     console.log('animation-finish');
        // });
        // this.viewer.addHandler('canvas-enter', (event) => {
        //     console.log('canvas-enter');
        // });
        // this.viewer.addHandler('canvas-drag-end', (event) => {
        //     this.onMouseUp();
        // });
        this.viewer.addHandler('canvas-scroll', (event) => {
            this.marks.forEach((item) => {
                console.log('old zoom:', item.zoom);
                const newZoom = item.zoom / this.viewer.viewport.getZoom(true);
                console.log('new zoom:', newZoom);
                console.log('osd zoom:', this.viewer.viewport.getZoom(true));
                console.log(item.path.scaling.x, item.path.scaling.y);
                // item.path.scale(newZoom);
                item.path.scaling.x *= newZoom;
                item.path.scaling.y *= newZoom;
                console.log(item.path);
            });
        });

        this.viewer.addHandler('canvas-press', (event) => {
            this.onMouseDown(event.originalEvent);
        });
        this.viewer.addHandler('canvas-drag', (event) => {
            this.onMouseDrag(event.originalEvent);
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

