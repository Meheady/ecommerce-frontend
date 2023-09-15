import React from 'react';
import Header from "./header";
import Footer from "./footer";

function WebsiteLayout({children}) {
    return (
        <>
            <Header/>
                {children}
            <Footer/>
        </>
    );
}

export default WebsiteLayout;