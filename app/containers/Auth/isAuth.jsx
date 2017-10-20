import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ROUTING} from '../../constants/routing';

export default function requireAuthentication(ComponentName) {

    class AuthenticatedComponent extends Component {
        componentWillMount() {
            this.checkAuth(this.props.user);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.user);
        }

        checkAuth(user) {
            const {push} = this.props.history;

            if (!user.isAuthenticated) {
                this.props.dispatch({
                    type: ROUTING,
                    payload: {
                        method: push,
                        nextUrl: '/auth'
                    }
                });
            }
        }

        render() {
            return (
                <div>
                    {this.props.user.isAuthenticated === true
                        ? <ComponentName {...this.props} />
                        : null
                    }
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        };
    }

    AuthenticatedComponent.propTypes = {
        user: PropTypes.object,
        history: PropTypes.object
    };

    return withRouter(connect(mapStateToProps)(AuthenticatedComponent));
}
