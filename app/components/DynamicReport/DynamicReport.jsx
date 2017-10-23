import React, {Component} from 'react';
import Header from '../../containers/Header';
import DocumentList from '../../containers/DocumentList';

import './css/DynamicReport.css';

class DynamicReport extends Component {
    render() {
        return (
            <div className="dr">
                <Header/>
                <DocumentList/>
            </div>
        );
    }
}

export default DynamicReport;
