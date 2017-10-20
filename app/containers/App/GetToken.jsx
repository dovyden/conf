import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {loadFromLocalStorage, saveToLocalStorage} from '../../utils/localStorage';
import Auth from '../Auth/Auth';

export default class GetToken extends Component {
    constructor(props) {
        super(props);

        this.checkURL = this.checkURL.bind(this);
        this.checkLS = this.checkLS.bind(this);
    }

    checkURL() {
        // Get path. Example: site.com/auth/123 -> ['auth','123']
        const {auth, key} = this.props.match.params;

        return (auth === 'auth' && key) ? key : false;
    }

    checkLS() {
        if (this.keyFromURL) {
            saveToLocalStorage('key', this.keyFromURL);
        } else {
            this.key = loadFromLocalStorage();
        }
    }

    render() {
        this.keyFromURL = this.checkURL();

        if (this.keyFromURL) {
            return <Auth fromURL={this.keyFromURL}/>;
        }

        this.checkLS();

        return this.key ? <Redirect to={'/layout'} /> : <Auth fromURL={false}/>;
    }
}
