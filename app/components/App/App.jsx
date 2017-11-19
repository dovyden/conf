import React from 'react';
import Layout from '../../containers/Layout/Layout';
import PseudoLink from '../PseudoLink/PseudoLink';
import Toolbar from '../Toolbar/Toolbar';

export default function App() {
    return [
        <Layout key="layout" />,
        <Toolbar key="toolbar" />,
        <PseudoLink
            className="App__pseudolink"
            key="pseudolink"
            onClick={() => 'OK'}>
            Эта псевдоссылка никуда не ведет
        </PseudoLink>
    ];
}
