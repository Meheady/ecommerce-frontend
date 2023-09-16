import React from 'react';
import loaderCss from "../styles/Loader.module.css"

function ApiLoader(props) {
    return (
        <>
            <div className={loaderCss.loaderContainer}>
                <div className={loaderCss.spinner}></div>
            </div>
        </>
    );
}

export default ApiLoader;