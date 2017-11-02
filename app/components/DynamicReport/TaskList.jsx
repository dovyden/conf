import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Task from './Task';

class TaskList extends Component {
    render() {
        return (
            <div className="dr-task-list">
                {this.props.tasks.map(task => (
                    <div
                        key={task.id}
                        className="dr-task-list__item"
                    >
                        <Task task={task}/>
                    </div>
                ))}
            </div>
        );
    }
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default TaskList;
