import React from 'react';

import Layout from '../../containers/Layout/Layout';
import TextInput from '../TextInput/TextInput';
import Toolbar from '../Toolbar/Toolbar';

export default function App() {
    return [
        <Layout key="layout" />,
        <Toolbar key="toolbar" />,
        <TextInput
            className="App__textinput"
            defaultText="Тема совещания"
            maxInputLength={33}
            key="textinput" />
    ];
}
