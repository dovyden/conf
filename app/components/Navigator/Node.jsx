import React, {Component} from 'react';
import PropTypes from 'prop-types';
import b_ from 'b_';

import './Node.css';

const b = b_.lock('node');

class Node extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
    }

    render() {
        const {node} = this.props;
        return (
            <tr
                className={b()}
                onClick={this.navigateTo}
            >
                <td key="name" className={b('text', {'node-attrs': true})}>
                    {node.name1}
                </td>
                <td key="owner" className={b('text', {'node-attrs': true})}>
                    {node['sec/owner']};
                </td>
            </tr>
        );
    }

    navigateTo() {
        this.props.navigateTo({
            type: 'node',
            newNodeId: this.props.nodeId
        });
    }
}

Node.propTypes = {
    node: PropTypes.object.isRequired,
    nodeId: PropTypes.string.isRequired,
    navigateTo: PropTypes.func.isRequired
};

export default Node;
