import React, {Component} from 'react';
import * as OpenSeaDragon from 'openseadragon';
import {Path, paper} from 'paper';

export default class DocumentView extends Component {
    onMouseDown(event) {
        if (!event.ctrlKey) {
            return;
        }

        this.flagMouseDown = true;

        const x = event.pageX - this.left;
        const y = event.pageY - this.top;

        this.path[this.countOfPath] = new Path({
            segments: [x, y],
            strokeColor: '#ff0000',
            strokeWidth: 5,

        });
    }

    onMouseDrag(event) {
        if (this.flagMouseDown) {
            if (!event.ctrlKey) {
                this.onMouseUp();
            }
            const x = event.pageX - this.left;
            const y = event.pageY - this.top;
            this.path[this.countOfPath].add(x, y);
        }
    }

    onMouseUp() {
        if (this.flagMouseDown) {
            this.countOfPath++;
        }
        this.flagMouseDown = false;
    }

    componentDidMount() {
        paper.setup('myCanvas');
        const targetElement = document.getElementById('myCanvas');
        this.left = targetElement.getBoundingClientRect().left;
        this.top = targetElement.getBoundingClientRect().top;
        this.countOfPath = 0;
        this.path = new Array();
        this.flagMouseDown = false;
        const viewer = new OpenSeaDragon.Viewer({
            id: 'noob_way', // дивчик
            showNavigationControl: false,
            gestureSettingsMouse: {clickToZoom: false},
            showNavigator: false,
            zoomPerScroll: 1.2,
            minZoomImageRatio: 1,
            tileSources: 'https://test.knevod.com/static/tile/_test/4H/4H@test.knevod.com/330/0/tiles.dzi'
        });
        viewer.addHandler('canvas-scroll', (event) =>
            console.log(viewer.viewport.getZoom(true))
        );
        viewer.addHandler("open", function(){
            const oldBounds = viewer.viewport.getBounds();
            const newBounds = new OpenSeaDragon.Rect(0, 0.2, 1, oldBounds.height / oldBounds.width);
            viewer.viewport.fitBounds(newBounds, true); // нужное место на рисунке
            viewer.viewport.zoomTo(4); // нужный зум
        });
    }

    render() {
        return (
            <div className="document" id="noob_way">
                <canvas className="document"
                    id="myCanvas"
                    onMouseDown={(event) => this.onMouseDown(event)}
                    onMouseMove={(event) => this.onMouseDrag(event)}
                    onMouseUp={() => this.onMouseUp()}/>
            </div>
        );
    }
}




