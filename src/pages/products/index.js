import React from 'react';
import Product from "../../component/website/product/product";
import WebsiteLayout from "../../layout/website/websiteLayout";

function Index(props) {
    return (
        <>
            <Product/>
        </>
    );
}

export default Index;
Index.getLayout = function getLayout(page) {
    return (
        <WebsiteLayout>
            {page}
        </WebsiteLayout>
    )
}