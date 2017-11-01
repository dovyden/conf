import React from 'react';
import logo from './images/logo.svg';
import './App.css';
import Document from '../../containers/Document/Document';

const idDocument = 1;
const idVersionDocument = 1;
const idActiveTask = 1;

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/components/App/App.js</code> and save to reload.
            </p>
            <Document
                idDocument = {idDocument}
                idVersionDocument = {idVersionDocument}
                idActiveTask = {idActiveTask}/>
        </div>
    );
}
