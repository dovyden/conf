import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeTabVersion} from '../actions/DynamicReport';
import TaskList from './TaskList';

class VersionList extends Component {
    render() {
        return (
            <div className="dr-versionList">
                {this.props.versions.map(version => (
                    <div
                        key={version.id}
                    >
                        <div
                            className={this.props.activeTab.documents[this.props.document].versions[version.id] ? 'dr-tab dr-tab-active' : 'dr-tab dr-tab-notActive'}
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
                        version.tasks && <TaskList version={version}/>}
                    </div>
                ))}
            </div>
        );
    }
}

VersionList.propTypes = {
    activeTab: PropTypes.object.isRequired,
    document: PropTypes.number.isRequired,
    versions: PropTypes.array.isRequired,
    onChangeTab: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        activeTab: state.activeTab,
        document: ownProps.document.id,
        versions: ownProps.document.versions
    };
};

const mapDispatchToProps = (dispatch) => ({
    onChangeTab: id => {
        dispatch(changeTabVersion(id));
    }
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VersionList);
