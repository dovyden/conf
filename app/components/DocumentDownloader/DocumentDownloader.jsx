import React from 'react';
import PropTypes from 'prop-types';
import './DocumentDownloader.css';
import LinksDocumentDownloader from './LinksDocumentDownloader.jsx';

export default function DocumentDownloader(props) {
    const inLinks = [
        {text: 'Версия 1'},
        {text: 'Версия 2'},
        {text: 'Версия 3'}
    ];

    function recount() {
        document.getElementById(`box${props.id}`).style.left
            = `${String(document.getElementById(`a${props.id}`).getBoundingClientRect().left
                - document.getElementById(`box${props.id}`).getBoundingClientRect().width / 2
                + document.getElementById(`a${props.id}`).getBoundingClientRect().width / 2)}px`;
    }

    function show(e) {
        e.preventDefault();
        const display = document.getElementById(`box${props.id}`).style.display;
        if (display === 'none') {
            document.getElementById(`box${props.id}`).style.display = 'block';
            document.getElementById(`a${props.id}`).style.color = 'red';
        } else {
            document.getElementById(`box${props.id}`).style.display = 'none';
            document.getElementById(`a${props.id}`).style.color = 'blue';
        }
        recount();
    }

    return (
        <div className="DocumentDownloader" style={{position: 'relative'}}>
            <a href="#" id={`a${props.id}`} type="submit" onClick={show} style={{color: 'blue'}}>{props.linkName}</a>
            <div id = {`box${props.id}`} className="box" style={{display: 'none'}}>
                <svg className="poligon" width="16px" height="8px" >
                    <polygon points="0,8 8,0 16,8" fill="black" />
                </svg>
                <div className="boxWithText">
                    <LinksDocumentDownloader text={inLinks}/>
                </div>
            </div>
        </div>
    );
}

DocumentDownloader.propTypes = {
    id: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired
};
