/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeTabDocument} from '../actions/DynamicReport';
import ShowVersionList from './ShowVersionList';

class DocumentList extends Component {
    render() {
        return (
            <div>
                {this.props.documents.map(document => (
                    <div>
                        <div
                            className={this.props.activeTab.documents[document.id] ? 'dr-tab dr-tab-active' : 'dr-tab dr-tab-notActive'}
                            key={document.id}
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
                        document.versions && <ShowVersionList document={document}/>}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        documents: state.content.documents,
        activeTab: state.activeTab
    };
};

const mapDispatchToProps = (dispatch) => ({
    onChangeTab: id => {
        dispatch(changeTabDocument(id));
    }
});

const ShowDocumentList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DocumentList);

export default ShowDocumentList;
