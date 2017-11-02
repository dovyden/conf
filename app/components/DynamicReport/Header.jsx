import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div className="dr-header">
                <div className="dr-header__filter">
                    <div className="dr-header__filter-text">по версии</div>
                </div>
                <div className="dr-header__filter">
                    <div className="dr-header__filter-text">по статусу</div>
                </div>
                <div className="dr-header__filter">
                    <div className="dr-header__filter-text">по автору</div>
                </div>
                <div className="dr-header__filter">
                    <div className="dr-header__filter-text">по типу</div>
                </div>
            </div>
        );
    }
}

export default Header;
