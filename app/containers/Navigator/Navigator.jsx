import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import fetch from '../../utils/fetch';
import NodesList from '../../components/Navigator/NodesList';
import Toolbar from '../../components/Navigator/Toolbar';

class Navigator extends Component {
    render() {
        const {nodes, nodeId} = this.props;
        if (nodes[nodeId] === undefined) {
            nodes[nodeId] = this.getNodesFromServer(nodeId);
        }
        const children = this.getChildren(nodeId, nodes);
        const path = this.getPath(nodeId, nodes);
        return (
            <div>
                <Toolbar path={path}/>
                <NodesList nodes={children}/>
            </div>
        );
    }

    getNodesFromServer(nodeId) {
        return {nodeId};
    }

    getPath(nodeId, nodes) {
        const path = [];
        let parentId = nodeId;
        while (parentId !== 0) {
            path.unshift({parentId, name: nodes[parentId].name1});
            parentId = nodes[parentId]['hier/parent'];
        }
        return path;
    }

    getChildren(nodeId, nodes) {
        const children = {};
        const childrenMas = JSON.parse(nodes[nodeId]['hier/children']);
        childrenMas.forEach((child) => {
            const newChild = {};
            if (nodes[child] === undefined) {
                nodes[child] = this.getNodesFromServer(child);
            }
            newChild[child] = nodes[child];
            Object.assign(children, newChild);
        });
        return children;
    }
}

Navigator.propTypes = {
    nodes: PropTypes.object.isRequired,
    nodeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        nodeId: ownProps.match.params.nodeId,
        nodes: state.nodes
    };
}

export default connect(mapStateToProps)(Navigator);
