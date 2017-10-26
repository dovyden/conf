import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import LayoutComponent from '../../components/Layout/Layout';
import {navigate} from '../../actions/layout';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.navigateTo = this.navigateTo.bind(this);
    }

    navigateTo(type, id) {
        const {navigate} = this.props;

        navigate(type, id);
    }

    render() {
        return <LayoutComponent navigate={this.navigateTo} />;
    }
}

Layout.propTypes = {
    navigate: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        navigate: (type, id) => dispatch(navigate(type, id))
    };
}

export default (connect(null, mapDispatchToProps)(Layout));
