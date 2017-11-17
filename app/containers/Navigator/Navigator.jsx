import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchNodes} from '../../actions/navigator';
import NodesList from '../../components/Navigator/NodesList';
import Spinner from '../../components/Spinner/Spinner';
import Toolbar from '../../components/Navigator/Toolbar';

class Navigator extends Component {
    constructor(props) {
        super(props);

        this.state = {loading: false};
        this.downloadNodes = this.downloadNodes.bind(this);
    }

    render() {
        if (this.state.loading > 0) {
            return (
                <div>
                    <Spinner position="center"/>
                </div>
            );
        }
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

    componentWillMount() {
        const {nodeId, nodes, root} = this.props;
        this.downloadNodes({nodeId, nodes, root}, this.state.loading);
    }

    shouldComponentUpdate(newProps, newState) {
        for (const nodeId in newProps.nodes) {
            if (this.props.nodes[nodeId] === undefined) {
                this.downloadNodes(newProps, newState.loading);
            }
        }
        return !newState.loading;
    }

    downloadNodes({nodeId, nodes, root}, loading) {
        if (!loading) {
            if (nodeId !== '') {
                if (nodes[nodeId] === undefined) {
                    this.props.fetchNodes({
                        query: `$$TYPE$$ = 'NODE' AND $$hier/parent$$ = '${nodeId}' OR $$sec/owner$$ = '${nodeId}'`
                    });
                    this.setState({loading: true});
                }
            } else {
                this.props.fetchNodes({
                    query: `$$TYPE$$ = 'NODE' AND $$hier/parent$$ = ''`
                });
                this.setState({loading: true});
            }
        } else {
            if (nodeId !== '' && root === undefined) {
                let parentId = nodeId;
                while (parentId !== 0) {
                    if (nodes[parentId] === undefined) {
                        this.props.fetchNodes({
                            nodes: [parentId]
                        });
                        this.setState({loading: true});
                        return;
                    }
                    parentId = nodes[parentId]['hier/parent'];
                }
            }
            this.setState({loading: false});
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

    getChildren(parId, nodes) {
        const children = {};
        let parentId = parId;
        if (parentId === '') {
            parentId = 0;
        }
        for (const nodeId in nodes) {
            const node = nodes[nodeId];
            if (node['hier/parent'] === parentId && node['removed'] !== 1) {
                const newNode = {};
                newNode[nodeId] = node;
                Object.assign(children, newNode);
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
    root: PropTypes.array,
    fetchNodes: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        nodeId: ownProps.nodeId,
        navigateTo: ownProps.navigateTo,
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
