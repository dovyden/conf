import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class TaskList extends Component {
    render() {
        return (
            <div className="dr-versionList">
                {this.props.tasks.map(tasks => (
                    <div
                        key={tasks.id}
                    >
                        <div>
                            {tasks.text}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: ownProps.version.tasks
    };
};

export default connect(
    mapStateToProps
)(TaskList);
