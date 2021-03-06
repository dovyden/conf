import React from 'react';
import Layout from '../../containers/Layout/Layout';
import Toolbar from '../Toolbar/Toolbar';

export default function App() {
    return [
        <Layout key="layout" />,
        <Toolbar key="toolbar" />
    ];
}
