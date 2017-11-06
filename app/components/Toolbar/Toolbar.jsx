import React, {Component} from 'react';
import DynamicReport from '../../containers/DynamicReport/DynamicReport';

import './css/Toolbar.css';

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTab: {}
        };
    }

    render() {
        return (
            <div className="toolbar">
                <div
                    className={this.state.openTab.dynamicReport
                        ? 'toolbar__item toolbar__item_active'
                        : 'toolbar__item'}
                    onClick={() => {
                        const newState = this.state;
                        newState.openTab.dynamicReport
                            ? delete newState.openTab.dynamicReport
                            : newState.openTab.dynamicReport = true;
                        this.setState(newState);
                    }}
                >
                    <div
                        className={this.state.openTab.dynamicReport
                            ? 'toolbar__icon toolbar__icon_active'
                            : 'toolbar__icon'}
                    >
                        DR
                    </div>
                </div>
                <div className="toolbar__content">
                    {this.state.openTab.dynamicReport && <DynamicReport/>}
                </div>
            </div>
        );
    }
}

export default Toolbar;
