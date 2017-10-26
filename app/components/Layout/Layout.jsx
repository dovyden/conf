import React from 'react';
import PropTypes from 'prop-types';

export default function Layout(props) {
    const onclick = props.navigate('loh', 3);

    return (
        <div className="layout">
            Layout
            <button onClick={onclick} />
        </div>
    );
}

Layout.propTypes = {
    navigate: PropTypes.func.isRequired
};
