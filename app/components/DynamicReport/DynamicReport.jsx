import React, {Component} from 'react';
import Header from '../../containers/Header';
import ShowDocumentList from '../../containers/ShowDocumentList';

import './css/DynamicReport.css';

class DynamicReport extends Component {
    render() {
        return (
            <div className="dr">
                <Header/>
                <ShowDocumentList/>
            </div>
        );
    }
}

export default DynamicReport;
