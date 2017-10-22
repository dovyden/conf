/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeTabVersion} from '../actions/DynamicReport';
import ShowTaskList from './ShowTaskList';

class VersionList extends Component {
    render() {
        return (
            <div className="dr-versionList">
                {this.props.versions.map(version => (
                    <div>
                        <div
                            className={this.props.activeTab.documents[this.props.document].versions[version.id] ? 'dr-tab dr-tab-active' : 'dr-tab dr-tab-notActive'}
                            key={version.id}
                            onClick={() => this.props.onChangeTab({
                                idDocument: this.props.document,
                                idVersion: version.id
                            })}
                        >
                            <div className="dr-tab-icon">
                                {this.props.activeTab.documents[this.props.document].versions[version.id] ? '-' : '+'}
                            </div>
                            <div className="dr-tab-name">
                                {version.text}
                            </div>
                        </div>
                        {this.props.activeTab.documents[this.props.document].versions[version.id] &&
                        version.tasks && <ShowTaskList version={version}/>}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        document: ownProps.document.id,
        versions: ownProps.document.versions,
        activeTab: state.activeTab
    };
};

const mapDispatchToProps = (dispatch) => ({
    onChangeTab: id => {
        dispatch(changeTabVersion(id));
    }
});

const ShowVersionList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(VersionList);

export default ShowVersionList;
