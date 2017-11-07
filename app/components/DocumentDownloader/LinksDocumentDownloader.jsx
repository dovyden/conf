import React from 'react';
import PropTypes from 'prop-types';

import './DocumentDownloader.css';

export default function DocumentDownloader(props) {

    return (
        <div className="LinksDocumentDownloader">
            {
                props.text.forEach((textObject) => {
                    //  console.log(textObject.text);
                    return (
                        <div className="test" style={{color: 'blue'}}> {textObject.text} </div>
                    );
                })
            }
        </div>
    );
}

DocumentDownloader.propTypes = {
    text: PropTypes.string.isRequired
};
