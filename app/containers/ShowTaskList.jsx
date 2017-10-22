/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class TaskList extends Component {
    render() {
        return (
            <div className="dr-versionList">
                {this.props.tasks.map(tasks => (
                    <div>
                        <div
                            key={tasks.id}
                        >
                            {tasks.text}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: ownProps.version.tasks
    };
};

const ShowTaskList = connect(
    mapStateToProps
)(TaskList);

export default ShowTaskList;
