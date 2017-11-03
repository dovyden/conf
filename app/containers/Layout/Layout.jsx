import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import LayoutComponent from '../../components/Layout/Layout';
import {navigateAction} from '../../actions/layout';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
    }

    navigateTo(id) {
        const {navigate} = this.props;

        navigate(id);
    }

    render() {
        return <LayoutComponent navigate={this.navigateTo} nodeId={this.props.id} />;
    }
}

Layout.propTypes = {
    navigate: PropTypes.func,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

function mapStateToProps(state) {
    return {
        id: state.layout.id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        navigate: (id) => dispatch(navigateAction(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
