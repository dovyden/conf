import React from 'react';
import Layout from '../../containers/Layout/Layout';
// import Toolbar from '../Toolbar/Toolbar';

export default function App() {
    return (
        <div>
            <Layout
                data={{
                    direction: 'row',
                    flexBasis: '100%',
                }}
            />
        </div>
    );
}
