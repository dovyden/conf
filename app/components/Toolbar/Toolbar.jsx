import React, {Component} from 'react';
import DynamicReport from '../DynamicReport/DynamicReport';

import './css/Toolbar.css';

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dr: false
        };
    }

    render() {
        return (
            <div>
                <div className="c-toolbar">
                    <div
                        className="c-toolbar__button"
                        onClick={() => {
                            this.setState({dr: !this.state.dr});
                        }}>
                        <span className="c-toolbar__icon"> DR </span>
                    </div>
                </div>
                {this.state.dr && <div className="l-dr"><DynamicReport/></div>}
            </div>
        );
    }
}

export default Toolbar;
