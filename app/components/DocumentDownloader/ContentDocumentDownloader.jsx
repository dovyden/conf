import React from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';

import './DocumentDownloader.css';

export default function ContentDocumentDownloader(props) {

    return (
        <div className="document-downloader__box-with-links">
            <div className="document-downloader__empty-link"/>
            {
                props.content.map((textObject) => {
                    return (
                        <div className="document-downloader__file-link" key={v4()}>
                            <a href={textObject.h}
                                className="document-downloader__link-to-download">{textObject.text}</a>
                        </div>
                    );
                })
            }
            <div className="document-downloader__empty-link"/>
        </div>
    );
}

ContentDocumentDownloader.propTypes = {
    content: PropTypes.array.isRequired
};
