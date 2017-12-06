import React, {Component} from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './DocumentDownloader.css';
import LinksDocumentDownloader from './ContentDocumentDownloader.jsx';

const b = b_.lock('document-downloader');

export default class DocumentDownloader extends Component {
    constructor(props) {
        super(props);
        this.state = {status: false};
        this.show = this.show.bind(this);
        this.stop = this.stop.bind(this);
    }

    show() {
        this.setState({status: !this.state.status});
    }

    stop(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="document-downloader" onClick={this.stop}>
                <span className={b(`knob`, {active: this.state.status})}
                    onClick={this.show}>{this.props.linkName}</span>
                <div className={b(`big-box`, {shown: this.state.status})}>
                    <div className="document-downloader__triangle"/>
                    <LinksDocumentDownloader content={this.props.content}/>
                </div>
            </div>
        );
    }
}

DocumentDownloader.propTypes = {
    linkName: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired
};
