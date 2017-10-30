import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeTabDocument} from '../actions/DynamicReport';
import VersionList from './VersionList';

class DocumentList extends Component {
    render() {
        return (
            <div className="dr-content">
                {this.props.documents.map(document => (
                    <div
                        key={document.id}
                    >
                        <div
                            className={this.props.activeTab.documents[document.id] ? 'dr-tab dr-tab-active' : 'dr-tab dr-tab-notActive'}
                            onClick={() => this.props.onChangeTab(document.id)}
                        >
                            <div className="dr-tab-icon">
                                {this.props.activeTab.documents[document.id] ? '-' : '+'}
                            </div>
                            <div className="dr-tab-name">
                                {document.text}
                            </div>
                        </div>
                        {this.props.activeTab.documents[document.id] &&
                        document.versions && <VersionList document={document}/>}
                    </div>
                ))}
            </div>
        );
    }
}

DocumentList.propTypes = {
    activeTab: PropTypes.object.isRequired,
    documents: PropTypes.array.isRequired,
    onChangeTab: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        activeTab: state.activeTab,
        documents: state.content.documents
    };
};

const mapDispatchToProps = (dispatch) => ({
    onChangeTab: id => {
        dispatch(changeTabDocument(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DocumentList);
