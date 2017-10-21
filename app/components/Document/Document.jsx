import React, {Component} from 'react';
import * as OpenSeaDragon from 'openseadragon';
import {Path, Point, paper, PointText} from 'paper';

let path;

let textItem;

export default class DocumentView extends Component {
    onMouseDown(event) {
        event.preventDefault();
        if (path) {
            path.selected = false;
        }
        // Create a new path and set its stroke color to black:
        path = new Path({
            segments: [event.point],
            strokeColor: 'yellow',
            // Select the path, so we can see its segment points:
            fullySelected: true
        });
    }

    onMouseDrag(event) {
        console.log(event.persist());
        path.add(event.point);
        // Update the content of the text item to show how many
        // segments it has:
        textItem.content = `Segment count: ${path.segments.length}`;
    }

    onMouseUp(event) {
        event.preventDefault();

        const segmentCount = path.segments.length;

        // When the mouse is released, simplify it:
        path.simplify(10);

        // Select the path, so we can see its segments:
        path.fullySelected = true;

        const newSegmentCount = path.segments.length;
        const difference = segmentCount - newSegmentCount;
        const percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
        textItem.content = `${difference} of the ${segmentCount} segments were removed. Saving ${percentage}%`;
    }

    componentDidMount() {
        paper.setup('myCanvas');

        path = new Path();

        textItem = new PointText({
            content: 'Click and drag to draw a line.',
            point: new Point(20, 30),
            fillColor: 'red',
        });

        // OpenSeaDragon({
        //     id: 'noob_way',
        //     prefixUrl: '../../../node_modules/openseadragon/build/openseadragon/images/',
        //     tileSources: 'https://test.knevod.com/static/tile/_test/4H/4H@test.knevod.com/330/0/tiles.dzi'
        // });
    }

    render() {
        return (
            <div className="document" id="noob_way">
                <canvas className="document"
                    id="myCanvas"
                    onMouseDown={(event) => this.onMouseDown(event)}
                    onMouseMove={(event) => this.onMouseDrag(event)}
                    onMouseUp={(event) => this.onMouseUp(event)}/>
            </div>
        );
    }
}
