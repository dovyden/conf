import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchNodes} from '../../actions/navigator';
import NodesList from '../../components/Navigator/NodesList';
import Toolbar from '../../components/Navigator/Toolbar';

class Navigator extends Component {
    render() {
        const {nodes, nodeId} = this.props;
        const children = this.getChildren(nodeId, nodes);
        const path = this.getPath(nodeId, nodes);
        return (
            <div>
                <Toolbar path={path} navigateTo={this.props.navigateTo}/>
                <NodesList nodes={children} navigateTo={this.props.navigateTo}/>
            </div>
        );
    }

    componentWillReceiveProps(newProps) {
        if (newProps.nodeId === null) {
            this.props.fetchNodes({
                query: `$$TYPE$$ = 'NODE' AND $$hier/parent$$ = ''`
            });
        }
        if (this.props.nodes[newProps.nodeId] === undefined) {
            this.props.fetchNodes({
                nodes: [this.props.nodeId]
            });
        }
    }

    getPath(nodeId, nodes) {
        const path = [];
        let parentId = nodeId;
        while (parentId !== 0) {
            path.unshift({nodeId: parentId, name: nodes[parentId]['name1']});
            parentId = nodes[parentId]['hier/parent'];
        }
        return path;
    }

    getChildren(nodeId, nodes) {
        const children = {};
        this.props.fetchNodes({
            query: `$$TYPE$$ = 'NODE' AND $$hier/parent$$ = '${nodeId}'`
        });
        for (const node in nodes) {
            if (nodes[node]['hier/parent'] === nodeId) {
                Object.assign(children, nodes[node]);
            }
        }
        return children;
    }
}

Navigator.propTypes = {
    nodeId: PropTypes.string.isRequired,
    navigateTo: PropTypes.func.isRequired,
    scroll: PropTypes.number,
    nodes: PropTypes.object.isRequired,
    root: PropTypes.object.isRequired,
    fetchNodes: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        nodeId: ownProps.nodeId,
        navigateTo: ownProps.nodeId,
        scroll: ownProps.scroll,
        nodes: state.navigator.nodes,
        root: state.navigator.root
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNodes: (params) => dispatch(fetchNodes(params)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
