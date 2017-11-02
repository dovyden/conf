import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TaskList from './TaskList';

class VersionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTab: {}
        };
    }

    render() {
        return (
            <div className="dr-version-list">
                {this.props.versions.map(version => (
                    <div
                        key={version.id}
                        className="dr-version-list__item"
                    >
                        <div
                            className={this.state.openTab[version.id]
                                ? 'dr-tab dr-tab_version-active'
                                : 'dr-tab dr-tab_version-not-active'}
                            onClick={() => {
                                const newState = this.state;
                                newState.openTab[version.id]
                                    ? delete newState.openTab[version.id]
                                    : newState.openTab[version.id] = true;
                                this.setState(newState);
                            }}
                        >
                            <div className="dr-tab__state">
                                {this.state.openTab[version.id] ? '-' : '+'}
                            </div>
                            <div className="dr-tab__name">
                                {version.name}
                            </div>
                            <div className="dr-tab__created">
                                {version.created}
                            </div>
                        </div>
                        {this.state.openTab[version.id] && version.tasks && <TaskList tasks={version.tasks}/>}
                    </div>
                ))}
            </div>
        );
    }
}

VersionList.propTypes = {
    versions: PropTypes.array.isRequired
};

export default VersionList;
