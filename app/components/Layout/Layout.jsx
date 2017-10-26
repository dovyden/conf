import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navigator from '../../containers/Navigator/Navigator';

export default class Layout extends Component {
    render() {
        return (
            <Navigator navigateTo={this.props.navigate}/>
        );
    }
}

Layout.propTypes = {
    navigate: PropTypes.func
};
