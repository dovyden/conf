import React from 'react';
import ConferenceEditor from '../ConferenceEditor/ConferenceEditor';
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
            <p>
                <ConferenceEditor
                    participators={[
                        {
                            firstName: "Бурков",
                            moderator: false
                        }, {
                            firstName: "Довыденко",
                            moderator: true
                        }]}
                    type="editor" />
            </p>
        </div>
    );
}
