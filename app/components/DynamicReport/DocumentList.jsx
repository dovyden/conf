import PropTypes from 'prop-types';
import React, {Component} from 'react';
import VersionList from './VersionList';

class DocumentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTab: {}
        };
    }

    render() {
        return (
            <div className="dr-document-list">
                {this.props.documents.map(document => (
                    <div
                        key={document.id}
                        className="dr-document-list__item"
                    >
                        <div
                            className={this.state.openTab[document.id]
                                ? 'dr-tab dr-tab_document-active'
                                : 'dr-tab dr-tab_document-not-active'}
                            onClick={() => {
                                const newState = this.state;
                                newState.openTab[document.id]
                                    ? delete newState.openTab[document.id]
                                    : newState.openTab[document.id] = true;
                                this.setState(newState);
                            }}
                        >
                            <div className="dr-tab__state">
                                {this.state.openTab[document.id] ? '-' : '+'}
                            </div>
                            <div className="dr-tab__name">
                                {document.name}
                            </div>
                        </div>
                        {this.state.openTab[document.id] &&
                        document.versions &&
                        <VersionList versions={document.versions}/>}
                    </div>
                ))}
            </div>
        );
    }
}

DocumentList.propTypes = {
    documents: PropTypes.array.isRequired
};

export default DocumentList;
