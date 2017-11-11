import React from 'react';
import Button from '../Button/Button';
import logo from './images/logo.svg';
import './App.css';

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
            <Button
                className="App__button"
                onClick={() => 'OK'}>
                Hello!
            </Button>
        </div>
    );
}
