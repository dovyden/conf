import React, {Component} from 'react';
import Header from '../../components/DynamicReport/Header';
import DocumentList from '../../components/DynamicReport/DocumentList';

import '../../components/DynamicReport/css/DynamicReport.css';

const initialState = {
    documents: [
        {
            id: 1,
            name: 'Документ 1',
            versions: [
                {
                    id: 1,
                    name: 'Версия 1',
                    created: '02.11.2017',
                    tasks: [
                        {
                            id: 1,
                            name: 'dsdfs'
                        },
                        {
                            id: 2,
                            name: 'ddsfss'
                        },
                        {
                            id: 3,
                            name: 'sd'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Версия 2',
                    created: '02.11.2017',
                    tasks: [
                        {
                            id: 1,
                            name: 'dsdfs'
                        },
                        {
                            id: 2,
                            name: 'ddsfss'
                        },
                        {
                            id: 3,
                            name: 'sd'
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Документ 2'
        },
        {
            id: 3,
            name: 'Документ 3'
        }
    ]
};

class DynamicReport extends Component {
    render() {
        return (
            <div className="dr">
                <Header/>
                <DocumentList documents={initialState.documents}/>
            </div>
        );
    }
}

export default DynamicReport;
