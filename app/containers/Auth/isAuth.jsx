import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
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
                        nextUrl: '/'
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

    return withRouter(connect(mapStateToProps)(AuthenticatedComponent));
}
