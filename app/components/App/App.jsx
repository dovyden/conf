import React from 'react';
import Layout from '../../containers/Navigator/Navigator';
import Toolbar from '../Toolbar/Toolbar';

let nodeId = 'h@test.knevod.com';

export default function App() {
    return [
        <Toolbar key="toolbar"/>,
        <Layout
            key="layout"
            nodeId={nodeId}
            navigateTo={({type, newNodeId}) => { // eslint-disable-line
                nodeId = newNodeId;
            }}
        />
    ];
}
